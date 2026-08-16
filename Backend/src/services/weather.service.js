import "dotenv/config";

export const searchWeather = async ({ city }) => {
    const result = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`);
    if (!result.ok) {
        throw new Error(`Failed to fetch weather data for ${city}`);
    } else {
        const data = await result.json();
        return {
            city: data.location.name,
            country: data.location.country,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
        };
    }
};
