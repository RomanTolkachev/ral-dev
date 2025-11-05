export interface ISearchingFormItem {
    headerLabel: string | any;
    type: 'checkBox' | 'date' | 'huge' | 'multi' | 'singleText' | "multiVariants";
    defaultValue: string[]
    values?: {
        checkboxValues?: any[];
        min?: string;
        max?: string;
    };
}
