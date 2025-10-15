import { FC, useState } from "react";
import styles from "./ParserPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { extractMainParsers } from "./lib";
import axios from "axios";

const URL = "http://192.168.10.35:8000/api/v1/parser/indicator";

export const ParserPage: FC = () => {
    const [activeTab, setActiveTab] = useState(0);


    // const { data, isLoading, error } = useQuery({
    //     queryKey: ["parsers"],
    //     queryFn: async () => {
    //         const res = await axios.get(URL);
    //         return handleRaw(res.data);
    //     },
    // });

    const data = {
        "fav_parser_is_working": false,
        "fav_new_certs": 0,
        "fav_updated_certs": 0,
        "fav_not_changed": 7057,
        "fav_parser_start_time": "13:14:26",
        "fav_parser_next_start_time": "13:29:26",
        "fav_parser_work_done_time": "13:15:04",
        "ral_parser_is_working": false,
        "ral_new": 0,
        "ral_updated": 0,
        "ral_not_changed": 33282,
        "ral_parser_start_time": "13:03:12",
        "ral_parser_next_start_time": "13:43:12",
        "ral_parser_work_done_time": "13:06:52",
        "decl_parser_is_working": false,
        "decl_new": 0,
        "decl_updated": 0,
        "decl_not_changed": 0,
        "decl_parser_start_time": "12:17:58",
        "decl_parser_next_start_time": "12:17:58",
        "decl_parser_work_done_time": "12:17:58",
        "all_certs_last_2_days_parses_is_working": false,
        "all_new_certs_last_2_days": 10,
        "all_updated_certs_last_2_days": 0,
        "all_not_changed_last_2_days": 770,
        "all_cert_last_2_days_parser_start_time": "13:21:52",
        "all_cert_last_2_days_parser_next_start_time": "13:21:52",
        "all_cert_last_2_days_parser_work_done_time": "13:22:07",
        "all_certs_with_changed_status_parses_is_working": false,
        "all_new_certs_with_changed_status": 3,
        "all_updated_certs_with_changed_status": 0,
        "all_not_changed_with_changed_status": 9997,
        "all_cert_with_changed_status_parser_start_time": "08:19:59",
        "all_cert_with_changed_status_parser_next_start_time": "08:19:59",
        "all_cert_with_changed_status_parser_work_done_time": "13:19:33",
        "np_parser_is_working": false,
        "np_new": 0,
        "np_updated": 0,
        "np_old": 4400,
        "np_parser_start_time": "12:20:42",
        "np_parser_next_start_time": "14:20:42",
        "np_parser_work_done_time": "13:09:17",
        "applicant_parser_is_working": false,
        "new_applicant": 0,
        "old_applicant": 0,
        "applicant_parser_start_time": "12:17:58",
        "applicant_parser_work_done_time": "12:17:58",
        "applicant_parser_next_start_time": "12:17:58",
        "auth_parser_is_working": false,
        "new_auth": 0,
        "old_auth": 0,
        "auth_parser_start_time": "12:17:58",
        "auth_parser_work_done_time": "12:17:58",
        "auth_parser_next_start_time": "12:17:58",
        "cert_status_changes_is_working": false,
        "new_cert_status_changes": 3091,
        "old_cert_status_changes": 49,
        "updated_cert_status_changes": 4161,
        "cert_status_changes_start_time": "13:18:46",
        "cert_status_changes_work_done_time": "13:18:46",
        "cert_status_changes_next_start_time": "13:19:33",
        "cert_gost_tnved_ral_is_working": false,
        "new_cert_gost_tnved_ral": 0,
        "old_cert_gost_tnved_ral": 0,
        "cert_gost_tnved_ral_start_time": "12:17:58",
        "cert_gost_tnved_ral_work_done_time": "12:17:58",
        "cert_gost_tnved_ral_next_start_time": "12:17:58"
    }

    console.log(extractMainParsers(data))

    // return (
    //     <div className="relative text-table-base p-2">
    //         {/* Заголовки вкладок */}
    //         <div className="flex gap-1">
    //             {tabs.map((tab, index) => {
    //                 const isActive = activeTab === index;
    //                 let extraClass = "";
    //                 if (isActive) {
    //                     if (index === 0) extraClass = styles.shadowActiveLeft;
    //                     else if (index === tabs.length - 1) extraClass = styles.shadowActiveRight;
    //                 }

    //                 return (
    //                     <button
    //                         key={index}
    //                         onClick={() => setActiveTab(index)}
    //                         className={`px-6 py-4 h-14 rounded-t-lg rounded-b-none border-0 outline-none ring-0 overflow-visible transition-colors transition-shadow duration-200 ${isActive
    //                             ? `bg-background-block ${styles.shadowActiveLight} ${extraClass}`
    //                             : "my-block bg-filter-dropdown-button hover:bg-background-block"
    //                             }`}
    //                         style={isActive ? { zIndex: 30, clipPath: "inset(-20px -20px 0 -20px)" } : undefined}
    //                     >
    //                         {tab.label}
    //                     </button>
    //                 );
    //             })}
    //         </div>

    //         {/* Контент вкладок */}
    //         <div
    //             className={`p-6 bg-background-block relative z-10 my-block rounded-b-lg rounded-tr-lg ${activeTab === 0 ? "rounded-tl-none" : "rounded-tl-lg"
    //                 }`}
    //         >
    //             {tabs.map((tab, index) => (
    //                 <div key={index} className={activeTab === index ? "block" : "hidden"}>
    //                     {tab.content}
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );
    return <></>
};
