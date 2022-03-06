// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

/* eslint-disable */
let autoGeneratePx = {}
for (let i = 1; i <= 1000; i++) {
    autoGeneratePx[`[${i}px]`] = `${i}px`;
}
let autoGeneratePxNoBacket = {}
for (let i = 1; i <= 1000; i++) {
    autoGeneratePxNoBacket[`${i}px`] = `${i}px`;
}
let autoGenerateIndex = {}
for (let i = 1; i <= 1000; i++) {
    autoGenerateIndex[`${i}`] = `${i}`;
}
module.exports = {
    mode: 'jit',
    purge: {
        content: [
            './src/**/*.{ts,tsx}'
        ],
        safelist: [
            'aspect-ratio-1',
            "cbs-schedule-yestoday",
            "cbs-schedule-today",
            "cbs-schedule-oneweek",
            "cbs-schedule-twoweek",
            "cbs-schedule-threeweek",
            "cbs-schedule-expired",
            "cbs-schedule-nextweek",
            "cbs-schedule-after-7days",
            "rounded-cbs-sm",
            "rounded-cbs",
            "rounded-cbs-md",
            "rounded-cbs-lg"
        ]
    },
    darkMode: "class", // or 'media' or false
    theme: {
        fontFamily: {
            display: ["SanFranciscoDisplay, serif"],
        },
        extend: {
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'scale(0)' },
                    '50%': { transform: 'scale(1.25)' },
                },
                "cbs-skeleton": {
                    "100%": {
                        transform: "translateX(100%)",
                    }
                }
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
                "cbs-skeleton": "1.6s linear 0.5s infinite normal none running cbs-skeleton",
            },
            colors: {
                transparent: "transparent",
                primary: "#0060E1",
                secondary: "#2a90fb",
                accent: "#C2DBFF",
                negative: "#f43f5e",
                warning: "#f59f0b",
                positive: "#10b981",
                dark: "#000000",
                "primary-gray": "#666666",
                "primary-border": "#cccccc",
                "secondary-gray": "#798295",
                "accent-gray": "#1e293b",
                "lighter-gray": "#f1f5f9",
                "primary-light": "#ffffff",
                "secondary-light": "#F5F6F9",
                "accent-light": "#E9EAEF",
                "green-success": "#00C614",

                "cbs-primary": "#0060E1",
                "cbs-highlight-color": "#111E6C",
                "cbs-secondary": "#4781CF",
                "cbs-gray": "#F0F0F0",
                "cbs-active-comment": "#E7F3FF",
                "cbs-green": "#00C614",
                "cbs-subtext": "#666666",
                "cbs-summary": "#FFF2CC",
                "cbs-schedule-yestoday": "#03C9D7",
                "cbs-schedule-today": "#00C292",
                "cbs-schedule-oneweek": "#FEC90F",
                "cbs-schedule-twoweek": "#FB9678",
                "cbs-schedule-threeweek": "#E46A76",
                "cbs-schedule-expired": "#F55F5F",
                "cbs-schedule-nextweek": "#FF9900",
                "cbs-schedule-after-7days": "#00CA99",
                "cbs-left-menu": "#F5F6F9",
                "cbs-table-header": "#F7F8F9",
                "cbs-completed": "#36AB80",
                "cbs-failed": "#CA5E59",
                "cbs-border": "#CCCCCC",
                "cbs-up": "#EDF7ED",
                "cbs-up-text": "#4CAF50",
                "cbs-down": "#FEECEB",
                "cbs-down-text": "#F44336",
                "cbs-nav-text": "#00B9F2",
                "cbs-light-blue": "#E7F3FF",
                "cbs-pink": "#FDF3F5",
                "cbs-green-bg": "#EBFAF2",
                "cbs-indeterminate": "#F7AF22",
                "cbs-form-input-bg": "#F4F4F5",

                "cbs-purple": "#9B59B6",
                "cbs-red": "#FF4242",
                "cbs-green-dark": "#008000",
            },
            fontSize: {
                "[13px]": "13px",
                "[14px]": "14px",
                "[15px]": "15px",
                "x-small": ["12px", "14px"],
                "small": ["13px", "15px"],
                "medium": ["14px", "16px"],
                "large": ["16px", "18.4px"],
                "s-large": ["17px", "19.92px"],
                "x-large": ["18px", "21px"],
                "2x-large": ["20px", "23px"],
                "3x-large": ["24px", "27.6px"],
                "4x-large": ["30px", "34.5px"]
            },
            inset: {
                "[55%]": "55%",
                ...autoGeneratePxNoBacket
            },
            width: {
                ...autoGeneratePx,
                fill: "-webkit-fill-available",
                fit: 'fit-content',
            },
            height: {
                ...autoGeneratePx,
                max: "max-content",
                fit: 'fit-content',
            },
            minWidth: {
                ...autoGeneratePx,
            },
            maxWidth: {
                ...autoGeneratePx,
                "[75%]": "75%",
            },
            minHeight: {
                ...autoGeneratePx,
            },
            maxHeight: {
                ...autoGeneratePx,
            },
            backgroundImage: {
                authentication: "url('../assets/images/background-authentication.png')",
                "authentication-img": "url('../assets/images/authentication-img.png')",
            },
            borderWidth: {
                '0.5': '0.5px',
                6: "6px",
            },
            borderRadius: {
                "cbs-sm": "3px",
                "cbs": "5px",
                "cbs-md": "10px",
                "cbs-lg": "15px"
            },
            boxShadow: {
                "cbs-md": "0px 4px 4px rgba(0, 0, 0, 0.25)"
            },
            lineHeight: {
                ...autoGeneratePx,
                "[15px]": "14.95px",
            },
            transformOrigin: {
                'top-left-1/2-0': "50% 0"
            },
            zIndex: {
                ...autoGenerateIndex
            },
            padding: {
                ...autoGeneratePx
            },
            margin: {
                ...autoGeneratePx
            },
            gridTemplateColumns: {
                'odd-2': 'repeat(1, auto min-content)',
                'odd-4': 'repeat(2, auto min-content)',
                'odd-6': 'repeat(3, auto min-content)',
                'odd-8': 'repeat(4, auto min-content)',
                'auto-2': 'repeat(2, auto)',
                'auto-3': 'repeat(3, auto)',
                'auto-4': 'repeat(4, auto)',
            }
        },
    },
    variants: {
        extend: {
            textAlign: ['odd', 'even'],
            borderColor: ['checked'],
            backgroundColor: ['checked'],
            outline: ['focus-visible'],
            opacity: ['disabled', 'group-hover'],
            textColor: ['group-focus'],
            height: ['last'],
            width: ['last'],
        },
    },
    plugins: [
        plugin(function ({ addUtilities, theme, variants, e }) {
            const values = theme('lineClamp')

            addUtilities(
                [
                    Object.entries(values).map(([key, value]) => {
                        return {
                            [`.${e(`line-clamp-${key}`)}`]: {
                                overflow: 'hidden',
                                display: '-webkit-box',
                                '-webkit-box-orient': 'vertical',
                                '-webkit-line-clamp': `${value}`,
                            },
                        }
                    }),
                    {
                        '.line-clamp-none': {
                            '-webkit-line-clamp': 'unset',
                        },
                    },
                ],
                variants('lineClamp')
            )
            addUtilities([
                { '.border-spacing-0': { 'border-spacing': '0' } },
            ])
        },
            {
                theme: {
                    lineClamp: {
                        1: '1',
                        2: '2',
                        3: '3',
                        4: '4',
                        5: '5',
                        6: '6',
                    },
                },
                variants: {
                    lineClamp: ['responsive'],
                },
            })
    ],
};
