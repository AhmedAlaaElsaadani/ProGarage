export const baseURL = "https://api.hosoun.com/";

export const websiteURL = window.origin + "/";

// allowed values: title, priceDesc, priceAsc, rateingDesc, ratingAsc, newestAsc, newestDesc | defailt title
export const OrderBasedOn = [
  {
    id: "ratingAsc",
    label: "OrderBasedON_NewestAsending",
  },
  {
    id: "newestDesc",
    label: "OrderBasedON_NewestDescending",
  },
  {
    id: "ratingAsc",
    label: "OderBasedON_ratingAsc",
  },
  {
    id: "rateingDesc",
    label: "OderBasedON_ratingDesc",
  },

  {
    id: "priceAsc",
    label: "OrderBasedON_lowheigh",
  },
  {
    id: "priceDesc",
    label: "OrderBasedON_heighlow",
  },
  {
    id: "title",
    label: "OrderBasedON_title",
  },
];

export const MyProfileTranscationData = [
  {
    id: 1,
    title: "cart_card_title",
    payDate: "9/11/2024",
    finishDate: "21/12/2024",
    PayType: "masterCard",
    totalPrice: 4000.0,
    statusPAy: "donePay",
    fatora: "fatora",
  },
  {
    id: 2,
    title: "cart_card_title",
    payDate: "9/11/2024",
    finishDate: "21/12/2024",
    PayType: "masterCard",
    totalPrice: 4500.0,
    statusPAy: "donePay",
    fatora: "fatora",
  },
];

