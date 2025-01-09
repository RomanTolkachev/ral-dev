export interface ISearchingFormItem {
    header: string | any;
    headerType: string;
    sortValues: {
        type: 'checkBox' | 'date' | 'huge';
        checkboxValues?: any[];
        min?: string;
        max?: string;
    };
}
