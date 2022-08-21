export const AREA_URL = {
    TokyoHTAndLT: "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo",
    TokyoHT: "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=temperature_2m_max&timezone=Asia%2FTokyo",
    TokyoLT: "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=temperature_2m_min&timezone=Asia%2FTokyo",
    New_YorkHTAndLT: "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FNew_York",
    New_YorkHT: "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&daily=temperature_2m_max&timezone=America%2FNew_York",
    New_YorkLT: "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&daily=temperature_2m_min&timezone=America%2FNew_York",
    TokyoHWVAndHG: "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=windspeed_10m_max,windgusts_10m_max&timezone=Asia%2FTokyo",
    TokyoHWV: "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=windspeed_10m_max&timezone=Asia%2FTokyo",
    TokyoHG: "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=windgusts_10m_max&timezone=Asia%2FTokyo",
    TokyoP: "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=precipitation_sum&timezone=Asia%2FTokyo",
    New_YorkP: "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&daily=precipitation_sum&timezone=America%2FNew_York",
    TokyoHST: "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=temperature_2m_max,apparent_temperature_max&current_weather=true&timezone=Asia%2FTokyo&start_date=2022-07-01&end_date=2022-07-31",
    TokyoLST: "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=temperature_2m_min,apparent_temperature_min&current_weather=true&timezone=Asia%2FTokyo&start_date=2022-07-01&end_date=2022-07-31",
}


export const JP_COORDINATES = [
    {
        name: "北海道",
        latitude: 43.06417,
        longitude: 141.34694,
    },
    {
        name: "東京都",
        latitude: 35.68944,
        longitude: 139.69167
    },
    {
        name: "新潟県",
        latitude: 37.90222,
        longitude: 139.02361
    },
    {
        name: "長野県",
        latitude: 36.65139,
        longitude: 138.18111
    },
    {
        name: "大阪府",
        latitude: 34.68639,
        longitude: 135.52
    },
    {
        name: "広島県",
        latitude: 34.66167,
        longitude: 133.935
    },
    {
        name: "福岡県",
        latitude: 33.60639,
        longitude: 130.41806
    },
    {
        name: "沖縄県",
        latitude: 26.2125,
        longitude: 127.68111,
    },
]