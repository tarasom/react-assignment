// WeatherCard.tsx
import React from 'react';
import {Card, CardContent, Typography, TextField, Grid} from '@mui/material';
import {
    ClearWeatherPayload,
    FoggyWeatherPayload,
    RainyWeatherPayload, SnowyWeatherPayload, StormyWeatherPayload,
    SunnyWeatherPayload,
    Weather,
    WeatherPayloadType,
    WeatherType,
    WindyWeatherPayload
} from '../types';

const WeatherCard: React.FC<{
    weather: Weather;
    onClick: () => void;
    onChange: (updatedWeather: Weather) => void;
    isSelected: boolean;
}> = ({weather, onClick, onChange, isSelected}) => {
    const renderPayloadFields = () => {
        if (!(weather.payload as any)) return null;

        const payload = weather.payload as WeatherPayloadType;

        switch (weather.type) {
            case WeatherType.Sunny:
                return (
                    <>
                        <TextField
                            label="Description"
                            defaultValue={(payload as any).description}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...payload,
                                        description: event.target.value,
                                    },
                                });
                            }}
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                        <TextField
                            label="Temperature (°C)"
                            defaultValue={(payload as SunnyWeatherPayload).temperature}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...(payload as SunnyWeatherPayload),
                                        temperature: parseInt(event.target.value),
                                    },
                                });
                            }}
                            type="number"
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                        <TextField
                            label="UV Index"
                            defaultValue={(payload as any).uvIndex}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...(payload as SunnyWeatherPayload),
                                        uvIndex: parseInt(event.target.value),
                                    },
                                });
                            }}
                            type="number"
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                    </>
                );
            case WeatherType.Windy:
                return (
                    <>
                        <TextField
                            label="Description"
                            defaultValue={(payload as any).description}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...payload,
                                        description: event.target.value,
                                    },
                                });
                            }}
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                        <TextField
                            label="Wind Speed (m/s)"
                            defaultValue={(payload as any).windSpeed}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...payload,
                                        windSpeed: parseInt(event.target.value),
                                    },
                                });
                            }}
                            type="number"
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                        <TextField
                            label="Gust Speed (m/s)"
                            defaultValue={(payload as any).gustSpeed}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...(payload as WindyWeatherPayload),
                                        gustSpeed: parseInt(event.target.value),
                                    },
                                });
                            }}
                            type="number"
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                    </>
                );
            case WeatherType.Rainy:
                return (
                    <>
                        <TextField
                            label="Description"
                            defaultValue={(payload as any).description}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...payload,
                                        description: event.target.value,
                                    },
                                });
                            }}
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                        <TextField
                            label="Rain Intensity (mm/h)"
                            defaultValue={(payload as any).rainIntensity}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...(payload as RainyWeatherPayload),
                                        rainIntensity: parseInt(event.target.value),
                                    },
                                });
                            }}
                            type="number"
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                    </>
                );
            case WeatherType.Stormy:
                return (
                    <>
                        <TextField
                            label="Description"
                            defaultValue={(payload as any).description}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...payload,
                                        description: event.target.value,
                                    },
                                });
                            }}
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                        <TextField
                            label="Wind Speed (m/s)"
                            defaultValue={(payload as any).windSpeed}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...(payload as StormyWeatherPayload),
                                        windSpeed: parseInt(event.target.value),
                                    },
                                });
                            }}
                            type="number"
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                        <TextField
                            label="Thunder"
                            defaultValue={(payload as any).thunder ? 'Yes' : 'No'}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...(payload as StormyWeatherPayload),
                                        thunder: Boolean(event.target.value),
                                    },
                                });
                            }}
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                    </>
                );
            case WeatherType.Foggy:
                return (
                    <>
                        <TextField
                            label="Description"
                            defaultValue={(payload as any).description}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...payload,
                                        description: event.target.value,
                                    },
                                });
                            }}
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                        <TextField
                            label="Visibility (m)"
                            defaultValue={(payload as any).visibility}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...(payload as FoggyWeatherPayload),
                                        visibility: parseInt(event.target.value),
                                    },
                                });
                            }}
                            type="number"
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                        <TextField
                            label="Humidity (%)"
                            defaultValue={(payload as any).humidity}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...(payload as FoggyWeatherPayload),
                                        humidity: parseInt(event.target.value),
                                    },
                                });
                            }}
                            type="number"
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                    </>
                );
            case WeatherType.Snowy:
                return (
                    <>
                        <TextField
                            label="Description"
                            defaultValue={(payload as any).description}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...payload,
                                        description: event.target.value,
                                    },
                                });
                            }}
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                        <TextField
                            label="Snowfall Rate (cm/h)"
                            defaultValue={(payload as any).snowfallRate}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...(payload as SnowyWeatherPayload),
                                        snowfallRate: parseInt(event.target.value),
                                    },
                                });
                            }}
                            type="number"
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                        <TextField
                            label="Temperature (°C)"
                            defaultValue={(payload as any).temperature}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...(payload as SnowyWeatherPayload),
                                        temperature: parseInt(event.target.value),
                                    },
                                });
                            }}
                            type="number"
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                    </>
                );
            case WeatherType.Clear:
                return (
                    <>
                        <TextField
                            label="Description"
                            defaultValue={(payload as any).description}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...payload,
                                        description: event.target.value,
                                    },
                                });
                            }}
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                        <TextField
                            label="Temperature (°C)"
                            defaultValue={(payload as any).temperature}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...(payload as ClearWeatherPayload),
                                        temperature: parseInt(event.target.value),
                                    },
                                });
                            }}
                            type="number"
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                        <TextField
                            label="Humidity (%)"
                            defaultValue={(payload as any).humidity}
                            onChange={(event) => {
                                onChange({
                                    ...weather,
                                    payload: {
                                        ...(payload as ClearWeatherPayload),
                                        humidity: parseInt(event.target.value),
                                    },
                                });
                            }}
                            type="number"
                            fullWidth
                            style={{marginBottom: '8px', display: 'block'}}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Card
            onClick={onClick}
            style={{
                height: '100%',
                display: 'inline-block',
                margin: '8px',
                cursor: 'pointer',
                backgroundColor: isSelected ? '#b3e5fc' : '#f5f5f5',
                border: isSelected ? '2px solid #0288d1' : 'none',
            }}
        >
            <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5">{weather.type}</Typography>
                <div>
                    {renderPayloadFields()}
                </div>
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
