import { ReactNode } from "react"

export const translateHeaderName = (accessorKey: ReactNode | undefined): string => {
    switch (accessorKey) {
        case 'link':
            return 'ссылка'
        case 'RegNumber':
            return 'регистрационный номер'
        case 'old_status_AL':
            return 'предыдущий статус'
        case 'new_status_AL':
            return 'новый статус'
        case 'status_change_date':
            return 'дата смены статуса'
        case 'nameType':
            return 'тип АЛ'
        case 'nameTypeActivity':
            return 'тип направления деятельности'
        case 'regDate':
            return 'дата регистрации'
        case 'fullName':
            return 'полное наименование'
        case 'address':
            return 'адрес'
        case 'applicantFullName':
            return 'полное наименование'
        case 'applicantINN':
            return 'ИНН'
        case 'oaDescription':
            return 'описание'
        case 'NPstatus':
            return 'статус НЧ'
        case 'id':
            return 'id'
        case 'NP_status_change_date':
            return 'дата изменения статуса НЧ'
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
