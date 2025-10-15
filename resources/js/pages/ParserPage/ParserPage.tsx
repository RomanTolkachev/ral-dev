import { FC, useState, useEffect } from "react";
import styles from "./ParserPage.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query"; 
import { axiosApi } from "@/shared/api/api";
import { prepareTab } from "./lib";
import { CONFIG } from "./config";
import { Select } from "./Select";
import { Preloader } from "@/Components/utils/Preloader";

export const ParserPage: FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [timeLeft, setTimeLeft] = useState(5);
    const [lastRefetchTime, setLastRefetchTime] = useState<number>(Date.now());
    const queryClient = useQueryClient();

    const [refreshInterval, setRefreshInterval] = useState(() => {
        const saved = localStorage.getItem("parser_fetch_interval");
        return saved || CONFIG.refresh_time_ms.toString();
    });

    const { data: tabs, isLoading, error } = useQuery({
        queryKey: ["parser"],
        queryFn: async () => {
            const res = await axiosApi.get("/parser");
            setLastRefetchTime(Date.now());
            return prepareTab({ raw: res.data, exclude: CONFIG.exclude_tabs });
        },
        refetchInterval: Number(refreshInterval),
    });

    const handleIntervalChange = (value: string) => {
        setRefreshInterval(value);
        localStorage.setItem("parser_fetch_interval", value);
    };

    const handleTabChange = (index: number) => {
        setActiveTab(index);
        queryClient.invalidateQueries({ queryKey: ["parser"] });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const timeSinceLastRefetch = now - lastRefetchTime;
            const timeUntilNextRefetch = Math.max(0, Number(refreshInterval) - timeSinceLastRefetch);
            const secondsLeft = Math.ceil(timeUntilNextRefetch / 1000);

            setTimeLeft(secondsLeft);
        }, 1000);

        return () => clearInterval(interval);
    }, [lastRefetchTime, refreshInterval]);

    if (isLoading || error || !tabs?.length) {
        return <Preloader widthStyles="size-14" />
    }

    return (
        <div className="relative text-table-base p-2 text-lg">
            <div className="flex gap-1 items-stretch">
                {tabs.map((tab, index) => {
                    const isActive = activeTab === index;
                    let extraClass = "";
                    if (isActive) {
                        if (index === 0) extraClass = styles.shadowActiveLeft;
                        else if (index === tabs.length - 1) extraClass = styles.shadowActiveRight;
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleTabChange(index)} 
                            className={`px-6 py-4 min-h-14 rounded-t-lg rounded-b-none border-0 outline-none ring-0 overflow-visible transition-all duration-200 flex items-center justify-center relative ${isActive
                                ? `bg-background-block ${styles.shadowActiveLight} ${extraClass}`
                                : "my-block bg-filter-dropdown-button hover:bg-background-block"
                                }`}
                            style={isActive ? { zIndex: 30, clipPath: "inset(-20px -20px 0 -20px)" } : undefined}
                        >
                            <div
                                className={`absolute right-2 top-2 w-3 h-3 rounded-full ${tab.is_working ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                            />

                            <div className="text-center leading-tight whitespace-normal break-words pr-2">
                                <div className="font-medium">
                                    {CONFIG.dictionary[tab.label as keyof typeof CONFIG.dictionary] || tab.label}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* вкладки */}
            <div
                className={`p-6 bg-background-block relative z-10 my-block rounded-b-lg rounded-tr-lg ${activeTab === 0 ? "rounded-tl-none" : "rounded-tl-lg"
                    }`}
            >
                {tabs.map((tab, index) => (
                    <div key={index} className={activeTab === index ? "block" : "hidden"}>
                        <ul>
                            <li><span>Статус: </span><span></span>{tab.is_working ? "Активен" : "Не работает"}</li>
                            <li><span>Новых: </span><span></span>{tab.new}</li>
                            <li><span>Следующее время старта: </span><span></span>{tab.next_start_time}</li>
                            <li><span>Не изменено строк: </span><span></span>{tab.not_changed}</li>
                            <li><span>Последнее время старта: </span><span>{tab.start_time}</span></li>
                            <li><span>Закончил работу: </span><span></span>{tab.work_done_time}</li>
                            <li><span>Обновление данных через: </span><span>{timeLeft} сек.</span></li>
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <div className="p-2">Интервал обновления: </div>
                <Select
                    className="w-56"
                    value={refreshInterval}
                    onChange={(e) => handleIntervalChange(e.target.value)}
                    placeholder="Выберите интервал обновления"
                    options={CONFIG.interval_options}
                />
            </div>
        </div>
    );
};