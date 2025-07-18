"use client";

import { SimpleMap } from "@/components/map/simple-map";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Filter } from "lucide-react";
import { useState } from "react";

export default function MapaPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mapa de Empresas
          </h1>
          <p className="text-lg text-gray-600">
            Encontre empresas de energia solar próximas à sua localização
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Buscar por Localização</CardTitle>
            <CardDescription>
              Digite uma cidade, estado ou CEP para encontrar empresas próximas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Ex: São Paulo, SP ou 01310-100"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 h-12"
                  />
                </div>
              </div>
              <Button className="h-12 px-8">
                <MapPin className="h-4 w-4 mr-2" />
                Buscar
              </Button>
              <Button variant="outline" className="h-12 px-6">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <Card className="mb-8">
          <CardContent className="p-0">
            <SimpleMap height="600px" />
          </CardContent>
        </Card>

        {/* Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-orange-600" />
                Explore o Mapa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Navegue pelo mapa para visualizar empresas de energia solar em diferentes regiões do Brasil. 
                Use os controles de zoom para uma visão mais detalhada.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Search className="h-5 w-5 mr-2 text-orange-600" />
                Clique nos Marcadores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Clique nos marcadores laranja para ver informações detalhadas sobre cada empresa, 
                incluindo avaliações, contato e serviços oferecidos.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Filter className="h-5 w-5 mr-2 text-orange-600" />
                Use os Filtros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Utilize os filtros de busca para encontrar empresas específicas por localização, 
                tipo de serviço ou avaliação mínima.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

