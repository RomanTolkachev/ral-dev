import { useSearchParams } from 'react-router'
import * as qs from 'qs'

function useParamsCustom() {
    const [searchParams, setSearchParams] = useSearchParams()

    function setQuery(query: Record<string, any>) {
        setSearchParams(qs.stringify(query, { arrayFormat: 'brackets' }))
    }

    function getQuery() {
        return qs.parse(searchParams.toString())
    }

    return [setQuery, getQuery]
}

export default useParamsCustom
