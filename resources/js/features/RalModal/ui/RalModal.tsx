import { FunctionComponent, useEffect, useState } from "react"
import { useParams } from "react-router"
import { keys } from 'lodash'
import useCachedData from "../api/useCachedData";
import { axiosApi } from "@/services/api";
import { Preloader } from "@/Components/utils/Preloader";


interface IProps {
    className?: string
}

interface ICertData extends Record<string, any> {}

export const RalModal: FunctionComponent<IProps> = ({ className }) => {

    const [certificationBodyData, setCertificationbodyData] = useState<ICertData | undefined>(undefined)
    const { ralId } = useParams();
    const cachedData = ralId ? useCachedData(ralId) : undefined;

    /*
        Проверка, есть ли в кэше tanstack Table данные о текущем аккредитованном лице,
        если их нет, то происходит fetch и установка состояния
    */
    useEffect(() => {
        if (!cachedData) {
            axiosApi.get<Record<string, any>>('/ral/certification_body', {
                params: { cert_id: ralId }
            }).then(res => res ? setCertificationbodyData(res.data[0]) : null); // TODO: нужно продумать тут catch и правильно ли указывать null в тернарнике
        } else setCertificationbodyData(cachedData)
    }, [ralId])

    return (
        <div className={`${className}`}>
            {!certificationBodyData
                ? <Preloader className="overflow-hidden" widthStyles="w-12" />
                : (
                    <ul>
                        {keys(certificationBodyData).map((value, key) => {
                            return (
                                <li key={`kk${key}`}>
                                    {`${value}-------->${certificationBodyData![value]}`}
                                </li>
                            )
                        }
                        )}
                    </ul>
                )}
        </div>
    )
}