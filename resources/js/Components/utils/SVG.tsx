import {FunctionComponent} from 'react';

interface IProps {
    className?: string
    arrow?: boolean
}

export const SVG: FunctionComponent<IProps> = ({
    className,
    arrow= false
}) => {
    if (!arrow) {
        return null
    }
    return (
        <>
            {arrow && (
                <svg version="1.0" className={`${className}`} xmlns="http://www.w3.org/2000/svg"
                     width="100%" height="100%" viewBox="0 0 1280.000000 832.000000"
                     preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,832.000000) scale(0.100000,-0.100000)"
                       fill="currentcolor" stroke="none">
                        <path d="M6345 8307 c-22 -8 -55 -21 -73 -31 -18 -9 -1425 -1408 -3127 -3109
                                -2626 -2623 -3099 -3100 -3117 -3142 -31 -70 -31 -180 0 -251 19 -42 160 -187
                                865 -891 937 -935 871 -878 1013 -878 59 0 80 5 128 30 47 25 352 325 1799
                                1770 958 957 1932 1929 2164 2160 l423 420 2147 -2146 c2386 -2384 2182 -2192
                                2324 -2192 137 0 87 -43 1020 891 668 669 841 847 860 887 33 68 33 178 1 250
                                -19 43 -487 515 -3095 3122 -2601 2601 -3080 3076 -3121 3094 -61 26 -157 34
                                -211 16z"/>
                    </g>
                </svg>
            )}
        </>
    )
};
