import { TDefaultPaginationRequest } from "@/shared/types/pagination";
import { TCertificateModel } from "./model";


const DICTIONARY: Record<TCertificateModel, string> = {
    applicantFilialFullNames: "applicantFilialFullNames",
    applicantLegalSubjectType: "applicantLegalSubjectType",
    applicantName: "applicantName",
    applicantOpf: "applicantOpf",
    applicantType: "applicantType",
    blankNumber: "blankNumber",
    certificate_id: "certificate_id",
    certificate_link: "certificate_link",
    certificate_name: "certificate_name",
    certificate_status: "certificate_status",
    certificationAuthorityAttestatRegNumber: "certificationAuthorityAttestatRegNumber",
    certObjectType: "certObjectType",
    certType: "certType",
    date: "date",
    endDate: "endDate",
    expertFio: "expertFio",
    expertSnils: "expertSnils",
    group: "group",
    id: "id",
    idRalCertificationAuthority: "idRalCertificationAuthority",
    manufacterFilialFullNames: "manufacterFilialFullNames",
    manufacterLegalSubjectType: "manufacterLegalSubjectType",
    manufacterName: "manufacterName",
    manufacterOpf: "manufacterOpf",
    manufacterType: "manufacterType",
    previous_status: "previous_status",
    previous_update_status_date: "previous_update_status_date",
    productBatchSize: "productBatchSize",
    productFullName: "productFullName",
    productIdentificationArticle: "productIdentificationArticle",
    productIdentificationGtin: "productIdentificationGtin",
    productIdentificationModel: "productIdentificationModel",
    productIdentificationName: "productIdentificationName",
    productIdentificationSort: "productIdentificationSort",
    productIdentificationTrademark: "productIdentificationTrademark",
    productIdentificationType: "productIdentificationType",
    productOrig: "productOrig",
    technicalReglaments: "technicalReglaments",
    update_status_date: "update_status_date",

    address: "адрес АЛ",
    applicantFullName: "applicantFullName",
    applicantINN: "applicantINN",
    fullName: "fullName",
    link: "ссылка",
    nameType: "nameType",
    nameTypeActivity: "nameTypeActivity",
    new_status_AL: "new_status_AL",
    NP_status_change_date: "Дата изм. статуса НЧ",
    NPstatus: "NPstatus",
    oaDescription: "oaDescription",
    old_status_AL: "old_status_AL",
    ral_short_info_view__id: "ral id",
    regDate: "regDate",
    RegNumber: "Рег. номер",
    regulation: "regulation",
    regulations: "regulations",
    status_change_date: "status_change_date",
    tnved: "tnved"

}

const DEFAULT_COLUMNS: TCertificateModel[] = [
    "certificate_name", 
    "certificate_status", 
    "certificate_link", 
    "productIdentificationGtin", 
    "update_status_date", 
    "previous_update_status_date", 
    "previous_status", 
    "date", 
    "endDate", 
    "blankNumber", 
    "technicalReglaments", 
    "group", 
    "certType", 
    "certObjectType", 
    "applicantLegalSubjectType", 
    "applicantType", 
    "applicantName", 
    "applicantOpf", 
    "applicantFilialFullNames", 
    "manufacterLegalSubjectType", 
    "manufacterType", 
    "manufacterName", 
    "manufacterOpf", 
    "manufacterFilialFullNames", 
    "idRalCertificationAuthority", 
    "certificationAuthorityAttestatRegNumber", 
    "productOrig", 
    "productFullName", 
    "productBatchSize", 
    "productIdentificationName", 
    "productIdentificationType", 
    "productIdentificationTrademark", 
    "productIdentificationModel", 
    "productIdentificationArticle", 
    "productIdentificationSort", 
    "expertFio", 
    "expertSnils", 
    'id',  // id обязательно т.к без него не будут работать реляции
    "certificate_id",


    'link',
    'nameType',
    // 'nameTypeActivity',
    'fullName',
    // 'address',
    // 'oaDescription',
    'NPstatus',
    'ral_short_info_view__id',
    // 'regDate',
    'NP_status_change_date',
    'applicantFullName',
    'old_status_AL',
    'new_status_AL',
    'applicantINN',
    'RegNumber',
    'status_change_date',
    // 'regulations',
    // 'tnved',
    // 'regulation',

];


const DEFAULT_FILTERS: Partial<Record<TCertificateModel, string[]>> & TDefaultPaginationRequest = {
    page: 1,
    perPage: "10",
}

const DEFAULT_REQUEST = {
    page: 1,
    perPage: '10',
    user_columns: DEFAULT_COLUMNS
}

const CELL_WIDTH: Partial<Record<TCertificateModel, number>> = {
}

export const config: IConfig<TCertificateModel> = {
    DICTIONARY,
    DEFAULT_COLUMNS,
    DEFAULT_FILTERS,
    DEFAULT_REQUEST,
    CELL_WIDTH
}

export default { DEFAULT_FILTERS, DEFAULT_REQUEST, DEFAULT_COLUMNS, DICTIONARY, CELL_WIDTH }