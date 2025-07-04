import { TDefaultPaginationRequest } from "@/shared/types/pagination";
import { TCertificateModel } from "./model";


const DICTIONARY: Record<TCertificateModel, string> = {
    // Основные поля сертификата
    "certificate_name": "certificate_name / Регистрационный номер сертификата",
    "certificate_status": "certificate_status / Статус сертификата",
    "id": "id",
    "certificate_id": "certificate_id",
    "certificate_link": "certificate_link",
    "update_status_date": "update_status_date / Дата изменения статуса (актуального)",
    "previous_update_status_date": "previous_update_status_date / Дата изменения статуса (предыдущего)",
    "previous_status": "previous_status / Предыдущий статус",
    "date": "date / Дата регистрации сертификата",
    "endDate": "endDate / Дата окончания действия сертификата",
    "blankNumber": "blankNumber / Номер бланка",
    "technicalReglaments": "technicalReglaments / Технические регламенты",
    "group": "group / Группа продукции ЕАЭС",
    "certType": "certType / Тип сертификата",
    "certObjectType": "certObjectType / Тип объекта сертификации",
    
    // Информация о заявителе
    "applicantLegalSubjectType": "applicantLegalSubjectType / Тип заявителя",
    "applicantType": "applicantType / Вид заявителя",
    "applicantName": "applicantName / Полное наименование (заявителя)",
    "applicantOpf": "applicantOpf / Организационно-правовая форма (заявителя)",
    "applicantFilialFullNames": "applicantFilialFullNames / Полное наименование филиалов (заявителя)",
    
    // Информация о производителе
    "manufacterLegalSubjectType": "manufacterLegalSubjectType / Тип изготовителя",
    "manufacterType": "manufacterType",
    "manufacterName": "manufacterName / Полное наименование (изготовителя)",
    "manufacterOpf": "manufacterOpf / Организационно-правовая форма (изготовителя)",
    "manufacterFilialFullNames": "manufacterFilialFullNames / Полное наименование филиалов (изготовителя)",
    
    // Продукция
    "idRalCertificationAuthority": "idRalCertificationAuthority",
    "certificationAuthorityAttestatRegNumber": "certificationAuthorityAttestatRegNumber / Номер записи в РАЛ органа по сертификации",
    "productOrig": "productOrig / Происхождение продукции",
    "productFullName": "productFullName / Общее наименование продукции",
    "productBatchSize": "productBatchSize / Размер партии",
    "productIdentificationName": "productIdentificationName / Наименование (обозначение) продукции",
    "productIdentificationType": "productIdentificationType / Тип (продукции)",
    "productIdentificationTrademark": "productIdentificationTrademark / Торговая марка",
    "productIdentificationModel": "productIdentificationModel / Модель",
    "productIdentificationArticle": "productIdentificationArticle",
    "productIdentificationSort": "productIdentificationSort",
    "productIdentificationGtin": "productIdentificationGtin",
    
    // Эксперты
    "expertFio": "expertFio",
    "expertSnils": "expertSnils",
    
    // Поля из ral_short_info_view
    "ral_short_info_view__link": "ral_short_info_view__link / Ссылка на РАЛ",
    "ral_short_info_view__RegNumber": "ral_short_info_view__RegNumber / Рег. номер",
    "ral_short_info_view__old_status_AL": "ral_short_info_view__old_status_AL",
    "ral_short_info_view__new_status_AL": "ral_short_info_view__new_status_AL",
    "ral_short_info_view__status_change_date": "ral_short_info_view__status_change_date",
    "ral_short_info_view__nameType": "ral_short_info_view__nameType",
    "ral_short_info_view__nameTypeActivity": "ral_short_info_view__nameTypeActivity",
    "ral_short_info_view__regDate": "ral_short_info_view__regDate",
    "ral_short_info_view__fullName": "ral_short_info_view__fullName",
    "ral_short_info_view__address": "ral_short_info_view__address / Адрес АЛ",
    "ral_short_info_view__applicantINN": "ral_short_info_view__applicantINN",
    "ral_short_info_view__applicantFullName": "ral_short_info_view__applicantFullName",
    "ral_short_info_view__oaDescription": "ral_short_info_view__oaDescription",
    "ral_short_info_view__id": "ral_short_info_view__id / ID РАЛ",
    "ral_short_info_view__NPstatus": "ral_short_info_view__NPstatus",
    "ral_short_info_view__NP_status_change_date": "ral_short_info_view__NP_status_change_date / Дата изм. статуса НЧ",
    "ral_short_info_view__regulations": "ral_short_info_view__regulations",
    
    // Поля из certificate_applicant
    "certificate_applicant__id": "certificate_applicant__id / ID заявителя",
    "certificate_applicant__certificate_id": "certificate_applicant__certificate_id",
    "certificate_applicant__idLegalSubject": "certificate_applicant__idLegalSubject / ID юридического лица",
    "certificate_applicant__idEgrul": "certificate_applicant__idEgrul / ID ЕГРЮЛ",
    "certificate_applicant__idApplicantType": "certificate_applicant__idApplicantType / Тип заявителя",
    "certificate_applicant__idLegalSubjectType": "certificate_applicant__idLegalSubjectType / Тип юр.лица",
    "certificate_applicant__fullName": "certificate_applicant__fullName / Полное наименование",
    "certificate_applicant__shortName": "certificate_applicant__shortName / Краткое наименование",
    "certificate_applicant__idPerson": "certificate_applicant__idPerson / ID персоны",
    "certificate_applicant__surname": "certificate_applicant__surname / Фамилия",
    "certificate_applicant__firstName": "certificate_applicant__firstName / Имя",
    "certificate_applicant__patronymic": "certificate_applicant__patronymic / Отчество",
    "certificate_applicant__headPosition": "certificate_applicant__headPosition / Должность руководителя",
    "certificate_applicant__ogrn": "certificate_applicant__ogrn / ОГРН",
    "certificate_applicant__ogrnAssignDate": "certificate_applicant__ogrnAssignDate / Дата присвоения ОГРН",
    "certificate_applicant__inn": "certificate_applicant__inn / ИНН",
    "certificate_applicant__kpp": "certificate_applicant__kpp / КПП",
    "certificate_applicant__idLegalForm": "certificate_applicant__idLegalForm / Правовая форма",
    "certificate_applicant__regDate": "certificate_applicant__regDate / Дата регистрации",
    "certificate_applicant__regOrganName": "certificate_applicant__regOrganName / Регистрирующий орган",
    "certificate_applicant__addlRegInfo": "certificate_applicant__addlRegInfo / Доп. рег. информация",
    "certificate_applicant__isEecRegister": "certificate_applicant__isEecRegister / В реестре ЕЭК",
    "certificate_applicant__passportIssueDate": "certificate_applicant__passportIssueDate / Дата выдачи паспорта",
    "certificate_applicant__passportIssuedBy": "certificate_applicant__passportIssuedBy / Кем выдан паспорт",
    "certificate_applicant__passportNum": "certificate_applicant__passportNum / Номер паспорта",
    "certificate_applicant__idPersonDoc": "certificate_applicant__idPersonDoc / ID документа",
    
    // Поля из certification_authority
    "certification_authority__id": "certification_authority__id / ID органа по сертификации",
    "certification_authority__certificate_id": "certification_authority__certificate_id",
    "certification_authority__idCertificationAuthority": "certification_authority__idCertificationAuthority / ID органа",
    "certification_authority__fullName": "certification_authority__fullName / Полное наименование",
    "certification_authority__accredOrgName": "certification_authority__accredOrgName / Аккредитующий орган",
    "certification_authority__attestatRegNumber": "certification_authority__attestatRegNumber / Номер аттестата",
    "certification_authority__attestatRegDate": "certification_authority__attestatRegDate / Дата регистрации аттестата",
    "certification_authority__attestatEndDate": "certification_authority__attestatEndDate / Дата окончания аттестата",
    "certification_authority__idRal": "certification_authority__idRal / ID в РАЛ",
    "certification_authority__ogrn": "certification_authority__ogrn / ОГРН",
    "certification_authority__idPerson": "certification_authority__idPerson / ID персоны",
    "certification_authority__firstName": "certification_authority__firstName / Имя",
    "certification_authority__surname": "certification_authority__surname / Фамилия",
    "certification_authority__patronymic": "certification_authority__patronymic / Отчество",
    
    // Поля из status_change
    "status_change__certificate_id": "status_change__certificate_id",
    "status_change__status": "status_change__status / Статус",
    "status_change__begin_date": "status_change__begin_date / Дата начала",
    "status_change__end_date": "status_change__end_date / Дата окончания",
    "status_change__comment": "status_change__comment / Комментарий",
    "status_change__publish_date": "status_change__publish_date / Дата публикации",
    "status_change__status_changes_by": "Изменено",
    "status_change__id": "status_change__id / ID изменения",
    "status_change__idChangeStatus": "status_change__idChangeStatus / ID статуса"
};

