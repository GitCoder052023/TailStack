import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { WeatherMetricProps } from '@/types/weather';
import { useWeather } from '@/hooks/use-weather';
import {
  Search,
  MapPin,
  Loader2,
  AlertCircle,
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sun,
  Navigation
} from 'lucide-react';

export function WeatherPage() {
  const {
    location,
    setLocation,
    weather,
    loading,
    error,
    useGPS,
    handleSearch,
    handleGPSLocation
  } = useWeather();

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Weather App
          </h1>
          <p className="text-muted-foreground">
            Search for weather by location or use your current GPS location.
            This demo showcases the full-stack architecture.
          </p>
        </div>

        {/* Search Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Search Weather</CardTitle>
            <CardDescription>
              Enter a city name or use your current location
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Enter city name (e.g., London, New York)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  disabled={loading}
                  className="pl-9"
                />
              </div>
              <Button onClick={() => handleSearch()} disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Search'
                )}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
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
                  <Navigation className="h-4 w-4" />
                  Use My Location (GPS)
                </>
              )}
            </Button>

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weather Results */}
        {weather && (
          <div className="space-y-6">
            {/* Main Weather Card */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-2xl">
                        {weather.location.name}
                        {weather.location.region && `, ${weather.location.region}`}
                      </CardTitle>
                      {useGPS && (
                        <Badge variant="secondary" className="gap-1">
                          <Navigation className="h-3 w-3" />
                          GPS
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {weather.location.country}
                    </CardDescription>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-4xl font-bold tabular-nums sm:text-5xl">
                      {weather.current.temp_c}°
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Feels like {weather.current.feelslike_c}°C
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Condition */}
                <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
                  <img
                    src={weather.current.condition.icon}
                    alt={weather.current.condition.text}
                    className="h-16 w-16"
                  />
                  <div>
                    <p className="text-lg font-medium">{weather.current.condition.text}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(weather.location.localtime).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Weather Details Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <WeatherMetric
                    icon={<Droplets className="h-4 w-4" />}
                    label="Humidity"
                    value={`${weather.current.humidity}%`}
                  />
                  <WeatherMetric
                    icon={<Wind className="h-4 w-4" />}
                    label="Wind"
                    value={`${weather.current.wind_kph} km/h ${weather.current.wind_dir}`}
                  />
                  <WeatherMetric
                    icon={<Gauge className="h-4 w-4" />}
                    label="Pressure"
                    value={`${weather.current.pressure_mb} mb`}
                  />
                  <WeatherMetric
                    icon={<Eye className="h-4 w-4" />}
                    label="Visibility"
                    value={`${weather.current.vis_km} km`}
                  />
                  {weather.current.uv > 0 && (
                    <WeatherMetric
                      icon={<Sun className="h-4 w-4" />}
                      label="UV Index"
                      value={`${weather.current.uv}`}
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Location Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Latitude</p>
                    <p className="font-mono text-sm">{weather.location.lat}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Longitude</p>
                    <p className="font-mono text-sm">{weather.location.lon}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function WeatherMetric({ icon, label, value }: WeatherMetricProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
