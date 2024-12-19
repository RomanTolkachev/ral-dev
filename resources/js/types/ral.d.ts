export interface IRalItem {
    header: string
    link: string | null
    RegNumber: string | null
    old_status_AL: string | null
    new_status_AL: string | null
    status_change_date: string | null
    nameType: string | null
    nameTypeActivity: string | null
    regDate: string | null
    fullName: string | null
    address: string | null
    applicantINN: string | null
    applicantFullName: string | null
    oaDescription: string | null
    NPstatus: string | null
    id: number
    NP_status_change_date: string | null
}

export type TPaginatedRal = {
    current_page: number
    data: IRalItem[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: any[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: null | string
    to: number
    total: number
}
