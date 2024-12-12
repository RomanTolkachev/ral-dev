<?php

namespace App\Console\Commands;

use App\Models\RalShortInfoMock;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;

class test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'log:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $headers = Schema::getColumnListing('ral_short_info_mock');
        dump($headers);

        $response = [];
        foreach ($headers as $value) {
            $columnType = Schema::getColumnType('ral_short_info_mock', $value);

            if (in_array($columnType, ['date', 'datetime'])) {
               $minDate = RalShortInfoMock::min($value);
               $maxDate = RalShortInfoMock::max($value);
               $response[$value] =
               [
                   'headerType' => $columnType,
                   "min" => $minDate,
                   "max" => $maxDate,
               ];
            } else {
                $response[$value] = [
                    'headerType' => $columnType,
                    'sortValues' => RalShortInfoMock::distinct()->pluck($value)
                ];
            }
        }

        dump($response);
    }
}
