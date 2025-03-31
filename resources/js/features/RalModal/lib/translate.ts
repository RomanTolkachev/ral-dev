import { ReactNode } from "react"

export const translate = (accessorKey: ReactNode | undefined): string => {
    switch (accessorKey) {
        case 'link':
            return 'Ссылка в ФСА'
        case 'RegNumber':
            return 'Рег.номер АЛ'
        case 'old_status_AL':
            return 'Предыдущий статус'
        case 'new_status_AL':
            return 'Актуальный статус'
        case 'status_change_date':
            return 'Дата актуализации статуса'
        case 'nameType':
            return 'Тип АЛ'
        case 'nameTypeActivity':
            return 'Направление деятельности'
        case 'regDate':
            return 'Дата регистрации АЛ'
        case 'fullName':
            return 'Полное наименование'
        case 'address':
            return 'Адрес'
        case 'applicantFullName':
            return 'Полное наименование организации'
        case 'applicantINN':
            return 'ИНН'
        case 'oaDescription':
            return 'Описание области аккредитации'
        case 'NPstatus':
            return 'Статус НЧ'
        case 'id':
            return 'id'
        case 'NP_status_change_date':
            return 'Дата актуализации статуса НЧ'
        case 'fullText':
            return 'поиск'
        case 'is_relevant':
            return 'релевантность НЧ'
        case 'подробнее':
            return ''
        default:
            return 'дефолт'
    }
}
