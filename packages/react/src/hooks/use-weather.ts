import { useState } from 'react';
import { weatherApi } from '@/api/weather.api';
import type { WeatherData } from '@/types/weather';
import { toast } from 'sonner';

export function useWeather() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useGPS, setUseGPS] = useState(false);

  const handleSearch = async (searchLocation: string = location) => {
    if (!searchLocation.trim()) {
      toast.error('Please enter a location');
      return;
    }

    setLoading(true);
    setError(null);
    setUseGPS(false);

    try {
      const data = await weatherApi.getWeatherByLocation(searchLocation);
      setWeather(data);
      toast.success('Weather data loaded successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGPSLocation = async () => {
    setLoading(true);
    setError(null);
    setLocation('');

    if (!navigator.geolocation) {
      const errorMsg = 'Geolocation is not supported by your browser';
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await weatherApi.getWeatherByCoordinates(latitude, longitude);
          setWeather(data);
          setUseGPS(true);
          toast.success('Weather data loaded from your location');
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
          setError(errorMessage);
          toast.error(errorMessage);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        const errorMsg = err.message || 'Failed to get your location. Please allow location access.';
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return {
    location,
    setLocation,
    weather,
    loading,
    error,
    useGPS,
    handleSearch,
    handleGPSLocation
  };
}
