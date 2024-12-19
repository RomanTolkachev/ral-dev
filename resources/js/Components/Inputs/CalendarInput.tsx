import React, {FunctionComponent, ReactNode, useState} from 'react';
import Datepicker from "tailwind-datepicker-react";
import {IOptions} from "tailwind-datepicker-react/types/Options";
import {Control, Controller, FieldValues, UseFormRegister} from "react-hook-form";
import {ISearchingFormItem} from "@/types/searchingFilters";

interface IProps {
    className?: string
    register: UseFormRegister<FieldValues>
    control: Control
    inputData: ISearchingFormItem
}

const options: IOptions = {
    // title: "Demo Title",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
        background: "",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "bg-gray-200",
        input: "",
        inputIcon: "",
        selected: "",
    },
    icons: {
        // () => ReactElement | JSX.Element
        prev: () => <span>Пред.</span>,
        next: () => <span>След.</span>,
    },
    datepickerClassNames: "top-42",
    defaultDate: new Date("2022-01-01"),
    language: "ru",
    disabledDates: [],
    weekDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
}

export const CalendarInput: FunctionComponent<IProps> = ({className, register, control, inputData}) => {
// console.log('render календарь инпут')
    interface IContainerProps {
        inputData: ISearchingFormItem
        className: string,
        children: ReactNode
    }

    const [show, setShow] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState('');
    const handleChange = (date: any) => {
        setSelectedDate(date)
        console.log(selectedDate)
    }
    const handleClose = (state: boolean) => {
        setShow(state)
    }
    return ( null
        // <Controller
        //     name={inputData.header}
        //     defaultValue={selectedDate}
        //     control={control}
        //     render={
        //         ({field: {onChange, value}}) => (
        //             <Datepicker options={options} show={show} setShow={handleClose} onChange={(e) => setSelectedDate(e.target!.value)}>
        //                 <input {...register(inputData.header)}
        //                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
        //                        className={'no-calendar'}
        //                        value={selectedDate}
        //                        type={"date"}
        //                        placeholder="Select Date"
        //                        onBlur={() => setShow(false)}
        //                        onFocus={() => setShow(true)}/>
        //                 <div>{selectedDate as ReactNode}</div>
        //             </Datepicker>
                // )
            // }/>
    );
};
