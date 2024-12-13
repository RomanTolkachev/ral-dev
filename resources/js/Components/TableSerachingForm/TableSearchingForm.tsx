import React, {FunctionComponent} from 'react';
import {Preloader} from "@/Components/utils/Preloader";
import {DropdownItem} from "@/Components/DropdownItem";
import {MainButton} from "@/Components/Buttons/MainButton";
import {ISearchingFormItem} from "@/types/searchingFilters";

interface IProps {
    className?: string
    searchingFormData: ISearchingFormItem[]
}

export const TableSearchingForm: FunctionComponent<IProps> = ({className, searchingFormData}) => {
    return (
        <form className={`${className} flex-col overflow-hidden flex`}>
            <div className={"px-6 w-full overflow-y-scroll space-y-4"}>
                {!searchingFormData.length ? <Preloader widthStyles={"w-16"}/> : (
                    searchingFormData.map((filterItem, key) => {
                        return (<DropdownItem name={filterItem.header} className={''}
                                              inputData={filterItem} key={key}/>
                        )
                    })
                )}
            </div>
            <div className={"sticky bottom-0 flex flex-col bg-background py-6 space-y-4 gap-2"}>
                <MainButton color={"violet"} className={"mx-auto"}>Применить</MainButton>
                <button>сбросить</button>
            </div>
        </form>
    );
};
