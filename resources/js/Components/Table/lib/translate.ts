// import { TAccreditationAreaModel } from "@/features/AccreditationArea/model"


// function translate(raw: TAccreditationAreaModel): string {
//     const dictionary: Record<TAccreditationAreaModel, string> = {
//         id: "ID",
//         gost: "ГОСТ",
//         characteristic: "Характеристика",
//         id_ral: "ID лаборатории",
//         okpd: "ОКПД",
//         characteristic_range: "Область аккредитации",
//         tn_ved: "ТН ВЭД",
//         gost_object: "расшифровка ГОСТ",
//         source_file: "Файл-источник",
//         source_page: "Страница в источнике",
//         source_row: "Пункт в источнике",
//     }
//     return dictionary[raw] ?? raw as string
// }

// export default translate as <T extends string>(raw: T) => T

function createTranslateFn(dictionary: Record<string, string>):(raw: string) => string {
    return function(raw: string) {
        return dictionary[raw] ?? raw
    }
}

export default createTranslateFn