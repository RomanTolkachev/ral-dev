import { useSearchParams } from 'react-router'
import qs from 'qs'

type QueryParams = Record<string, any>
export type TParamsCustom = [(query: QueryParams, replace?: boolean) => void, () => QueryParams]

function useParamsCustom(): TParamsCustom {
    const [searchParams, setSearchParams] = useSearchParams()

    function setQuery(query: Record<string, any>, replace: boolean = false) {
        setSearchParams(qs.stringify(query, { arrayFormat: 'brackets' }), {replace})
    }

    function getQuery() {
        return qs.parse(searchParams.toString())
    }

    return [setQuery, getQuery]
}

export default useParamsCustom
