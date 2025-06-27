export interface ISearchingFormItem {
    header: string | any;
    headerType: string;
    sortValues: {
        type: 'checkBox' | 'date' | 'huge' | 'multi';
        checkboxValues?: any[];
        min?: string;
        max?: string;
    };
}
