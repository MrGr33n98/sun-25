"use client";

import { useState, useCallback } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl';
import { MapPin, Star, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data for companies with coordinates
const companies = [
  {
    id: "1",
    name: "SolarTech Brasil",
    description: "Especializada em sistemas fotovoltaicos residenciais e comerciais",
    rating: 4.8,
    reviewCount: 234,
    city: "São Paulo",
    state: "SP",
    latitude: -23.5505,
    longitude: -46.6333,
    verified: true,
    phone: "(11) 99999-9999",
    email: "contato@solartech.com.br"
  },
  {
    id: "2",
    name: "Energia Verde Ltda",
    description: "Empresa focada em soluções sustentáveis de energia solar",
    rating: 4.6,
    reviewCount: 189,
    city: "Rio de Janeiro",
    state: "RJ",
    latitude: -22.9068,
    longitude: -43.1729,
    verified: true,
    phone: "(21) 88888-8888",
    email: "info@energiaverde.com.br"
  },
  {
    id: "3",
    name: "Sol & Cia",
    description: "Instalação e manutenção de sistemas solares",
    rating: 4.9,
    reviewCount: 156,
    city: "Belo Horizonte",
    state: "MG",
    latitude: -19.9167,
    longitude: -43.9345,
    verified: true,
    phone: "(31) 77777-7777",
    email: "contato@solecia.com.br"
  },
  {
    id: "4",
    name: "PowerSun Energia",
    description: "Líder em projetos de grande porte",
    rating: 4.7,
    reviewCount: 298,
    city: "Porto Alegre",
    state: "RS",
    latitude: -30.0346,
    longitude: -51.2177,
    verified: true,
    phone: "(51) 66666-6666",
    email: "vendas@powersun.com.br"
  },
  {
    id: "5",
    name: "EcoSolar Nordeste",
    description: "Especializada no mercado nordestino",
    rating: 4.5,
    reviewCount: 167,
    city: "Fortaleza",
    state: "CE",
    latitude: -3.7172,
    longitude: -38.5433,
    verified: true,
    phone: "(85) 55555-5555",
    email: "contato@ecosolar.com.br"
  }
];

interface InteractiveMapProps {
  height?: string;
  showControls?: boolean;
}

export function InteractiveMap({ height = "400px", showControls = true }: InteractiveMapProps) {
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null);
  const [viewState, setViewState] = useState({
    longitude: -47.8825,
    latitude: -15.7942, // Center of Brazil
    zoom: 4
  });

  const onMarkerClick = useCallback((company: typeof companies[0]) => {
    setSelectedCompany(company);
    setViewState({
      longitude: company.longitude,
      latitude: company.latitude,
      zoom: 10
    });
  }, []);

  return (
    <div style={{ height }} className="relative rounded-lg overflow-hidden border">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.eyJ1IjoibWFudXMtYWkiLCJhIjoiY2x0ZXN0MTIzNDU2Nzg5IiwiYSI6IkEifQ.test"}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Company Markers */}
        {companies.map((company) => (
          <Marker
            key={company.id}
            longitude={company.longitude}
            latitude={company.latitude}
            anchor="bottom"
            onClick={() => onMarkerClick(company)}
          >
            <div className="cursor-pointer transform hover:scale-110 transition-transform">
              <div className="bg-orange-500 text-white p-2 rounded-full shadow-lg">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
          </Marker>
        ))}

        {/* Popup for selected company */}
        {selectedCompany && (
          <Popup
            longitude={selectedCompany.longitude}
            latitude={selectedCompany.latitude}
            anchor="top"
            onClose={() => setSelectedCompany(null)}
            closeButton={true}
            closeOnClick={false}
            className="max-w-sm"
          >
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{selectedCompany.name}</CardTitle>
                  {selectedCompany.verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verificada
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(selectedCompany.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{selectedCompany.rating}</span>
                  <span className="text-xs text-gray-500">
                    ({selectedCompany.reviewCount} avaliações)
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="mb-3 text-sm">
                  {selectedCompany.description}
                </CardDescription>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    {selectedCompany.city}, {selectedCompany.state}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Phone className="h-3 w-3 mr-1" />
                    {selectedCompany.phone}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Mail className="h-3 w-3 mr-1" />
                    {selectedCompany.email}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 text-xs">
                    Ver Detalhes
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    Orçamento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Popup>
        )}

        {/* Map Controls */}
        {showControls && (
          <>
            <NavigationControl position="top-right" />
            <FullscreenControl position="top-right" />
          </>
        )}
      </Map>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border">
        <div className="flex items-center space-x-2 text-sm">
          <div className="bg-orange-500 p-1 rounded-full">
            <MapPin className="h-3 w-3 text-white" />
          </div>
          <span className="text-gray-700">Empresas de Energia Solar</span>
        </div>
      </div>
    </div>
  );
}

