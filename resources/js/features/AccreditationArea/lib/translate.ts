import { TAccreditationAreaModel } from "../model";

function translate(raw: TAccreditationAreaModel): string {
    const dictionary: Record<TAccreditationAreaModel, string> = {
        id: "ID",
        gost: "ГОСТ",
        characteristic: "Характеристика",
        id_ral: "ID лаборатории",
        okpd: "ОКПД",
        characteristic_range: "Область аккредитации",
        tn_ved: "ТН ВЭД",
        gost_object: "расшифровка ГОСТ",
        source_file: "Файл-источник",
        source_page: "Страница в источнике",
        source_row: "Пункт в источнике",
        match_status: "Совпадение поиска",
        source_file_label: 'Тип области'
    }
    return dictionary[raw] ?? raw as string
}

export default translate as <T extends string>(raw: T) => T