<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CookieLogServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Route::matched(function ($event) {
            $request = $event->request;
            
            // Логируем только API routes
            if ($this->isApiRoute($request)) {
                $this->logApiRequest($request);
            }
        });
    }

    protected function isApiRoute(Request $request): bool
    {
        return Str::startsWith($request->path(), 'api/') || 
               $request->route()?->getPrefix() === 'api';
    }

    protected function logApiRequest(Request $request): void
    {
        $requestId = Str::uuid()->toString();

        Log::channel('incoming_cookies')->info('API_REQUEST', [
            'request_id' => $requestId,
            'time' => now()->format('Y-m-d H:i:s'),
            'method' => $request->method(),
            'endpoint' => $request->path(),
            'full_url' => $request->fullUrl(),
            'cookies_summary' => [
                'total' => count($request->cookies->all()),
                'laravel_session' => $request->hasCookie('laravel_session') ? 'PRESENT' : 'MISSING',
                'xsrf_token' => $request->hasCookie('XSRF-TOKEN') ? 'PRESENT' : 'MISSING',
            ],
            'headers_summary' => [
                'has_cookies' => !empty($request->header('Cookie')),
                'has_auth' => !empty($request->header('Authorization')),
                'origin' => $request->header('Origin'),
                'headers' => preg_replace('/\s*\n\s*/', ' ', $request->headers)
            ],
        ]);

        $request->attributes->set('debug_request_id', $requestId);
    }
}