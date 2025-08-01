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
    "ral_short_info_view__link": "ral_short_info_view__ link / Ссылка на РАЛ",
    "ral_short_info_view__RegNumber": "Рег. номер ИЛ",
    "ral_short_info_view__old_status_AL": "ral_short_info_view__ old_status_AL",
    "ral_short_info_view__new_status_AL": "ral_short_info_view__ new_status_AL",
    "ral_short_info_view__status_change_date": "ral_short_info_view__ status_change_date",
    "ral_short_info_view__nameType": "ral_short_info_view__ nameType",
    "ral_short_info_view__nameTypeActivity": "ral_short_info_view__ nameTypeActivity",
    "ral_short_info_view__regDate": "ral_short_info_view__ regDate",
    "ral_short_info_view__fullName": "ral_short_info_view__ fullName",
    "ral_short_info_view__address": "ral_short_info_view__ address / Адрес АЛ",
    "ral_short_info_view__applicantINN": "ral_short_info_view__ applicantINN",
    "ral_short_info_view__applicantFullName": "ral_short_info_view__ applicantFullName",
    "ral_short_info_view__oaDescription": "ral_short_info_view__ oaDescription",
    "ral_short_info_view__id": "ral_short_info_view__ id / ID РАЛ",
    "ral_short_info_view__NPstatus": "ral_short_info_view__ NPstatus",
    "ral_short_info_view__NP_status_change_date": "ral_short_info_view__ NP_status_change_date / Дата изм. статуса НЧ",
    "ral_short_info_view__regulations": "ral_short_info_view__ regulations",

    // Поля из certificate_applicant
    "certificate_applicant__id": "certificate_applicant__ id / ID заявителя",
    "certificate_applicant__certificate_id": "certificate_applicant__ certificate_id",
    "certificate_applicant__idLegalSubject": "certificate_applicant__ idLegalSubject / ID юридического лица",
    "certificate_applicant__idEgrul": "certificate_applicant__ idEgrul / ID ЕГРЮЛ",
    "certificate_applicant__idApplicantType": "certificate_applicant__ idApplicantType / Тип заявителя",
    "certificate_applicant__idLegalSubjectType": "certificate_applicant__ idLegalSubjectType / Тип юр.лица",
    "certificate_applicant__fullName": "certificate_applicant__ fullName / Полное наименование",
    "certificate_applicant__shortName": "certificate_applicant__ shortName / Краткое наименование",
    "certificate_applicant__idPerson": "certificate_applicant__ idPerson / ID персоны",
    "certificate_applicant__surname": "certificate_applicant__ surname / Фамилия",
    "certificate_applicant__firstName": "certificate_applicant__ firstName / Имя",
    "certificate_applicant__patronymic": "certificate_applicant__ patronymic / Отчество",
    "certificate_applicant__headPosition": "certificate_applicant__ headPosition / Должность руководителя",
    "certificate_applicant__ogrn": "certificate_applicant__ ogrn / ОГРН",
    "certificate_applicant__ogrnAssignDate": "certificate_applicant__ ogrnAssignDate / Дата присвоения ОГРН",
    "certificate_applicant__inn": "certificate_applicant__ inn / ИНН",
    "certificate_applicant__kpp": "certificate_applicant__ kpp / КПП",
    "certificate_applicant__idLegalForm": "certificate_applicant__ idLegalForm / Правовая форма",
    "certificate_applicant__regDate": "certificate_applicant__ regDate / Дата регистрации",
    "certificate_applicant__regOrganName": "certificate_applicant__ regOrganName / Регистрирующий орган",
    "certificate_applicant__addlRegInfo": "certificate_applicant__ addlRegInfo / Доп. рег. информация",
    "certificate_applicant__isEecRegister": "certificate_applicant__ isEecRegister / В реестре ЕЭК",
    "certificate_applicant__passportIssueDate": "certificate_applicant__ passportIssueDate / Дата выдачи паспорта",
    "certificate_applicant__passportIssuedBy": "certificate_applicant__ passportIssuedBy / Кем выдан паспорт",
    "certificate_applicant__passportNum": "certificate_applicant__ passportNum / Номер паспорта",
    "certificate_applicant__idPersonDoc": "certificate_applicant__ idPersonDoc / ID документа",

    // Поля из certification_authority
    "certification_authority__id": "certification_authority__ id / ID органа по сертификации",
    "certification_authority__certificate_id": "certification_authority__ certificate_id",
    "certification_authority__idCertificationAuthority": "certification_authority__idCertificationAuthority / ID органа",
    "certification_authority__fullName": "certification_authority__ fullName / Полное наименование",
    "certification_authority__accredOrgName": "certification_authority__ accredOrgName / Аккредитующий орган",
    "certification_authority__attestatRegNumber": "Рег. номер ОС",
    "certification_authority__attestatRegDate": "certification_authority__ attestatRegDate / Дата регистрации аттестата",
    "certification_authority__attestatEndDate": "certification_authority__ attestatEndDate / Дата окончания аттестата",
    "certification_authority__idRal": "certification_authority__ idRal / ID в РАЛ",
    "certification_authority__ogrn": "certification_authority__ ogrn / ОГРН",
    "certification_authority__idPerson": "certification_authority__ idPerson / ID персоны",
    "certification_authority__firstName": "certification_authority__ firstName / Имя",
    "certification_authority__surname": "certification_authority__ surname / Фамилия",
    "certification_authority__patronymic": "certification_authority__ patronymic / Отчество",

    // Поля из status_change
    "status_change__certificate_id": "status_change__ certificate_id",
    "status_change__status": "status_change__ status / Статус",
    "status_change__begin_date": "status_change__ begin_date / Дата начала",
    "status_change__end_date": "status_change__ end_date / Дата окончания",
    "status_change__comment": "status_change__ comment / Комментарий",
    "status_change__publish_date": "status_change__ publish_date / Дата публикации",
    "status_change__status_changes_by": "status_change__ status_changes_by / Изменено",
    "status_change__id": "status_change__ id / ID изменения",
    "status_change__idChangeStatus": "status_change__ idChangeStatus / ID статуса"
};

