import React, {useState} from 'react';
import WeatherForm from "./components/WeatherForm";
import {Weather, WeatherIcons, WeatherType} from "./types";
import {WeatherListener, WeatherManager} from "./libs/WeatherListener";
import {Card, CardContent, Typography, Box, Grid} from '@mui/material';

const listener = new WeatherListener();

// @ts-ignore
window.listener = listener;

const weatherManager = new WeatherManager();

const App: React.FC = () => {
    const [selectedWeather, setSelectedWeather] = useState<Weather | undefined>(weatherManager.weather);
    const [icon, setIcon] = useState<string | null>(null);
    const [sunglasses, setSunglasses] = useState<boolean>(false);
    const [cap, setCap] = useState<boolean>(false);
    const [coat, setCoat] = useState<boolean>(false);
    const [umbrella, setUmbrella] = useState<boolean>(false);
    const [scarf, setScarf] = useState<boolean>(false);
    const [shorts, setShorts] = useState<boolean>(false);
    const [pants, setPants] = useState<boolean>(false);

    return (
        <div style={{
            position: 'relative',
            height: '100vh',
            overflow: 'hidden',
        }}>
            <header style={{background: 'lightblue', padding: '10px', textAlign: 'center'}}>
                <h1>Weather Outfit</h1>
            </header>
            {selectedWeather && (
                <Grid container style={{marginTop: '28px'}}>
                    <Card style={{margin: "auto", width: '45%'}}>
                        <div>
                            <div style={{float: 'left', width: '45 %',}}>
                                <h2>Currently:</h2>
                            </div>
                            <div style={{float: 'right', width: '45%'}}>
                                <div style={{
                                    right: '10px',
                                    width: '128px',
                                    height: '128px',
                                    borderRadius: '50%',
                                    backgroundColor: 'blue',
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 999
                                }}>
                                    {icon && <span style={{fontSize: '72px'}}>{icon}</span>}
                                </div>
                            </div>
                        </div>
                        <CardContent>
                            <div>
                                <h2>{selectedWeather.type}</h2>

                                <div>
                                    <p>description: {selectedWeather.payload?.description}</p>
                                    {selectedWeather.type === WeatherType.Sunny && (
                                        <>
                                            <p>temperature: {(selectedWeather.payload as any).temperature}</p>
                                            <p>uvIndex: {(selectedWeather.payload as any).uvIndex}</p>
                                        </>
                                    )}
                                    {selectedWeather.type === WeatherType.Windy && (
                                        <>
                                            <p>windSpeed: {(selectedWeather.payload as any).windSpeed}</p>
                                            <p>gustSpeed: {(selectedWeather.payload as any).gustSpeed}</p>
                                        </>
                                    )}
                                    {selectedWeather.type === WeatherType.Rainy && (
                                        <p>rainIntensity: {(selectedWeather.payload as any).rainIntensity}</p>
                                    )}
                                    {selectedWeather.type === WeatherType.Stormy && (
                                        <>
                                            <p>windSpeed: {(selectedWeather.payload as any).windSpeed}</p>
                                            <p>thunder: {(selectedWeather.payload as any).thunder}</p>
                                        </>
                                    )}
                                    {selectedWeather.type === WeatherType.Foggy && (
                                        <>
                                            <p>visibility: {(selectedWeather.payload as any).visibility}</p>
                                            <p>humidity: {(selectedWeather.payload as any).humidity}</p>
                                        </>
                                    )}
                                    {selectedWeather.type === WeatherType.Snowy && (
                                        <>
                                            <p>snowfallRate: {(selectedWeather.payload as any).snowfallRate}</p>
                                            <p>temperature: {(selectedWeather.payload as any).temperature}</p>
                                        </>
                                    )}
                                    {selectedWeather.type === WeatherType.Clear && (
                                        <p>humidity: {(selectedWeather.payload as any).humidity}</p>
                                    )}
                                </div>


                            </div>
                        </CardContent>
                    </Card>
                    <Card style={{margin: "auto", width: '45%'}}>
                        <CardContent style={{textAlign: 'center'}}>
                            <h2>Recommended clothes:</h2>
                            {cap && <span style={{fontSize: '72px'}}>🧢</span>}
                            {coat && <span style={{fontSize: '72px'}}>🧥</span>}
                            {umbrella && <span style={{fontSize: '72px'}}>☂️</span>}
                            {scarf && <span style={{fontSize: '72px'}}>🧣</span>}
                            {shorts && <span style={{fontSize: '72px'}}>🩳</span>}
                            {pants && <span style={{fontSize: '72px'}}>👖</span>}
                            {sunglasses && <span style={{fontSize: '72px'}}>🕶️</span>}
                        </CardContent>
                    </Card>
                </Grid>
            )}
            {new URLSearchParams(window.location.search).has('admin') &&
                (
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        backgroundColor: '#f1f1f1',
                        padding: '10px'
                    }}>
                        <WeatherForm onWeatherChanged={(weather) => {
                            listener.updateWeather(weather);
                            setSelectedWeather(weather);
                            setCoat(listener.controller.wardrobeManager.coat);
                            setCap(listener.controller.wardrobeManager.cap);
                            setScarf(listener.controller.wardrobeManager.scarf);
                            setShorts(listener.controller.wardrobeManager.shorts);
                            setPants(listener.controller.wardrobeManager.pants);
                            setSunglasses(listener.controller.wardrobeManager.sunglasses);
                            setUmbrella(listener.controller.wardrobeManager.umbrella);
                            if (weather && weather.type && weather.type in WeatherIcons) {
                                setIcon(WeatherIcons[weather.type]);
                            }
                        }}/>
                    </div>
                )}
        </div>
    )
};

export default App;