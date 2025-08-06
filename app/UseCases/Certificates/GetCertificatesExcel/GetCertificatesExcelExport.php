<?php

namespace App\UseCases\Certificates\GetCertificatesExcel;

use Maatwebsite\Excel\Concerns\FromCollection;

class GetCertificatesExcelExport implements FromCollection
{
    private $data;
    public function __construct($data)
    {
        $this->data = $data;
    }
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->data;
    }

    public function chunkSize(): int
    {
        return 100; // Чанкование для оптимизации
    }
}
