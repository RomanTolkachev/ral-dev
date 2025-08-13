<?php

namespace App\UseCases\Certificates\GetCertificatesExcel;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class GetCertificatesExcelController
{
    public function __invoke(GetCertificatesExcelHandler $handler)
    {
        $res = $handler->execute();
        // dd(new GetCertificatesExcelExport);
        return Excel::download(
            $res, "hi.xlsx"
        );
    }

    // public function export()
    // {
    //     return Excel::download(
    //         $this->handler->execute(), 
    //         'users.xlsx'
    //     );
    // }
}
