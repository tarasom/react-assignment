export enum WeatherType {
    Sunny = 'Sunny', // leave home, open windows
    Windy = 'Windy', // close windows
    Rainy = 'Rainy', // goHome
    Stormy = 'Stormy', // goHome, close windows
    Foggy = 'Foggy',
    Snowy = 'Snowy', // openWindows
    Clear = 'Clear', // leave home, open windows
}

enum PrecipitationType {
    Rain = 'Rain',
    Snow = 'Snow',
    Sleet = 'Sleet',
}

interface SunnyWeatherPayload {
    description: string;
    temperature: number; // in Celsius
    uvIndex: number; // UV index level
}

interface WindyWeatherPayload {
    description: string;
    windSpeed: number; // in meters per second
    gustSpeed: number; // maximum gust speed
}

interface RainyWeatherPayload {
    description: string;
    precipitationType: PrecipitationType.Rain;
    rainIntensity: number; // in millimeters per hour
}

interface StormyWeatherPayload {
    description: string;
    precipitationType: PrecipitationType.Rain | PrecipitationType.Snow | PrecipitationType.Sleet;
    windSpeed: number; // in meters per second
    thunder: boolean; // presence of thunderstorms
}

interface FoggyWeatherPayload {
    description: string;
    visibility: number; // in meters
    humidity: number; // percentage
}

interface SnowyWeatherPayload {
    description: string;
    precipitationType: PrecipitationType.Snow;
    snowfallRate: number; // in centimeters per hour
    temperature: number; // in Celsius
}

interface ClearWeatherPayload {
    description: string;
    temperature: number; // in Celsius
    humidity: number; // percentage
}

type WeatherPayloadType =
    | SunnyWeatherPayload
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


interface IWardrobeManager {
    sunglasses: boolean;
    cap: boolean;
    coat: boolean;
    umbrella: boolean;
    scarf: boolean;
    shorts: boolean;
    pants: boolean;

    putOnSunglasses(): void;

    takeOffSunglasses(): void;

    putOnCap(): void;

    takeOffCap(): void;

    putOnCoat(): void;

    takeOffCoat(): void;

    putOnScarf(): void;

    takeOffScarf(): void;

    putOnShorts(): void;

    takeOffShorts(): void;

    putOnPants(): void;

    takeOffPants(): void;

    takeUmbrella(): void;

    leaveUmbrella(): void;
}

export class WeatherManager {
    weather: Weather;
    wardrobeManager: IWardrobeManager;

    constructor() {
        const storedWeather = window.localStorage.getItem('weather');

        debugger;
        this.weather = storedWeather
            ? JSON.parse(storedWeather)
            : {
                type: WeatherType.Clear,
                payload: {description: "Clear sky", temperature: 20, humidity: 70}
            };

        this.wardrobeManager = {
            sunglasses: false,
            cap: false,
            coat: false,
            umbrella: false,
            scarf: false,
            shorts: false,
            pants: false,

            putOnSunglasses(): void {
                this.sunglasses = true;
            },

            takeOffSunglasses(): void {
                this.sunglasses = false;
            },

            putOnCap(): void {
                this.cap = true;
            },

            takeOffCap(): void {
                this.cap = false;
            },

            putOnCoat(): void {
                this.coat = true;
            },

            takeOffCoat(): void {
                this.coat = false;
            },

            putOnScarf(): void {
                this.scarf = true;
            },

            takeOffScarf(): void {
                this.scarf = false;
            },

            putOnShorts(): void {
                this.shorts = true;
            },

            takeOffShorts(): void {
                this.shorts = false;
            },

            putOnPants(): void {
                this.pants = true;
            },

            takeOffPants(): void {
                this.pants = false;
            },

            takeUmbrella(): void {
                this.umbrella = true;
            },

            leaveUmbrella(): void {
                this.umbrella = false;
            },
        };
    }
}

export class WeatherListener {
    controller: WeatherManager = new WeatherManager();

    public updateWeather(newWeather: Weather) {
        const currentWeather = this.controller.weather;
        const weatherChangeStatus = this.determineWeatherChangeStatus(
            currentWeather,
            newWeather,
        );

        this.controller.weather = newWeather;

        window.localStorage.setItem('weather', JSON.stringify(newWeather));

        if (weatherChangeStatus.isWetWeatherStopped) {
            this.controller.wardrobeManager.leaveUmbrella();
        }

        if (weatherChangeStatus.isSunnyWeatherStopped) {
            this.onSunnyWeatherStopped();
        } else if (weatherChangeStatus.isSnowyWeatherStopped) {
            this.controller.wardrobeManager.takeOffScarf();
        } else if (weatherChangeStatus.isWindyWeatherStopped) {
            this.controller.wardrobeManager.takeOffCoat();
        }

        if (weatherChangeStatus.isSunnyWeatherStarted) {
            this.onSunnyWeatherAdded(currentWeather, newWeather)
        } else if (weatherChangeStatus.isSnowyWeatherStarted) {
            this.controller.wardrobeManager.putOnScarf();
            this.controller.wardrobeManager.putOnPants();
            this.controller.wardrobeManager.takeOffShorts();
        } else if (weatherChangeStatus.isStormyWeatherAdded) {
            this.addStormyWeather(
                weatherChangeStatus.isWetWeather,
                weatherChangeStatus.isSunnyWeather,
                currentWeather,
                newWeather,
            );
        } else if (weatherChangeStatus.isWindyWeatherStarted) {
            this.controller.wardrobeManager.putOnCoat();
            this.controller.wardrobeManager.putOnPants();
            this.controller.wardrobeManager.takeOffShorts();
        }

        if (weatherChangeStatus.isWetWeatherStarted) {
            this.onWetWeatherAdded(
                currentWeather,
                newWeather
            );
        }

        if (weatherChangeStatus.isSunnyWeatherUpdated) {
            this.onSunnyWeatherUpdated(newWeather)
        }
    }

