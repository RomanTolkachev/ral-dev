<?php

namespace App\UseCases\Certificates\GetCertificatesList;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\UseCases\Certificates\shared\GetCertificatesFilter;
use App\Models\CertificatesShortInfo;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class GetCertificatesListController
{
    public function __invoke(GetCertificatesListHandler $handler, GetCertificatesListRequest $request): JsonResponse
    {
        ini_set('memory_limit', '512M');
        ini_set('max_execution_time', 300);
        set_time_limit(300);

        $startTotal = microtime(true);

        DB::enableQueryLog();
        $queriesBefore = count(DB::getQueryLog());

        $result = $handler->execute(
            page: $request->page,
            itemsPerPage: $request->perPage,
            user: $request->user(),
            defaultUser: User::getDefaultUser(),
            filter: new GetCertificatesFilter(new CertificatesShortInfo(), $request)
        );

        $endTotal = microtime(true);
        $queriesAfter = DB::getQueryLog();

        Log::info('Certificates List Total Timing:', [
            'total_time' => round($endTotal - $startTotal, 3) . 's',
            'queries_count' => count($queriesAfter) - $queriesBefore,
            'page' => $request->page,
            'per_page' => $request->perPage,
            'memory_usage' => round(memory_get_peak_usage(true) / 1024 / 1024, 2) . 'MB'
        ]);

        return new JsonResponse($result, Response::HTTP_OK);
    }
}
