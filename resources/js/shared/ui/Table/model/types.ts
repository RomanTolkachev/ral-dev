import { ISearchingFormItem } from "@/shared/types/searchingFilters"

export type ICustomSubmitHandlerContext = {
    filtersData: ISearchingFormItem[]
    customSubmitHandler: (formData: Record<string, unknown>, debounceTime?: number) => void
    customResetHandler: () => void
    customResetField: (fieldName: string) => void
} | undefined

export type CustomisationContext = {
    config: IConfig<string>
}