const DEFAULT_COLUMNS: TCertificateModel[] = [
    // Основные поля сертификата
    "certificate_name",
    "certificate_status",
    "id",
    "certificate_id",
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
    
    // Информация о заявителе
    "applicantLegalSubjectType",
    "applicantType",
    "applicantName",
    "applicantOpf",
    "applicantFilialFullNames",
    
    // Информация о производителе
    "manufacterLegalSubjectType",
    "manufacterType",
    "manufacterName",
    "manufacterOpf",
    "manufacterFilialFullNames",
    
    // Продукция
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
    
    // Эксперты
    "expertFio",
    "expertSnils",
    
    // Поля из ral_short_info_view
    "ral_short_info_view__link",
    "ral_short_info_view__RegNumber",
    "ral_short_info_view__old_status_AL",
    "ral_short_info_view__new_status_AL",
    "ral_short_info_view__status_change_date",
    "ral_short_info_view__nameType",
    "ral_short_info_view__nameTypeActivity",
    "ral_short_info_view__regDate",
    "ral_short_info_view__fullName",
    "ral_short_info_view__address",
    "ral_short_info_view__applicantINN",
    "ral_short_info_view__applicantFullName",
    // "ral_short_info_view__oaDescription",
    "ral_short_info_view__id",
    "ral_short_info_view__NPstatus",
    "ral_short_info_view__NP_status_change_date",
    "ral_short_info_view__regulations",
    
    // Поля из certificate_applicant
    "certificate_applicant__id",
    "certificate_applicant__certificate_id",
    "certificate_applicant__idLegalSubject",
    "certificate_applicant__idEgrul",
    "certificate_applicant__idApplicantType",
    "certificate_applicant__idLegalSubjectType",
    "certificate_applicant__fullName",
    "certificate_applicant__shortName",
    "certificate_applicant__idPerson",
    "certificate_applicant__surname",
    "certificate_applicant__firstName",
    "certificate_applicant__patronymic",
    "certificate_applicant__headPosition",
    "certificate_applicant__ogrn",
    "certificate_applicant__ogrnAssignDate",
    "certificate_applicant__inn",
    "certificate_applicant__kpp",
    "certificate_applicant__idLegalForm",
    "certificate_applicant__regDate",
    "certificate_applicant__regOrganName",
    "certificate_applicant__addlRegInfo",
    "certificate_applicant__isEecRegister",
    "certificate_applicant__passportIssueDate",
    "certificate_applicant__passportIssuedBy",
    "certificate_applicant__passportNum",
    "certificate_applicant__idPersonDoc",
    
    // Поля из certification_authority
    "certification_authority__id",
    "certification_authority__certificate_id",
    "certification_authority__idCertificationAuthority",
    "certification_authority__fullName",
    "certification_authority__accredOrgName",
    "certification_authority__attestatRegNumber",
    "certification_authority__attestatRegDate",
    "certification_authority__attestatEndDate",
    "certification_authority__idRal",
    "certification_authority__ogrn",
    "certification_authority__idPerson",
    "certification_authority__firstName",
    "certification_authority__surname",
    "certification_authority__patronymic",
    
    // Поля из status_change
    "status_change__certificate_id",
    "status_change__status",
    "status_change__begin_date",
    "status_change__end_date",
    "status_change__comment",
    "status_change__publish_date",
    "status_change__status_changes_by",
    "status_change__id",
    "status_change__idChangeStatus"
];


