interface ILinks {
    url: string
    label: string
    active: boolean
}

interface IPagination {
    current_page: number
    data: unknown
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: ILinks[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: string
    to: number
    total: number
}

export type TDefaultPaginationRequest = {
    page: number,
    perPage: string,
    order?: unknown
}

export default IPagination