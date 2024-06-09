export enum WeatherType {
    Sunny = 'Sunny',
    Windy = 'Windy',
    Rainy = 'Rainy',
    Stormy = 'Stormy',
    Foggy = 'Foggy',
    Snowy = 'Snowy',
    Clear = 'Clear'
}

export enum PrecipitationType { Rain = 'Rain', Snow = 'Snow', Sleet = 'Sleet' }

export interface SunnyWeatherPayload {
    description: string;
    temperature: number;
    uvIndex: number;
}

export interface WindyWeatherPayload {
    description: string;
    windSpeed: number;
    gustSpeed: number;
}

export interface RainyWeatherPayload {
    description: string;
    precipitationType: PrecipitationType.Rain;
    rainIntensity: number;
}

export interface StormyWeatherPayload {
    description: string;
    precipitationType: PrecipitationType.Rain | PrecipitationType.Snow | PrecipitationType.Sleet;
    windSpeed: number;
    thunder: boolean;
}

export interface FoggyWeatherPayload {
    description: string;
    visibility: number;
    humidity: number;
}

export interface SnowyWeatherPayload {
    description: string;
    precipitationType: PrecipitationType.Snow;
    snowfallRate: number;
    temperature: number;
}

export interface ClearWeatherPayload {
    description: string;
    temperature: number;
    humidity: number;
}

export type WeatherPayloadType =
    SunnyWeatherPayload
    | WindyWeatherPayload
    | RainyWeatherPayload
    | StormyWeatherPayload
    | FoggyWeatherPayload
    | SnowyWeatherPayload
    | ClearWeatherPayload;

export interface Weather {
    type?: WeatherType;
    payload?: WeatherPayloadType;
}

export const WeatherIcons = {
    [WeatherType.Sunny]: '☀️',
    [WeatherType.Windy]: '🌬️',
    [WeatherType.Rainy]: '🌧️',
    [WeatherType.Stormy]: '🌩️',
    [WeatherType.Snowy]: '❄️',
    [WeatherType.Foggy]: '🌁',
    [WeatherType.Clear]: '🌞',
}