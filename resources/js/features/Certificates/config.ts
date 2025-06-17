import { TDefaultPaginationRequest } from "@/shared/types/pagination";
import { TCertificateModel } from "./model";


const DICTIONARY: Record<TCertificateModel, string> = {
    applicantFilialFullNames: "applicantFilialFullNames",
    applicantLegalSubjectType: "applicantLegalSubjectType",
    applicantName: "applicantName",
    applicantOpf: "applicantOpf",
    applicantType: "applicantType",
    blankNumber: "blankNumber",
    certificate_applicant__id: "certificate_applicant__id",
    certificate_id: "certificate_id",
    certificate_link: "certificate_link",
    certificate_name: "certificate_name",
    certificate_status: "certificate_status",
    certificate_testinglabs__id: "certificate_testinglabs__id",
    certification_authority__id: "certification_authority__id",
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
    update_status_date: "update_status_date"
}

const DEFAULT_COLUMNS: TCertificateModel[] = [
    "certificate_name", 
    "certificate_status", 
    "certificate_link", 
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
    "productIdentificationGtin", 
    "expertFio", 
    "expertSnils", 
    "id", 
    "certificate_id",
    "certificate_testinglabs__id", //внешняя
    "certification_authority__id", //внешняя
    "certificate_applicant__id", //внешняя
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

const config: IConfig<TCertificateModel> = {
    DICTIONARY,
    DEFAULT_COLUMNS,
    DEFAULT_FILTERS,
    DEFAULT_REQUEST,
    CELL_WIDTH
}

export default { DEFAULT_FILTERS, DEFAULT_REQUEST, DEFAULT_COLUMNS, DICTIONARY, CELL_WIDTH }