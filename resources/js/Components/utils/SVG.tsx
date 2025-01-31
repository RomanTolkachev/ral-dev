import { FunctionComponent } from 'react'

interface IProps {
    className?: string
    clickHandler?: (e: any) => void //TODO: тут нормально any?
    arrow?: boolean
    notFound?: boolean
    sun?: boolean
    moon?: boolean
    magnifyingGlass?: boolean
    schedule?: boolean
    alert?: boolean
    escape?: boolean
}

export const SVG: FunctionComponent<IProps> = ({
    className,
    clickHandler,
    arrow = false,
    notFound = false,
    sun = false,
    moon = false,
    magnifyingGlass = false,
    schedule = false,
    alert = false,
    escape = false
}) => {
    if (!arrow && !notFound && !sun && !moon && !magnifyingGlass && !schedule && !alert && !escape) {
        return null
    }
    return (
        <>
            {arrow && (
                <svg
                    version="1.0"
                    className={`${className}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 1280.000000 832.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g
                        transform="translate(0.000000,832.000000) scale(0.100000,-0.100000)"
                        fill="currentcolor"
                        stroke="none">
                        <path
                            d="M6345 8307 c-22 -8 -55 -21 -73 -31 -18 -9 -1425 -1408 -3127 -3109
                                -2626 -2623 -3099 -3100 -3117 -3142 -31 -70 -31 -180 0 -251 19 -42 160 -187
                                865 -891 937 -935 871 -878 1013 -878 59 0 80 5 128 30 47 25 352 325 1799
                                1770 958 957 1932 1929 2164 2160 l423 420 2147 -2146 c2386 -2384 2182 -2192
                                2324 -2192 137 0 87 -43 1020 891 668 669 841 847 860 887 33 68 33 178 1 250
                                -19 43 -487 515 -3095 3122 -2601 2601 -3080 3076 -3121 3094 -61 26 -157 34
                                -211 16z"
                        />
                    </g>
                </svg>
            )}
            {notFound && (
                <svg
                    className={`${className}`}
                    width="100%"
                    height="100%"
                    viewBox="0 0 500 500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M308.878 323.257C308.878 323.257 338.135 305.311 338.878 300.786C339.621 296.261 318.678 263.408 318.678 263.408L334.719 232.616C334.719 232.616 382.695 286.038 381.204 303.461C379.713 320.884 329.592 362.339 329.592 362.339C329.592 362.339 308.458 323.391 308.877 323.257H308.878Z"
                        fill="#FFA775"
                    />
                    <path
                        d="M339.69 301.726C339.427 301.726 339.173 301.635 338.971 301.467C338.769 301.299 338.632 301.066 338.585 300.807C338.537 300.549 338.582 300.282 338.71 300.053C338.839 299.825 339.044 299.648 339.29 299.555C342.571 298.371 346.143 298.261 349.49 299.24C349.633 299.277 349.767 299.341 349.885 299.429C350.003 299.518 350.102 299.629 350.177 299.755C350.252 299.882 350.301 300.022 350.322 300.168C350.343 300.314 350.335 300.463 350.298 300.606C350.262 300.748 350.198 300.882 350.109 301C350.021 301.118 349.91 301.217 349.783 301.293C349.656 301.368 349.516 301.417 349.37 301.438C349.224 301.459 349.076 301.451 348.933 301.414C346.033 300.554 342.934 300.638 340.084 301.652C339.958 301.7 339.825 301.725 339.69 301.726Z"
                        fill="#29263B"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M141.82 446.514L137.42 477.506C144.32 482.345 154.189 484.063 165.086 481.933L168.323 454.245L141.823 446.514H141.82Z"
                        fill="#FFBF9B"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M199.984 350.709C189.621 353.601 172.695 355.859 165.763 365.539C151.175 385.917 144.977 418.362 140.524 447.63C146.793 451.41 157.407 456.109 166.854 455.346L164.033 481.928C208.548 493.259 249.883 491.817 289.343 482.836C296.18 451.481 297.779 417.728 297.784 398.202L336.048 372.374C334.5 351.574 326.236 328.139 309.648 320.353L252.672 348.122L199.983 350.709H199.984Z"
                        fill="#86B4FF"
                    />
                    <path
                        d="M167.317 456.434C167.26 456.434 167.203 456.43 167.147 456.421C166.853 456.376 166.589 456.216 166.412 455.977C166.236 455.737 166.162 455.437 166.207 455.143C169.97 430.419 171.275 410.584 170.315 392.72C170.307 392.573 170.328 392.426 170.377 392.287C170.426 392.148 170.502 392.02 170.601 391.91C170.699 391.8 170.818 391.711 170.951 391.648C171.084 391.584 171.228 391.547 171.375 391.539C171.523 391.532 171.67 391.553 171.809 391.602C171.948 391.651 172.076 391.727 172.185 391.825C172.295 391.924 172.384 392.043 172.448 392.176C172.511 392.309 172.548 392.453 172.556 392.6C173.524 410.621 172.212 430.6 168.426 455.481C168.385 455.746 168.251 455.988 168.048 456.163C167.844 456.338 167.585 456.434 167.317 456.434Z"
                        fill="#29263B"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M141.794 218.271C130.849 215.496 125.479 208.119 131.811 191.087C112.711 179.339 111.339 165.457 136.821 148.333C119.989 126.126 134.963 106.433 162.911 118.723C164.273 98.151 173.311 89.635 194.745 100.615C198.945 74.308 233.851 70.248 242.098 96.404C258.498 77.562 286.859 91.304 282.857 111.497C305.981 104.772 327.857 124.949 319.041 147.391C339.762 149.741 343.841 169.639 333.986 180.601C355.412 191.367 352.457 208.844 338.748 213.948C349.819 234.52 349.588 248.148 331.74 250.964C332.967 268.036 326.14 282.947 309.092 276.732C305.044 288.876 294.716 293.952 284.624 288.439L141.794 218.271Z"
                        fill="#29263B"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M157.4 181.6C157.4 181.6 117.21 235.151 126.782 277.816C138.03 327.947 191.982 326.396 208.664 327.016C211.804 354.039 198.837 352.526 198.837 352.526C189.328 395.383 237.806 396.516 256.81 346.677C241.865 338.74 240.501 324.877 260.31 295.139C291.268 318.408 318.197 271.561 287.565 261.124C281.699 254.477 283.765 242.587 291.533 237.446C276.386 238.368 280.14 222.769 288.864 212.255C266.22 218.518 264.935 205.888 273.839 190.001C251.797 199.522 243.532 189.001 248.191 173.472C230.12 193.307 207.936 193.69 212.249 172.487C192.739 193.872 172.873 194.82 173.983 177.514C168.847 185.548 158.77 187.934 157.397 181.597L157.4 181.6Z"
                        fill="#FFA775"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M231.541 319.982C225.783 323.882 215.841 326.471 208.66 327.014C209.112 330.574 209.246 334.168 209.06 337.752C219.182 337.262 228.213 329.77 231.541 319.982Z"
                        fill="#F08855"
                    />
                    <path
                        d="M272.992 289.792C272.802 289.792 272.615 289.744 272.448 289.651C272.282 289.559 272.142 289.426 272.041 289.264C271.94 289.103 271.882 288.918 271.872 288.728C271.863 288.538 271.901 288.349 271.985 288.178C276.962 277.984 284.934 274.245 295.679 277.057C295.967 277.132 296.213 277.319 296.363 277.576C296.514 277.833 296.556 278.139 296.48 278.427C296.405 278.715 296.218 278.961 295.961 279.111C295.704 279.261 295.398 279.303 295.11 279.228C285.41 276.687 278.51 279.938 274.001 289.163C273.909 289.352 273.765 289.511 273.587 289.622C273.408 289.733 273.202 289.792 272.992 289.792Z"
                        fill="#29263B"
                    />
                    <path
                        d="M163.938 247.461C163.775 247.461 163.614 247.425 163.466 247.356C163.318 247.287 163.187 247.186 163.082 247.061C157.782 240.834 155.892 235.245 157.458 230.45C159.528 224.112 167.324 219.41 181.292 216.075C181.435 216.041 181.584 216.035 181.73 216.058C181.875 216.082 182.015 216.133 182.14 216.21C182.266 216.288 182.375 216.389 182.461 216.508C182.548 216.627 182.61 216.763 182.644 216.906C182.678 217.049 182.684 217.198 182.661 217.344C182.637 217.489 182.586 217.629 182.509 217.754C182.431 217.88 182.33 217.989 182.211 218.075C182.092 218.162 181.956 218.224 181.813 218.258C168.851 221.353 161.374 225.689 159.591 231.146C158.283 235.146 160.033 240.015 164.791 245.607C164.93 245.77 165.02 245.969 165.049 246.182C165.078 246.394 165.046 246.61 164.956 246.805C164.867 246.999 164.723 247.164 164.543 247.279C164.362 247.395 164.152 247.456 163.938 247.456V247.461Z"
                        fill="#29263B"
                    />
                    <path
                        d="M195.647 284.628C195.488 284.628 195.33 284.595 195.185 284.529C195.04 284.463 194.911 284.368 194.806 284.248C190.544 279.408 186.86 277.105 183.925 277.36C181.807 277.553 179.925 279.06 178.176 281.975C178.018 282.221 177.771 282.396 177.486 282.463C177.202 282.529 176.902 282.482 176.652 282.331C176.401 282.181 176.219 281.939 176.145 281.656C176.07 281.373 176.109 281.073 176.252 280.818C178.367 277.299 180.881 275.383 183.722 275.125C187.469 274.79 191.66 277.282 196.489 282.765C196.632 282.927 196.725 283.127 196.757 283.34C196.789 283.554 196.759 283.772 196.67 283.969C196.581 284.165 196.437 284.332 196.256 284.449C196.074 284.566 195.863 284.628 195.647 284.628Z"
                        fill="#29263B"
                    />
                    <path
                        d="M252.41 209.219C251.74 209.218 251.095 208.968 250.6 208.516C250.104 208.065 249.795 207.446 249.732 206.779C249.184 200.961 247.684 197.069 245.273 195.211C243.592 193.911 241.335 193.521 238.373 194.011C237.668 194.127 236.946 193.958 236.366 193.542C235.785 193.126 235.394 192.496 235.278 191.791C235.162 191.086 235.331 190.364 235.747 189.784C236.163 189.203 236.793 188.812 237.498 188.696C241.949 187.963 245.673 188.72 248.562 190.947C252.253 193.793 254.39 198.807 255.094 206.274C255.161 206.985 254.943 207.693 254.487 208.244C254.032 208.794 253.377 209.141 252.666 209.208C252.58 209.215 252.494 209.219 252.41 209.219Z"
                        fill="#29263B"
                    />
                    <path
                        d="M156.577 199.507C156.108 199.507 155.648 199.384 155.241 199.151C154.834 198.918 154.495 198.583 154.257 198.179C154.02 197.775 153.892 197.316 153.886 196.848C153.88 196.379 153.996 195.917 154.224 195.507C156.624 191.167 159.391 188.649 162.669 187.807C165.569 187.062 168.683 187.722 171.924 189.765C172.527 190.146 172.954 190.751 173.111 191.447C173.268 192.143 173.143 192.873 172.763 193.476C172.382 194.08 171.778 194.508 171.083 194.666C170.387 194.825 169.657 194.701 169.053 194.322C167.087 193.082 165.443 192.658 164.008 193.022C162.267 193.469 160.56 195.183 158.935 198.115C158.702 198.537 158.361 198.888 157.946 199.133C157.531 199.378 157.059 199.507 156.577 199.507Z"
                        fill="#29263B"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M234.93 205.689C238.079 206.5 239.43 211.83 237.956 217.589C236.482 223.348 232.717 227.361 229.569 226.554C226.421 225.747 225.069 220.413 226.542 214.654C228.015 208.895 231.778 204.883 234.93 205.69V205.689Z"
                        fill="#29263B"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M160.719 201C163.528 201.619 164.85 206.49 163.665 211.871C162.48 217.252 159.24 221.118 156.428 220.498C153.616 219.878 152.297 215.008 153.482 209.63C154.667 204.252 157.91 200.38 160.719 201Z"
                        fill="#29263B"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M303.838 38.623C303.765 23.585 315.446 10.53 341.592 10.012C367.738 9.494 385.192 25.871 382.068 38.554C377.991 55.1 349.583 59.747 350.045 77.2C350.115 79.855 332.819 79.616 332.819 76.959C332.419 59.573 366.919 51.172 367.445 38.229C367.901 26.881 358.632 20.729 341.734 20.729C329.994 20.729 320.126 26.777 319.261 38.485C319.113 40.96 303.85 41.099 303.838 38.621V38.623Z"
                        fill="#E1B100"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M341.336 85.449C347.926 85.449 353.275 88.992 353.275 93.358C353.275 97.724 347.926 101.265 341.336 101.265C334.746 101.265 329.4 97.722 329.4 93.358C329.4 88.994 334.749 85.449 341.337 85.449H341.336Z"
                        fill="#E1B100"
                    />
                </svg>
            )}
            {sun && (
                <svg className={`${className}`} viewBox="0 0 12 12" width="100%" height="100%" aria-hidden="true">
                    <g fill="currentcolor" stroke="#f5e55b" strokeWidth="1" strokeLinecap="round">
                        <circle cx="6" cy="6" r="2" />
                        <g strokeDasharray="1.5 1.5">
                            <polyline points="6 10,6 11.5" transform="rotate(0,6,6)" />
                            <polyline points="6 10,6 11.5" transform="rotate(45,6,6)" />
                            <polyline points="6 10,6 11.5" transform="rotate(90,6,6)" />
                            <polyline points="6 10,6 11.5" transform="rotate(135,6,6)" />
                            <polyline points="6 10,6 11.5" transform="rotate(180,6,6)" />
                            <polyline points="6 10,6 11.5" transform="rotate(225,6,6)" />
                            <polyline points="6 10,6 11.5" transform="rotate(270,6,6)" />
                            <polyline points="6 10,6 11.5" transform="rotate(315,6,6)" />
                        </g>
                    </g>
                </svg>
            )}
            {moon && (
                <svg className={`${className}`} viewBox="0 0 12 12" width="100%" height="100%" aria-hidden="true">
                    <g
                        fill="currentcolor"
                        stroke="#77aefc"
                        strokeWidth="1"
                        strokeLinejoin="round"
                        transform="rotate(-45,6,6)">
                        <path d="m9,10c-2.209,0-4-1.791-4-4s1.791-4,4-4c.304,0,.598.041.883.105-.995-.992-2.367-1.605-3.883-1.605C2.962.5.5,2.962.5,6s2.462,5.5,5.5,5.5c1.516,0,2.888-.613,3.883-1.605-.285.064-.578.105-.883.105Z" />
                    </g>
                </svg>
            )}
            {magnifyingGlass && (
                <svg
                    aria-hidden="true"
                    className={`${className}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            )}
            {
                schedule && (
                    <svg
                        onClick={clickHandler}
                        className={`${className}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                )
            }
            {alert && (
                <svg className={`${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="1.92 1.92 20.208 20.16" width="100%" height="100%">
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor" d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                </svg>
            )}
            {escape && (
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 32 32">
                    <path fill="currentColor" d="M7.223 2.893a3.072 3.072 0 0 0-4.33 0a3.084 3.084 0 0 0 0 4.34l8.747 8.744l-8.737 8.746a3.072 3.072 0 0 0 0 4.33a3.072 3.072 0 0 0 4.33 0l8.74-8.745l8.74 8.735a3.072 3.072 0 0 0 4.33 0a3.072 3.072 0 0 0 0-4.33l-8.738-8.738l8.747-8.752a3.072 3.072 0 0 0 0-4.33c-1.2-1.19-3.15-1.19-4.34 0l-8.74 8.749z"/>
                </svg>
            )}
        </>
    )
}
