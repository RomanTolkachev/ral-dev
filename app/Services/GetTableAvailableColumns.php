<?php

use Illuminate\Database\Eloquent\Model;

class GetTableAvailableColumns {
    /**
     * возвращает наименование доступных колонок для модели в развернутом формате
     * @param Model $model
     */
    public function for(Model $model): array
    {
        dd($model::first()->toFlat->toArray());
    }
}