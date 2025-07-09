export interface ISearchingFormItem {
    header: string | any;
    headerType: string;
    sortValues: {
        type: 'checkBox' | 'date' | 'huge' | 'multi' | 'singleText' | "multiVariants";
        checkboxValues?: any[];
        min?: string;
        max?: string;
    };
}