    private determineWeatherChangeStatus(
        from: Weather,
        to: Weather,
    ) {
        const wetTypes = [
            WeatherType.Rainy,
            WeatherType.Stormy,
        ];

        const isSunnyWeather = from.type === WeatherType.Sunny;
        const isSunnyWeatherUpdated = isSunnyWeather && to.type === WeatherType.Sunny;
        const isSunnyWeatherStopped = isSunnyWeather && to.type !== WeatherType.Sunny;
        const isSunnyWeatherStarted = from.type !== WeatherType.Sunny && to.type === WeatherType.Sunny;
        const isSnowyWeatherStarted = from.type !== WeatherType.Snowy && to.type === WeatherType.Snowy;
        const isSnowyWeatherStopped = from.type === WeatherType.Snowy && to.type !== WeatherType.Snowy;
        const isWindyWeatherStarted = from.type !== WeatherType.Windy && to.type === WeatherType.Windy;
        const isWindyWeatherStopped = from.type === WeatherType.Windy && to.type !== WeatherType.Windy;

        const isWetWeather =
            Boolean(from.type && wetTypes.includes(from.type));

        const isWetWeatherStopped = isWetWeather && !Boolean(to.type && wetTypes.includes(to.type))

        const isWetWeatherStarted =
            (from.type && !wetTypes.includes(from.type)) &&
            (to.type && wetTypes.includes(to.type));


        const isStormyWeatherStopped =
            from?.type === WeatherType.Stormy && to?.type !== WeatherType.Stormy;

        const isStormyWeatherAdded = to?.type === WeatherType.Stormy;

        return {
            isWetWeatherStarted,
            isWetWeather,
            isSunnyWeather,
            isSunnyWeatherUpdated,
            isSunnyWeatherStarted,
            isSunnyWeatherStopped,
            isStormyWeatherAdded,
            isStormyWeatherStopped,
            isWetWeatherStopped,
            isSnowyWeatherStarted,
            isSnowyWeatherStopped,
            isWindyWeatherStarted,
            isWindyWeatherStopped
        };
    }

    private addStormyWeather(
        isWetWeather: boolean,
        isSunnyWeather: boolean,
        prevWeather?: Weather,
        nextWeather?: Weather
    ) {
        this.controller.wardrobeManager.putOnPants();
        this.controller.wardrobeManager.takeOffShorts();
    }

    private onWetWeatherAdded(
        current?: Weather,
        next?: Weather,
    ) {
        this.controller.wardrobeManager.takeUmbrella();

        if (!this.controller.wardrobeManager.pants && !this.controller.wardrobeManager.shorts) {
            this.controller.wardrobeManager.putOnPants();
        }
    }

    private onSunnyWeatherAdded(
        prevWeather?: Weather,
        nextWeather?: Weather
    ) {
        this.controller.wardrobeManager.putOnSunglasses();

        if ((nextWeather?.payload as any).temperature >= 25) {
            this.controller.wardrobeManager.putOnCap();
            this.controller.wardrobeManager.putOnShorts();
            this.controller.wardrobeManager.takeOffPants();
        } else {
            this.controller.wardrobeManager.putOnPants();
            this.controller.wardrobeManager.takeOffShorts();
            this.controller.wardrobeManager.takeOffCap();
        }
    }

    private onSunnyWeatherUpdated(
        nextWeather?: Weather
    ) {
        if ((nextWeather?.payload as any).temperature >= 25) {
            this.controller.wardrobeManager.putOnCap();
            this.controller.wardrobeManager.putOnShorts();
            this.controller.wardrobeManager.takeOffPants();
        } else {
            this.controller.wardrobeManager.putOnPants();
            this.controller.wardrobeManager.takeOffShorts();
            this.controller.wardrobeManager.takeOffCap();
        }
    }

    private onSunnyWeatherStopped() {
        this.controller.wardrobeManager.takeOffSunglasses();
        this.controller.wardrobeManager.takeOffCap();
    }
}
