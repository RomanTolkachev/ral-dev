// import { axiosApi } from '@/shared/api/api';
// import { useQuery } from '@tanstack/react-query';
// import { AxiosError } from 'axios';
// import { ComponentType, FunctionComponent, useState } from 'react';
// import { Controller, useForm, } from 'react-hook-form';
// import Select, { components, InputProps, OptionProps, ContainerProps, MenuListProps, ControlProps, ValueContainerProps, MultiValueProps, GroupBase, IndicatorsContainerProps } from 'react-select';
// import { useDebounce } from 'use-debounce';

// interface Props {
//     className?: string;
// }

// type reactSelectOption = {
//     value: string
//     label: string
// }

// const TestInput: FunctionComponent<Props> = ({ className }) => {


//     const [inputValue, setInputValue] = useState<string>("")
//     const [debouncedValue] = useDebounce(inputValue, 500)

//     const { control, getValues } = useForm({
//         defaultValues: {
//             test: []
//         }
//     });

//     const options = useQuery(
//         {
//             enabled: !!debouncedValue,
//             queryFn: (): Promise<reactSelectOption[]> => axiosApi.get(`input_values`,
//                 {
//                     params: {
//                         where: "accreditation_area",
//                         column: "applicantFullName",
//                         like: debouncedValue
//                     }
//                 }).then(res => res.data),
//             queryKey: ["input", debouncedValue.split("")[0]], // для запроса нужна только первая буква т.к react-select сам фильтрует результаты
//             retry: (errCount, err: AxiosError) => [401, 404, 500].includes(err.status!) ? false : true,
//         }
//     );

//     const CustomOption: FunctionComponent<OptionProps<reactSelectOption, true>> = ({ innerRef, innerProps, data }) => <div ref={innerRef} {...innerProps}>{data.value}</div>
//     const CustomInput: ComponentType<InputProps<reactSelectOption, boolean, GroupBase<reactSelectOption>>> = (props: InputProps<any, boolean>) => {
//         return (
//             <components.Input
//                 {...props}
//                 className="custom-input bg-cyan-200 w-full"
//             />
//         );
//     }
//     const CustomSelectContainer: FunctionComponent<ContainerProps<reactSelectOption, true>> = (props: ContainerProps<any, boolean>) => {
//         return (
//             <components.SelectContainer {...props} className="bg-red-300 w-40">
//                 {props.children}
//             </components.SelectContainer>
//         );
//     };

//     const CustomMenuList = (props: MenuListProps<any, boolean>) => {
//         return (
//             <components.MenuList {...props}>
//                 <div className="border-violet-700 border-2 w-40 rounded-l-full rounded-r-full">Доступные опции:</div>
//                 {props.children}
//             </components.MenuList>
//         );
//     };

//     const CustomControl: FunctionComponent<ControlProps<reactSelectOption, true>> = (props) => {
//         const { children, innerRef, innerProps, isFocused } = props;

//         return (
//             <div
//                 ref={innerRef}
//                 {...innerProps}
//                 className={``
//                 }
//             >
//                 {children}
//             </div>
//         );
//     };

//     const CustomValueContainer: FunctionComponent<ValueContainerProps<reactSelectOption, true>> = (props) => {
//         const { children } = props;

//         return (
//             <components.ValueContainer {...props}>
//                 {/* Оставляем Input в поле */}
//                 {children[1]}

//                 {/* Рендерим выбранные значения под полем */}
//                 <div className="mt-2 flex flex-wrap gap-2">
//                     {children[0]}
//                 </div>
//             </components.ValueContainer>
//         );
//     };

//     const CustomMultiValue: FunctionComponent<MultiValueProps<reactSelectOption>> = (props) => {
//         return (
//             <components.MultiValue {...props}>
//                 {/* Можем добавить кастомную иконку или другой контент */}
//                 <span className="icon">⭐</span>
//                 {props.data.label}
//             </components.MultiValue>
//         );
//     };


//     const CustomIndicatorsContainer: FunctionComponent<
//         IndicatorsContainerProps<reactSelectOption, true>
//     > = (props) => {
//         return (
//             <components.IndicatorsContainer {...props}>
//                 <span className="bg-yellow-300">🌟</span>
//                 {props.children}
//             </components.IndicatorsContainer>
//         );
//     };

//     return (
//         <Controller
//             control={control}
//             name='test'
//             render={({ field }) => {
//                 return <Select
//                     components={{
//                         Option: CustomOption,
//                         Input: CustomInput,
//                         SelectContainer: CustomSelectContainer, // самая внешняя обертка
//                         Control: CustomControl, // внешняя обертка
//                         MenuList: CustomMenuList,
//                         ValueContainer: CustomValueContainer, // контейнер для вариантов
//                         MultiValue: CustomMultiValue,
//                         // DropdownIndicator: () => null,
//                         Placeholder: () => null,
//                         IndicatorsContainer: CustomIndicatorsContainer,
//                     }}
//                     className='w-fit'
//                     isMulti
//                     placeholder="выберите"
//                     onInputChange={input => setInputValue(input)}
//                     options={options.data ?? []}
//                     isLoading={options.isLoading}
//                 />
//             }} />
//     );
// };

// export default TestInput;