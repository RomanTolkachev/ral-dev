<?php

namespace App\Services;

class TableFilterItem
{
    private string $columnName;
    private string $columnType;
    private TableFilterSortOptions $sortOptions;

    public function __construct(string $columnName)
    {
        
    }

}