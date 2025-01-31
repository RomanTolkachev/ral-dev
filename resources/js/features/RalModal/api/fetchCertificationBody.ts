import { axiosApi } from "@/services/api";

function fetchCertificationBody(certificationBodyId: string | number) {
    return axiosApi.get<Record<string, any>>('/ral/certification_body', {
        params: {cert_id: certificationBodyId}
    });
}

export default fetchCertificationBody;