export const countries = [
  {
    value: 1,
    key: "Afghanistan",
    Code: "AF",
  },
  {
    value: 2,
    key: "Albania",
    Code: "AL",
  },
  {
    value: 3,
    key: "Algeria",
    Code: "DZ",
  },
  {
    value: 4,
    key: "Andorra",
    Code: "AD",
  },
  {
    value: 5,
    key: "Angola",
    Code: "AO",
  },
  {
    value: 6,
    key: "Argentina",
    Code: "AR",
  },
  {
    value: 7,
    key: "Armenia",
    Code: "AM",
  },
  {
    value: 8,
    key: "Australia",
    Code: "AU",
  },
  {
    value: 9,
    key: "Austria",
    Code: "AT",
  },
  {
    value: 10,
    key: "Azerbaijan",
    Code: "AZ",
  },
  {
    value: 11,
    key: "Bahrain",
    Code: "BH",
  },
  {
    value: 12,
    key: "Bangladesh",
    Code: "BD",
  },
  {
    value: 13,
    key: "Belarus",
    Code: "BY",
  },
  {
    value: 14,
    key: "Belgium",
    Code: "BE",
  },
  {
    value: 15,
    key: "Belize",
    Code: "BZ",
  },
  {
    value: 16,
    key: "Benin",
    Code: "BJ",
  },
  {
    value: 17,
    key: "Bhutan",
    Code: "BT",
  },
  {
    value: 18,
    key: "Bolivia",
    Code: "BO",
  },
  {
    value: 19,
    key: "Bosnia and Herzegovina",
    Code: "BA",
  },
  {
    value: 20,
    key: "Botswana",
    Code: "BW",
  },
  {
    value: 21,
    key: "Brazil",
    Code: "BR",
  },
  {
    value: 22,
    key: "Bulgaria",
    Code: "BG",
  },
  {
    value: 23,
    key: "Burkina Faso",
    Code: "BF",
  },
  {
    value: 24,
    key: "Burundi",
    Code: "BI",
  },
  {
    value: 25,
    key: "Cambodia",
    Code: "KH",
  },
  {
    value: 26,
    key: "Cameroon",
    Code: "CM",
  },
  {
    value: 27,
    key: "Canada",
    Code: "CA",
  },
  {
    value: 28,
    key: "Chad",
    Code: "TD",
  },
  {
    value: 29,
    key: "Chile",
    Code: "CL",
  },
  {
    value: 30,
    key: "China",
    Code: "CN",
  },
  {
    value: 31,
    key: "Colombia",
    Code: "CO",
  },
  {
    value: 32,
    key: "Congo",
    Code: "CG",
  },
  {
    value: 33,
    key: "Costa Rica",
    Code: "CR",
  },
  {
    value: 34,
    key: "Croatia",
    Code: "HR",
  },
  {
    value: 35,
    key: "Cuba",
    Code: "CU",
  },
  {
    value: 36,
    key: "Cyprus",
    Code: "CY",
  },
  {
    value: 37,
    key: "Czech Republic",
    Code: "CZ",
  },
  {
    value: 38,
    key: "Denmark",
    Code: "DK",
  },
  {
    value: 39,
    key: "Djibouti",
    Code: "DJ",
  },
  {
    value: 40,
    key: "Dominica",
    Code: "DM",
  },
  {
    value: 41,
    key: "Dominican Republic",
    Code: "DO",
  },
  {
    value: 42,
    key: "Ecuador",
    Code: "EC",
  },
  {
    value: 43,
    key: "Egypt",
    Code: "EG",
  },
  {
    value: 44,
    key: "El Salvador",
    Code: "SV",
  },
  {
    value: 45,
    key: "Equatorial Guinea",
    Code: "GQ",
  },
  {
    value: 46,
    key: "Eritrea",
    Code: "ER",
  },
  {
    value: 47,
    key: "Estonia",
    Code: "EE",
  },
  {
    value: 48,
    key: "Ethiopia",
    Code: "ET",
  },
  {
    value: 49,
    key: "Fiji",
    Code: "FJ",
  },
  {
    value: 50,
    key: "Finland",
    Code: "FI",
  },
  {
    value: 51,
    key: "France",
    Code: "FR",
  },
  {
    value: 52,
    key: "Gabon",
    Code: "GA",
  },
  {
    value: 53,
    key: "Gambia",
    Code: "GM",
  },
  {
    value: 54,
    key: "Georgia",
    Code: "GE",
  },
  {
    value: 55,
    key: "Germany",
    Code: "DE",
  },
  {
    value: 56,
    key: "Ghana",
    Code: "GH",
  },
  {
    value: 57,
    key: "Greece",
    Code: "GR",
  },
  {
    value: 58,
    key: "Grenada",
    Code: "GD",
  },
  {
    value: 59,
    key: "Guatemala",
    Code: "GT",
  },
  {
    value: 60,
    key: "Guinea",
    Code: "GN",
  },
  {
    value: 61,
    key: "Guinea-Bissau",
    Code: "GW",
  },
  {
    value: 62,
    key: "Guyana",
    Code: "GY",
  },
  {
    value: 63,
    key: "Haiti",
    Code: "HT",
  },
  {
    value: 64,
    key: "Honduras",
    Code: "HN",
  },
  {
    value: 65,
    key: "Hungary",
    Code: "HU",
  },
  {
    value: 66,
    key: "Iceland",
    Code: "IS",
  },
  {
    value: 67,
    key: "India",
    Code: "IN",
  },
  {
    value: 68,
    key: "Indonesia",
    Code: "ID",
  },
  {
    value: 69,
    key: "Iran",
    Code: "IR",
  },
  {
    value: 70,
    key: "Iraq",
    Code: "IQ",
  },
  {
    value: 71,
    key: "Ireland",
    Code: "IE",
  },
  {
    value: 72,
    key: "Israel",
    Code: "IL",
  },
  {
    value: 73,
    key: "Italy",
    Code: "IT",
  },
  {
    value: 74,
    key: "Jamaica",
    Code: "JM",
  },
  {
    value: 75,
    key: "Japan",
    Code: "JP",
  },
  {
    value: 76,
    key: "Jordan",
    Code: "JO",
  },
  {
    value: 77,
    key: "Kazakhstan",
    Code: "KZ",
  },
  {
    value: 78,
    key: "Kenya",
    Code: "KE",
  },
  {
    value: 79,
    key: "Kiribati",
    Code: "KI",
  },
  {
    value: 80,
    key: "North Korea",
    Code: "KP",
  },
  {
    value: 81,
    key: "South Korea",
    Code: "KR",
  },
  {
    value: 82,
    key: "Kuwait",
    Code: "KW",
  },
  {
    value: 83,
    key: "Kyrgyzstan",
    Code: "KG",
  },
  {
    value: 84,
    key: "Laos",
    Code: "LA",
  },
  {
    value: 85,
    key: "Latvia",
    Code: "LV",
  },
  {
    value: 86,
    key: "Lebanon",
    Code: "LB",
  },
  {
    value: 87,
    key: "Lesotho",
    Code: "LS",
  },
  {
    value: 88,
    key: "Liberia",
    Code: "LR",
  },
  {
    value: 89,
    key: "Libya",
    Code: "LY",
  },
  {
    value: 90,
    key: "Liechtenstein",
    Code: "LI",
  },
  {
    value: 91,
    key: "Lithuania",
    Code: "LT",
  },
  {
    value: 92,
    key: "Luxembourg",
    Code: "LU",
  },
  {
    value: 93,
    key: "Madagascar",
    Code: "MG",
  },
  {
    value: 94,
    key: "Malawi",
    Code: "MW",
  },
  {
    value: 95,
    key: "Malaysia",
    Code: "MY",
  },
  {
    value: 96,
    key: "Maldives",
    Code: "MV",
  },
  {
    value: 97,
    key: "Mali",
    Code: "ML",
  },
  {
    value: 98,
    key: "Malta",
    Code: "MT",
  },
  {
    value: 99,
    key: "Marshall Islands",
    Code: "MH",
  },
  {
    value: 100,
    key: "Mauritania",
    Code: "MR",
  },
  {
    value: 101,
    key: "Mauritius",
    Code: "MU",
  },
  {
    value: 102,
    key: "Mexico",
    Code: "MX",
  },
  {
    value: 103,
    key: "Micronesia",
    Code: "FM",
  },
  {
    value: 104,
    key: "Moldova",
    Code: "MD",
  },
  {
    value: 105,
    key: "Monaco",
    Code: "MC",
  },
  {
    value: 106,
    key: "Mongolia",
    Code: "MN",
  },
  {
    value: 107,
    key: "Montenegro",
    Code: "ME",
  },
  {
    value: 108,
    key: "Morocco",
    Code: "MA",
  },
  {
    value: 109,
    key: "Mozambique",
    Code: "MZ",
  },
  {
    value: 110,
    key: "Myanmar",
    Code: "MM",
  },
  {
    value: 111,
    key: "Namibia",
    Code: "NA",
  },
  {
    value: 112,
    key: "Nauru",
    Code: "NR",
  },
  {
    value: 113,
    key: "Nepal",
    Code: "NP",
  },
  {
    value: 114,
    key: "Netherlands",
    Code: "NL",
  },
  {
    value: 115,
    key: "New Zealand",
    Code: "NZ",
  },
  {
    value: 116,
    key: "Nicaragua",
    Code: "NI",
  },
  {
    value: 117,
    key: "Niger",
    Code: "NE",
  },
  {
    value: 118,
    key: "Nigeria",
    Code: "NG",
  },
  {
    value: 119,
    key: "Norway",
    Code: "NO",
  },
  {
    value: 120,
    key: "Oman",
    Code: "OM",
  },
  {
    value: 121,
    key: "Pakistan",
    Code: "PK",
  },
  {
    value: 122,
    key: "Palau",
    Code: "PW",
  },
  {
    value: 123,
    key: "Palestine",
    Code: "PS",
  },
  {
    value: 124,
    key: "Panama",
    Code: "PA",
  },
  {
    value: 125,
    key: "Papua New Guinea",
    Code: "PG",
  },
  {
    value: 126,
    key: "Paraguay",
    Code: "PY",
  },
  {
    value: 127,
    key: "Peru",
    Code: "PE",
  },
  {
    value: 128,
    key: "Philippines",
    Code: "PH",
  },
  {
    value: 129,
    key: "Poland",
    Code: "PL",
  },
  {
    value: 130,
    key: "Portugal",
    Code: "PT",
  },
  {
    value: 131,
    key: "Qatar",
    Code: "QA",
  },
  {
    value: 132,
    key: "Romania",
    Code: "RO",
  },
  {
    value: 133,
    key: "Russia",
    Code: "RU",
  },
  {
    value: 134,
    key: "Rwanda",
    Code: "RW",
  },
  {
    value: 135,
    key: "Saint Kitts and Nevis",
    Code: "KN",
  },
  {
    value: 136,
    key: "Saint Lucia",
    Code: "LC",
  },
  {
    value: 137,
    key: "Saint Vincent and the Grenadines",
    Code: "VC",
  },
  {
    value: 138,
    key: "Samoa",
    Code: "WS",
  },
  {
    value: 139,
    key: "San Marino",
    Code: "SM",
  },
  {
    value: 140,
    key: "Sao Tome and Principe",
    Code: "ST",
  },
  {
    value: 141,
    key: "Saudi Arabia",
    Code: "SA",
  },
  {
    value: 142,
    key: "Senegal",
    Code: "SN",
  },
  {
    value: 143,
    key: "Serbia",
    Code: "RS",
  },
  {
    value: 144,
    key: "Seychelles",
    Code: "SC",
  },
  {
    value: 145,
    key: "Sierra Leone",
    Code: "SL",
  },
  {
    value: 146,
    key: "Singapore",
    Code: "SG",
  },
  {
    value: 147,
    key: "Slovakia",
    Code: "SK",
  },
  {
    value: 148,
    key: "Slovenia",
    Code: "SI",
  },
  {
    value: 149,
    key: "Solomon Islands",
    Code: "SB",
  },
  {
    value: 150,
    key: "Somalia",
    Code: "SO",
  },
  {
    value: 151,
    key: "South Africa",
    Code: "ZA",
  },
  {
    value: 152,
    key: "Spain",
    Code: "ES",
  },
  {
    value: 153,
    key: "Sri Lanka",
    Code: "LK",
  },
  {
    value: 154,
    key: "Sudan",
    Code: "SD",
  },
  {
    value: 155,
    key: "Suriname",
    Code: "SR",
  },
  {
    value: 156,
    key: "Eswatini (Swaziland)",
    Code: "SZ",
  },
  {
    value: 157,
    key: "Sweden",
    Code: "SE",
  },
  {
    value: 158,
    key: "Switzerland",
    Code: "CH",
  },
  {
    value: 159,
    key: "Syria",
    Code: "SY",
  },
  {
    value: 160,
    key: "Taiwan",
    Code: "TW",
  },
  {
    value: 161,
    key: "Tajikistan",
    Code: "TJ",
  },
  {
    value: 162,
    key: "Tanzania",
    Code: "TZ",
  },
  {
    value: 163,
    key: "Thailand",
    Code: "TH",
  },
  {
    value: 164,
    key: "East Timor",
    Code: "TL",
  },
  {
    value: 165,
    key: "Togo",
    Code: "TG",
  },
  {
    value: 166,
    key: "Tonga",
    Code: "TO",
  },
  {
    value: 167,
    key: "Trinidad and Tobago",
    Code: "TT",
  },
  {
    value: 168,
    key: "Tunisia",
    Code: "TN",
  },
  {
    value: 169,
    key: "Turkey",
    Code: "TR",
  },
  {
    value: 170,
    key: "Turkmenistan",
    Code: "TM",
  },
  {
    value: 171,
    key: "Tuvalu",
    Code: "TV",
  },
  {
    value: 172,
    key: "Uganda",
    Code: "UG",
  },
  {
    value: 173,
    key: "Ukraine",
    Code: "UA",
  },
  {
    value: 174,
    key: "United Arab Emirates",
    Code: "AE",
  },
  {
    value: 175,
    key: "United Kingdom",
    Code: "GB",
  },
  {
    value: 176,
    key: "United States",
    Code: "US",
  },
  {
    value: 177,
    key: "Uruguay",
    Code: "UY",
  },
  {
    value: 178,
    key: "Uzbekistan",
    Code: "UZ",
  },
  {
    value: 179,
    key: "Vanuatu",
    Code: "VU",
  },
  {
    value: 180,
    key: "Vatican City",
    Code: "VA",
  },
  {
    value: 181,
    key: "Venezuela",
    Code: "VE",
  },
  {
    value: 182,
    key: "Vietnam",
    Code: "VN",
  },
  {
    value: 183,
    key: "Yemen",
    Code: "YE",
  },
  {
    value: 184,
    key: "Zambia",
    Code: "ZM",
  },
  {
    value: 185,
    key: "Zimbabwe",
    Code: "ZW",
  },
];
export const arCountries = [
  {
    value: 66,
    key: "آيسلندا",
  },
  {
    value: 48,
    key: "إثيوبيا",
  },
  {
    value: 10,
    key: "أذربيجان",
  },
  {
    value: 7,
    key: "أرمينيا",
  },
  {
    value: 46,
    key: "إريتريا",
  },
  {
    value: 152,
    key: "إسبانيا",
  },
  {
    value: 8,
    key: "أستراليا",
  },
  {
    value: 47,
    key: "إستونيا",
  },
  {
    value: 72,
    key: "إسرائيل",
  },
  {
    value: 156,
    key: "إسواتيني (سوازيلاند)",
  },
  {
    value: 1,
    key: "أفغانستان",
  },
  {
    value: 6,
    key: "الأرجنتين",
  },
  {
    value: 76,
    key: "الأردن",
  },
  {
    value: 42,
    key: "الإكوادور",
  },
  {
    value: 174,
    key: "الإمارات العربية المتحدة",
  },
  {
    value: 2,
    key: "ألبانيا",
  },
  {
    value: 11,
    key: "البحرين",
  },
  {
    value: 21,
    key: "البرازيل",
  },
  {
    value: 130,
    key: "البرتغال",
  },
  {
    value: 19,
    key: "البوسنة والهرسك",
  },
  {
    value: 107,
    key: "الجبل الأسود",
  },
  {
    value: 3,
    key: "الجزائر",
  },
  {
    value: 38,
    key: "الدنمارك",
  },
  {
    value: 141,
    key: "السعودية",
  },
  {
    value: 44,
    key: "السلفادور",
  },
  {
    value: 142,
    key: "السنغال",
  },
  {
    value: 154,
    key: "السودان",
  },
  {
    value: 157,
    key: "السويد",
  },
  {
    value: 150,
    key: "الصومال",
  },
  {
    value: 30,
    key: "الصين",
  },
  {
    value: 70,
    key: "العراق",
  },
  {
    value: 52,
    key: "الغابون",
  },
  {
    value: 180,
    key: "الفاتيكان",
  },
  {
    value: 128,
    key: "الفلبين",
  },
  {
    value: 26,
    key: "الكاميرون",
  },
  {
    value: 32,
    key: "الكونغو",
  },
  {
    value: 82,
    key: "الكويت",
  },
  {
    value: 55,
    key: "ألمانيا",
  },
  {
    value: 65,
    key: "المجر",
  },
  {
    value: 108,
    key: "المغرب",
  },
  {
    value: 102,
    key: "المكسيك",
  },
  {
    value: 175,
    key: "المملكة المتحدة",
  },
  {
    value: 119,
    key: "النرويج",
  },
  {
    value: 9,
    key: "النمسا",
  },
  {
    value: 117,
    key: "النيجر",
  },
  {
    value: 67,
    key: "الهند",
  },
  {
    value: 176,
    key: "الولايات المتحدة",
  },
  {
    value: 75,
    key: "اليابان",
  },
  {
    value: 183,
    key: "اليمن",
  },
  {
    value: 57,
    key: "اليونان",
  },
  {
    value: 4,
    key: "أندورا",
  },
  {
    value: 68,
    key: "إندونيسيا",
  },
  {
    value: 5,
    key: "أنغولا",
  },
  {
    value: 177,
    key: "أوروغواي",
  },
  {
    value: 178,
    key: "أوزبكستان",
  },
  {
    value: 172,
    key: "أوغندا",
  },
  {
    value: 173,
    key: "أوكرانيا",
  },
  {
    value: 69,
    key: "إيران",
  },
  {
    value: 71,
    key: "أيرلندا",
  },
  {
    value: 73,
    key: "إيطاليا",
  },
  {
    value: 125,
    key: "بابوا غينيا الجديدة",
  },
  {
    value: 126,
    key: "باراغواي",
  },
  {
    value: 121,
    key: "باكستان",
  },
  {
    value: 122,
    key: "بالاو",
  },
  {
    value: 14,
    key: "بلجيكا",
  },
  {
    value: 22,
    key: "بلغاريا",
  },
  {
    value: 15,
    key: "بليز",
  },
  {
    value: 12,
    key: "بنغلاديش",
  },
  {
    value: 124,
    key: "بنما",
  },
  {
    value: 16,
    key: "بنين",
  },
  {
    value: 17,
    key: "بوتان",
  },
  {
    value: 20,
    key: "بوتسوانا",
  },
  {
    value: 23,
    key: "بوركينا فاسو",
  },
  {
    value: 24,
    key: "بوروندي",
  },
  {
    value: 129,
    key: "بولندا",
  },
  {
    value: 18,
    key: "بوليفيا",
  },
  {
    value: 127,
    key: "بيرو",
  },
  {
    value: 13,
    key: "بيلاروسيا",
  },
  {
    value: 163,
    key: "تايلاند",
  },
  {
    value: 160,
    key: "تايوان",
  },
  {
    value: 170,
    key: "تركمانستان",
  },
  {
    value: 169,
    key: "تركيا",
  },
  {
    value: 167,
    key: "ترينيداد وتوباغو",
  },
  {
    value: 28,
    key: "تشاد",
  },
  {
    value: 29,
    key: "تشيلي",
  },
  {
    value: 162,
    key: "تنزانيا",
  },
  {
    value: 165,
    key: "توغو",
  },
  {
    value: 171,
    key: "توفالو",
  },
  {
    value: 168,
    key: "تونس",
  },
  {
    value: 166,
    key: "تونغا",
  },
  {
    value: 164,
    key: "تيمور الشرقية",
  },
  {
    value: 74,
    key: "جامايكا",
  },
  {
    value: 96,
    key: "جزر المالديف",
  },
  {
    value: 149,
    key: "جزر سليمان",
  },
  {
    value: 99,
    key: "جزر مارشال",
  },
  {
    value: 37,
    key: "جمهورية التشيك",
  },
  {
    value: 41,
    key: "جمهورية الدومينيكان",
  },
  {
    value: 151,
    key: "جنوب أفريقيا",
  },
  {
    value: 54,
    key: "جورجيا",
  },
  {
    value: 39,
    key: "جيبوتي",
  },
  {
    value: 40,
    key: "دومينيكا",
  },
  {
    value: 134,
    key: "رواندا",
  },
  {
    value: 133,
    key: "روسيا",
  },
  {
    value: 132,
    key: "رومانيا",
  },
  {
    value: 184,
    key: "زامبيا",
  },
  {
    value: 185,
    key: "زيمبابوي",
  },
  {
    value: 138,
    key: "ساموا",
  },
  {
    value: 139,
    key: "سان مارينو",
  },
  {
    value: 137,
    key: "سانت فنسنت والغرينادين",
  },
  {
    value: 135,
    key: "سانت كيتس ونيفيس",
  },
  {
    value: 136,
    key: "سانت لوسيا",
  },
  {
    value: 140,
    key: "ساو تومي وبرينسيب",
  },
  {
    value: 153,
    key: "سريلانكا",
  },
  {
    value: 147,
    key: "سلوفاكيا",
  },
  {
    value: 148,
    key: "سلوفينيا",
  },
  {
    value: 146,
    key: "سنغافورة",
  },
  {
    value: 159,
    key: "سوريا",
  },
  {
    value: 155,
    key: "سورينام",
  },
  {
    value: 158,
    key: "سويسرا",
  },
  {
    value: 145,
    key: "سيراليون",
  },
  {
    value: 144,
    key: "سيشل",
  },
  {
    value: 143,
    key: "صربيا",
  },
  {
    value: 161,
    key: "طاجيكستان",
  },
  {
    value: 120,
    key: "عمان",
  },
  {
    value: 53,
    key: "غامبيا",
  },
  {
    value: 56,
    key: "غانا",
  },
  {
    value: 58,
    key: "غرينادا",
  },
  {
    value: 59,
    key: "غواتيمالا",
  },
  {
    value: 62,
    key: "غيانا",
  },
  {
    value: 60,
    key: "غينيا",
  },
  {
    value: 45,
    key: "غينيا الاستوائية",
  },
  {
    value: 61,
    key: "غينيا بيساو",
  },
  {
    value: 179,
    key: "فانواتو",
  },
  {
    value: 51,
    key: "فرنسا",
  },
  {
    value: 123,
    key: "فلسطين",
  },
  {
    value: 181,
    key: "فنزويلا",
  },
  {
    value: 50,
    key: "فنلندا",
  },
  {
    value: 182,
    key: "فيتنام",
  },
  {
    value: 49,
    key: "فيجي",
  },
  {
    value: 36,
    key: "قبرص",
  },
  {
    value: 83,
    key: "قرغيزستان",
  },
  {
    value: 131,
    key: "قطر",
  },
  {
    value: 77,
    key: "كازاخستان",
  },
  {
    value: 34,
    key: "كرواتيا",
  },
  {
    value: 25,
    key: "كمبوديا",
  },
  {
    value: 27,
    key: "كندا",
  },
  {
    value: 35,
    key: "كوبا",
  },
  {
    value: 81,
    key: "كوريا الجنوبية",
  },
  {
    value: 80,
    key: "كوريا الشمالية",
  },
  {
    value: 33,
    key: "كوستاريكا",
  },
  {
    value: 31,
    key: "كولومبيا",
  },
  {
    value: 79,
    key: "كيريباتي",
  },
  {
    value: 78,
    key: "كينيا",
  },
  {
    value: 85,
    key: "لاتفيا",
  },
  {
    value: 84,
    key: "لاوس",
  },
  {
    value: 86,
    key: "لبنان",
  },
  {
    value: 92,
    key: "لوكسمبورغ",
  },
  {
    value: 89,
    key: "ليبيا",
  },
  {
    value: 88,
    key: "ليبيريا",
  },
  {
    value: 91,
    key: "ليتوانيا",
  },
  {
    value: 90,
    key: "ليختنشتاين",
  },
  {
    value: 87,
    key: "ليسوتو",
  },
  {
    value: 94,
    key: "مالاوي",
  },
  {
    value: 98,
    key: "مالطا",
  },
  {
    value: 97,
    key: "مالي",
  },
  {
    value: 95,
    key: "ماليزيا",
  },
  {
    value: 93,
    key: "مدغشقر",
  },
  {
    value: 43,
    key: "مصر",
  },
  {
    value: 106,
    key: "منغوليا",
  },
  {
    value: 100,
    key: "موريتانيا",
  },
  {
    value: 101,
    key: "موريشيوس",
  },
  {
    value: 109,
    key: "موزمبيق",
  },
  {
    value: 104,
    key: "مولدوفا",
  },
  {
    value: 105,
    key: "موناكو",
  },
  {
    value: 110,
    key: "ميانمار",
  },
  {
    value: 103,
    key: "ميكرونيزيا",
  },
  {
    value: 111,
    key: "ناميبيا",
  },
  {
    value: 112,
    key: "ناورو",
  },
  {
    value: 113,
    key: "نيبال",
  },
  {
    value: 118,
    key: "نيجيريا",
  },
  {
    value: 116,
    key: "نيكاراغوا",
  },
  {
    value: 115,
    key: "نيوزيلندا",
  },
  {
    value: 63,
    key: "هايتي",
  },
  {
    value: 64,
    key: "هندوراس",
  },
  {
    value: 114,
    key: "هولندا",
  },
];



export const studentAcademicLevel = [
  {
    key: "Student level 1",
    value: 1,
  },
  {
    key: "Student level 2",
    value: 2,
  },
  {
    key: "Student level 3",
    value: 3,
  },
  {
    key: "Student level 4",
    value: 4,
  },
  {
    key: "Student level 5",
    value: 5,
  },
  {
    key: "Student level 6",
    value: 6,
  },
  {
    key: "Student level 7",
    value: 7,
  },
  {
    key: "Student level 8",
    value: 8,
  },
  {
    key: "Student level 9",
    value: 9,
  },
  {
    key: "Student level 10",
    value: 10,
  },
  {
    key: "Student level 11",
    value: 11,
  },
  {
    key: "Student level 12",
    value: 12,
  },
  {
    key: "Student level 13",
    value: 13,
  },
  {
    key: "Student level 14",
    value: 14,
  },
  {
    key: "Student level 15",
    value: 15,
  },
];