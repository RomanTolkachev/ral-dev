import { ISearchingFormItem } from "@/shared/types/searchingFilters"
import { UseQueryResult } from "@tanstack/react-query"

export type ICustomSubmitHandlerContext = {
    filtersData: UseQueryResult<ISearchingFormItem[]>
    customSubmitHandler: (formData: Record<string, unknown>) => void
    customResetHandler: () => void
    customResetField: (fieldName: string) => void
} | undefined

export type CustomisationContext = {
    config: IConfig<string>
    orderableCells: string[]
    hiddenColumns: string[]
    rowClickFn?: () => void
    cellWidths?: Partial<Record<string, number>>
}