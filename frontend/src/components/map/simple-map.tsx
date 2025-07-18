"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Phone, Mail, Navigation } from 'lucide-react';

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

interface SimpleMapProps {
  height?: string;
}

export function SimpleMap({ height = "400px" }: SimpleMapProps) {
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null);

  return (
    <div style={{ height }} className="relative rounded-lg overflow-hidden border bg-gray-100">
      {/* Map Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <Navigation className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Mapa Interativo
          </h3>
          <p className="text-sm text-gray-500">
            Visualização das empresas de energia solar
          </p>
        </div>
      </div>

      {/* Company Markers Overlay */}
      <div className="absolute inset-0">
        {companies.map((company, index) => (
          <div
            key={company.id}
            className="absolute cursor-pointer transform hover:scale-110 transition-transform"
            style={{
              left: `${20 + (index * 15)}%`,
              top: `${30 + (index * 10)}%`,
            }}
            onClick={() => setSelectedCompany(company)}
          >
            <div className="bg-orange-500 text-white p-2 rounded-full shadow-lg">
              <MapPin className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Selected Company Info */}
      {selectedCompany && (
        <div className="absolute bottom-4 left-4 right-4">
          <Card className="max-w-sm">
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
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setSelectedCompany(null)}
                  className="text-xs"
                >
                  ✕
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg border">
        <div className="flex items-center space-x-2 text-sm">
          <div className="bg-orange-500 p-1 rounded-full">
            <MapPin className="h-3 w-3 text-white" />
          </div>
          <span className="text-gray-700">Empresas de Energia Solar</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Clique nos marcadores para ver detalhes
        </p>
      </div>
    </div>
  );
}

