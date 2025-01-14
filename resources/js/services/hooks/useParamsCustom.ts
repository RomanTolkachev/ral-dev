import { useSearchParams } from 'react-router'
import qs from 'qs'

type QueryParams = Record<string, any>
type TParamsCustom = [(query: QueryParams) => void, () => QueryParams]

function useParamsCustom(): TParamsCustom {
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