const DEFAULT_FILTERS: Partial<Record<TCertificateModel, string[]>> & TDefaultPaginationRequest = {
    page: 1,
    perPage: "10",
    order: "",
    status_change__status_changes_by: [],
    update_status_date: ["", ""]
}

const DEFAULT_REQUEST = {
    page: 1,
    perPage: '10',
    order: "",
    user_columns: DEFAULT_COLUMNS
}

const CELL_WIDTH: Partial<Record<TCertificateModel, number>> = {
    // Основные поля сертификата (без префиксов)
    "certificate_name": 300,
    "certificate_status": 300,
    "id": 300,
    "certificate_id": 300,
    "certificate_link": 300,
    "update_status_date": 300,
    "previous_update_status_date": 300,
    "previous_status": 300,
    "date": 300,
    "endDate": 300,
    "blankNumber": 300,
    "technicalReglaments": 300,
    "group": 300,
    "certType": 300,
    "certObjectType": 300,
    
    // Поля заявителя (без префиксов)
    "applicantLegalSubjectType": 300,
    "applicantType": 300,
    "applicantName": 300,
    "applicantOpf": 300,
    "applicantFilialFullNames": 300,
    
    // Поля производителя (без префиксов)
    "manufacterLegalSubjectType": 300,
    "manufacterType": 300,
    "manufacterName": 300,
    "manufacterOpf": 300,
    "manufacterFilialFullNames": 300,
    
    // Продукция (без префиксов)
    "idRalCertificationAuthority": 300,
    "certificationAuthorityAttestatRegNumber": 300,
    "productOrig": 300,
    "productFullName": 300,
    "productBatchSize": 300,
    "productIdentificationName": 300,
    "productIdentificationType": 300,
    "productIdentificationTrademark": 300,
    "productIdentificationModel": 300,
    "productIdentificationArticle": 300,
    "productIdentificationSort": 300,
    "productIdentificationGtin": 300,
    
    // Эксперты (без префиксов)
    "expertFio": 300,
    "expertSnils": 300,

    // Поля с префиксом certificate_applicant__
    "certificate_applicant__id": 300,
    "certificate_applicant__certificate_id": 300,
    "certificate_applicant__idLegalSubject": 300,
    "certificate_applicant__idEgrul": 300,
    "certificate_applicant__idApplicantType": 300,
    "certificate_applicant__idLegalSubjectType": 300,
    "certificate_applicant__fullName": 300,
    "certificate_applicant__shortName": 300,
    "certificate_applicant__idPerson": 300,
    "certificate_applicant__surname": 300,
    "certificate_applicant__firstName": 300,
    "certificate_applicant__patronymic": 300,
    "certificate_applicant__headPosition": 300,
    "certificate_applicant__ogrn": 300,
    "certificate_applicant__ogrnAssignDate": 300,
    "certificate_applicant__inn": 300,
    "certificate_applicant__kpp": 300,
    "certificate_applicant__idLegalForm": 300,
    "certificate_applicant__regDate": 300,
    "certificate_applicant__regOrganName": 300,
    "certificate_applicant__addlRegInfo": 300,
    "certificate_applicant__isEecRegister": 300,
    "certificate_applicant__passportIssueDate": 300,
    "certificate_applicant__passportIssuedBy": 300,
    "certificate_applicant__passportNum": 300,
    "certificate_applicant__idPersonDoc": 300,

    // Поля с префиксом certification_authority__
    "certification_authority__id": 300,
    "certification_authority__certificate_id": 300,
    "certification_authority__idCertificationAuthority": 300,
    "certification_authority__fullName": 300,
    "certification_authority__accredOrgName": 300,
    "certification_authority__attestatRegNumber": 300,
    "certification_authority__attestatRegDate": 300,
    "certification_authority__attestatEndDate": 300,
    "certification_authority__idRal": 300,
    "certification_authority__ogrn": 300,
    "certification_authority__idPerson": 300,
    "certification_authority__firstName": 300,
    "certification_authority__surname": 300,
    "certification_authority__patronymic": 300,

    // Поля с префиксом ral_short_info_view__
    "ral_short_info_view__link": 300,
    "ral_short_info_view__RegNumber": 300,
    "ral_short_info_view__old_status_AL": 300,
    "ral_short_info_view__new_status_AL": 300,
    "ral_short_info_view__status_change_date": 300,
    "ral_short_info_view__nameType": 300,
    "ral_short_info_view__nameTypeActivity": 300,
    "ral_short_info_view__regDate": 300,
    "ral_short_info_view__fullName": 300,
    "ral_short_info_view__address": 300,
    "ral_short_info_view__applicantINN": 300,
    "ral_short_info_view__applicantFullName": 300,
    "ral_short_info_view__oaDescription": 300,
    "ral_short_info_view__id": 300,
    "ral_short_info_view__NPstatus": 300,
    "ral_short_info_view__NP_status_change_date": 300,
    "ral_short_info_view__regulations": 300,

    // Поля с префиксом status_change__
    "status_change__certificate_id": 300,
    "status_change__status": 300,
    "status_change__begin_date": 300,
    "status_change__end_date": 300,
    "status_change__comment": 300,
    "status_change__publish_date": 300,
    "status_change__status_changes_by": 300,
    "status_change__id": 300,
    "status_change__idChangeStatus": 300
};

const ORDERABLE_CELLS: TCertificateModel[] = ["update_status_date"]

const HIDDEN_COLUMNS: TCertificateModel[] = ["ral_short_info_view__link", "certificate_link", "id",]

export const config: IConfig<TCertificateModel> = {
    DICTIONARY,
    DEFAULT_COLUMNS,
    DEFAULT_FILTERS,
    DEFAULT_REQUEST,
    CELL_WIDTH,
    ORDERABLE_CELLS,
    HIDDEN_COLUMNS,
}

export default {
    DEFAULT_FILTERS,
    DEFAULT_REQUEST,
    DEFAULT_COLUMNS,
    DICTIONARY,
    CELL_WIDTH,
    ORDERABLE_CELLS,
    HIDDEN_COLUMNS
}