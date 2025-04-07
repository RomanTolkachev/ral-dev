import { ReactNode } from "react"

export const translateHeaderName = (accessorKey: ReactNode | undefined): string => {
    switch (accessorKey) {
        case 'link':
            return 'Ссылка'
        case 'RegNumber':
            return 'Рег. номер'
        case 'old_status_AL':
            return 'Предыдущий статус'
        case 'new_status_AL':
            return 'Акт. статус'
        case 'status_change_date':
            return 'Дата смены статуса'
        case 'nameType':
            return 'Тип АЛ'
        case 'nameTypeActivity':
            return 'Тип направления деятельности'
        case 'regDate':
            return 'Дата рег.'
        case 'fullName':
            return 'Полное наименование'
        case 'address':
            return 'Адрес'
        case 'applicantFullName':
            return 'Наименование'
        case 'applicantINN':
            return 'ИНН'
        case 'oaDescription':
            return 'Описание'
        case 'NPstatus':
            return 'Статус НЧ'
        case 'id':
            return 'id'
        case 'NP_status_change_date':
            return 'Дата изм. статуса НЧ'
        case 'fullText':
            return 'Поиск'
        case 'tnved':
            return 'ТН ВЭД (НЧ)'
        case 'regulation':
            return 'ТР ТС/ЕАЭС (НЧ)'
        case 'regulations':
            return 'ТР ТС/ЕАЭС (НЧ)'
        default:
            return 'дефолт'
    }
}
