import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { weatherApi } from '@/api/weather.api';
import type { WeatherData } from '@/types/weather';
import { Search, MapPin, Loader2, AlertCircle, Cloud, Droplets, Wind, Gauge, Eye, Sun } from 'lucide-react';
import { toast } from 'sonner';

export function WeatherPage() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useGPS, setUseGPS] = useState(false);

  const handleSearch = async () => {
    if (!location.trim()) {
      toast.error('Please enter a location');
      return;
    }

    setLoading(true);
    setError(null);
    setUseGPS(false);

    try {
      const data = await weatherApi.getWeatherByLocation(location);
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

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Weather App</h1>
        <p className="text-lg text-muted-foreground">
          Search for weather by location or use your current GPS location
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Weather</CardTitle>
          <CardDescription>
            Enter a city name or use your current location
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter city name (e.g., London, New York)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              disabled={loading}
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>

          <Button
            onClick={handleGPSLocation}
            disabled={loading}
            variant="outline"
            className="w-full gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Getting location...
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4" />
                Use My Location (GPS)
              </>
            )}
          </Button>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {weather && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    {weather.location.name}
                    {weather.location.region && `, ${weather.location.region}`}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {weather.location.country}
                    {useGPS && <Badge variant="secondary" className="ml-2">GPS Location</Badge>}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">
                    {weather.current.temp_c}°C
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Feels like {weather.current.feelslike_c}°C
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={weather.current.condition.icon}
                  alt={weather.current.condition.text}
                  className="w-16 h-16"
                />
                <div>
                  <p className="text-lg font-semibold">{weather.current.condition.text}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(weather.location.localtime).toLocaleString()}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted">
                    <Droplets className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Humidity</p>
                    <p className="font-semibold">{weather.current.humidity}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted">
                    <Wind className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Wind</p>
                    <p className="font-semibold">
                      {weather.current.wind_kph} km/h {weather.current.wind_dir}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted">
                    <Gauge className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pressure</p>
                    <p className="font-semibold">{weather.current.pressure_mb} mb</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted">
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Visibility</p>
                    <p className="font-semibold">{weather.current.vis_km} km</p>
                  </div>
                </div>

                {weather.current.uv > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-muted">
                      <Sun className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">UV Index</p>
                      <p className="font-semibold">{weather.current.uv}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Latitude</p>
                  <p className="font-semibold">{weather.location.lat}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Longitude</p>
                  <p className="font-semibold">{weather.location.lon}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