const DEFAULT_COLUMNS: TCertificateModel[] = [
    // Основные поля сертификата
    "date",
    "endDate",
    "certificate_name",
    "certificate_status",
    // Поля из status_change
    "status_change__status_changes_by",
    "update_status_date",
    "status_change__publish_date",
    "status_change__certificate_id",
    "status_change__status",
    "status_change__begin_date",
    "status_change__end_date",
    "status_change__comment",
    "id",
    "certificate_id",
    "certificate_link",
    "previous_update_status_date",
    "previous_status",
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
    "status_change__id",
    "status_change__idChangeStatus"
];


const DEFAULT_FILTERS: Partial<Record<TCertificateModel, string[]>> & TDefaultPaginationRequest = {
    page: 1,
    perPage: "25",
    order: "",
    status_change__status_changes_by: [],
    update_status_date: ["", ""],
    certificate_name: [],
    certificate_status: [],
    date: ["", ""],
    endDate: ["", ""],
    technicalReglaments: [],
    ral_short_info_view__RegNumber: []
}

const DEFAULT_REQUEST = {
    page: 1,
    perPage: '25',
    order: "",
    user_columns: DEFAULT_COLUMNS
}

const CELL_WIDTH: Partial<Record<TCertificateModel, number>> = {
    // Основные поля сертификата (без префиксов)
    "certificate_name": 180,
    "certificate_status": 180,
    "id": 200,
    "certificate_id": 200,
    "certificate_link": 200,
    "update_status_date": 200,
    "previous_update_status_date": 200,
    "previous_status": 200,
    "date": 200,
    "endDate": 200,
    "blankNumber": 200,
    "technicalReglaments": 300,
    "group": 200,
    "certType": 200,
    "certObjectType": 200,

    // Поля заявителя (без префиксов)
    "applicantLegalSubjectType": 200,
    "applicantType": 200,
    "applicantName": 200,
    "applicantOpf": 200,
    "applicantFilialFullNames": 200,

    // Поля производителя (без префиксов)
    "manufacterLegalSubjectType": 200,
    "manufacterType": 200,
    "manufacterName": 200,
    "manufacterOpf": 200,
    "manufacterFilialFullNames": 200,

    // Продукция (без префиксов)
    "idRalCertificationAuthority": 200,
    "certificationAuthorityAttestatRegNumber": 200,
    "productOrig": 200,
    "productFullName": 200,
    "productBatchSize": 200,
    "productIdentificationName": 200,
    "productIdentificationType": 200,
    "productIdentificationTrademark": 200,
    "productIdentificationModel": 200,
    "productIdentificationArticle": 200,
    "productIdentificationSort": 200,
    "productIdentificationGtin": 200,

    // Эксперты (без префиксов)
    "expertFio": 200,
    "expertSnils": 200,

    // Поля с префиксом certificate_applicant__
    "certificate_applicant__id": 200,
    "certificate_applicant__certificate_id": 200,
    "certificate_applicant__idLegalSubject": 200,
    "certificate_applicant__idEgrul": 200,
    "certificate_applicant__idApplicantType": 200,
    "certificate_applicant__idLegalSubjectType": 200,
    "certificate_applicant__fullName": 200,
    "certificate_applicant__shortName": 200,
    "certificate_applicant__idPerson": 200,
    "certificate_applicant__surname": 200,
    "certificate_applicant__firstName": 200,
    "certificate_applicant__patronymic": 200,
    "certificate_applicant__headPosition": 200,
    "certificate_applicant__ogrn": 200,
    "certificate_applicant__ogrnAssignDate": 200,
    "certificate_applicant__inn": 200,
    "certificate_applicant__kpp": 200,
    "certificate_applicant__idLegalForm": 200,
    "certificate_applicant__regDate": 200,
    "certificate_applicant__regOrganName": 200,
    "certificate_applicant__addlRegInfo": 200,
    "certificate_applicant__isEecRegister": 200,
    "certificate_applicant__passportIssueDate": 200,
    "certificate_applicant__passportIssuedBy": 200,
    "certificate_applicant__passportNum": 200,
    "certificate_applicant__idPersonDoc": 200,

    // Поля с префиксом certification_authority__
    "certification_authority__id": 200,
    "certification_authority__certificate_id": 200,
    "certification_authority__idCertificationAuthority": 200,
    "certification_authority__fullName": 200,
    "certification_authority__accredOrgName": 200,
    "certification_authority__attestatRegNumber": 200,
    "certification_authority__attestatRegDate": 200,
    "certification_authority__attestatEndDate": 200,
    "certification_authority__idRal": 200,
    "certification_authority__ogrn": 200,
    "certification_authority__idPerson": 200,
    "certification_authority__firstName": 200,
    "certification_authority__surname": 200,
    "certification_authority__patronymic": 200,

    // Поля с префиксом ral_short_info_view__
    "ral_short_info_view__link": 200,
    "ral_short_info_view__RegNumber": 200,
    "ral_short_info_view__old_status_AL": 200,
    "ral_short_info_view__new_status_AL": 200,
    "ral_short_info_view__status_change_date": 200,
    "ral_short_info_view__nameType": 200,
    "ral_short_info_view__nameTypeActivity": 200,
    "ral_short_info_view__regDate": 200,
    "ral_short_info_view__fullName": 200,
    "ral_short_info_view__address": 200,
    "ral_short_info_view__applicantINN": 200,
    "ral_short_info_view__applicantFullName": 200,
    "ral_short_info_view__oaDescription": 200,
    "ral_short_info_view__id": 200,
    "ral_short_info_view__NPstatus": 200,
    "ral_short_info_view__NP_status_change_date": 200,
    "ral_short_info_view__regulations": 200,

    // Поля с префиксом status_change__
    "status_change__certificate_id": 150,
    "status_change__status": 150,
    "status_change__begin_date": 150,
    "status_change__end_date": 150,
    "status_change__comment": 150,
    "status_change__publish_date": 150,
    "status_change__status_changes_by": 150,
    "status_change__id": 150,
    "status_change__idChangeStatus": 150
};

const ORDERABLE_CELLS: TCertificateModel[] = ["update_status_date", "date", "endDate"]

const HIDDEN_COLUMNS: TCertificateModel[] = ["ral_short_info_view__link", "certificate_link", "id", "status_change__certificate_id", "certificate_id"]

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