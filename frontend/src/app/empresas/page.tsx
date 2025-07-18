"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Star, 
  MapPin, 
  Users, 
  Filter,
  SlidersHorizontal,
  Phone,
  Mail,
  Globe
} from "lucide-react";
import Link from "next/link";

export default function EmpresasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - in real app, this would come from API
  const companies = [
    {
      id: "1",
      name: "SolarTech Brasil",
      description: "Especializada em sistemas fotovoltaicos residenciais e comerciais com mais de 15 anos de experiência no mercado brasileiro.",
      rating: 4.8,
      reviewCount: 234,
      city: "São Paulo",
      state: "SP",
      projectCount: 450,
      verified: true,
      logo: "ST",
      services: ["Residencial", "Comercial", "Industrial"],
      phone: "(11) 99999-9999",
      email: "contato@solartech.com.br",
      website: "www.solartech.com.br"
    },
    {
      id: "2",
      name: "Energia Verde Ltda",
      description: "Empresa focada em soluções sustentáveis de energia solar para residências e pequenos comércios.",
      rating: 4.6,
      reviewCount: 189,
      city: "Rio de Janeiro",
      state: "RJ",
      projectCount: 320,
      verified: true,
      logo: "EV",
      services: ["Residencial", "Comercial"],
      phone: "(21) 88888-8888",
      email: "info@energiaverde.com.br",
      website: "www.energiaverde.com.br"
    },
    {
      id: "3",
      name: "Sol & Cia",
      description: "Instalação e manutenção de sistemas solares com garantia estendida e suporte técnico 24/7.",
      rating: 4.9,
      reviewCount: 156,
      city: "Belo Horizonte",
      state: "MG",
      projectCount: 280,
      verified: true,
      logo: "SC",
      services: ["Residencial", "Manutenção"],
      phone: "(31) 77777-7777",
      email: "contato@solecia.com.br",
      website: "www.solecia.com.br"
    },
    {
      id: "4",
      name: "PowerSun Energia",
      description: "Líder em projetos de grande porte, atendendo indústrias e complexos comerciais em todo o país.",
      rating: 4.7,
      reviewCount: 298,
      city: "Porto Alegre",
      state: "RS",
      projectCount: 520,
      verified: true,
      logo: "PS",
      services: ["Industrial", "Comercial", "Residencial"],
      phone: "(51) 66666-6666",
      email: "vendas@powersun.com.br",
      website: "www.powersun.com.br"
    },
    {
      id: "5",
      name: "EcoSolar Nordeste",
      description: "Especializada no mercado nordestino, aproveitando o alto índice de irradiação solar da região.",
      rating: 4.5,
      reviewCount: 167,
      city: "Fortaleza",
      state: "CE",
      projectCount: 380,
      verified: true,
      logo: "EN",
      services: ["Residencial", "Comercial", "Rural"],
      phone: "(85) 55555-5555",
      email: "contato@ecosolar.com.br",
      website: "www.ecosolar.com.br"
    },
    {
      id: "6",
      name: "Solar Inovação",
      description: "Empresa jovem e inovadora, focada em tecnologias de ponta e soluções personalizadas.",
      rating: 4.4,
      reviewCount: 89,
      city: "Brasília",
      state: "DF",
      projectCount: 150,
      verified: false,
      logo: "SI",
      services: ["Residencial", "Comercial"],
      phone: "(61) 44444-4444",
      email: "info@solarinovacao.com.br",
      website: "www.solarinovacao.com.br"
    }
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Empresas de Energia Solar
          </h1>
          <p className="text-lg text-gray-600">
            Encontre e compare as melhores empresas de energia solar do Brasil
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar por empresa, cidade ou estado..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-12"
                />
              </div>
            </div>

            {/* Filter Button */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <select className="w-full h-10 px-3 border border-gray-300 rounded-md">
                    <option value="">Todos os estados</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="CE">Ceará</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avaliação Mínima
                  </label>
                  <select className="w-full h-10 px-3 border border-gray-300 rounded-md">
                    <option value="">Qualquer avaliação</option>
                    <option value="4.5">4.5+ estrelas</option>
                    <option value="4.0">4.0+ estrelas</option>
                    <option value="3.5">3.5+ estrelas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Serviço
                  </label>
                  <select className="w-full h-10 px-3 border border-gray-300 rounded-md">
                    <option value="">Todos os serviços</option>
                    <option value="residencial">Residencial</option>
                    <option value="comercial">Comercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredCompanies.length} de {companies.length} empresas
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-lg">
                        {company.logo}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <CardTitle className="text-xl">{company.name}</CardTitle>
                        {company.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verificada
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(company.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{company.rating}</span>
                        <span className="text-sm text-gray-500">
                          ({company.reviewCount} avaliações)
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {company.city}, {company.state}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="mb-4 text-sm leading-relaxed">
                  {company.description}
                </CardDescription>

                {/* Services */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {company.services.map((service) => (
                      <Badge key={service} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Users className="h-4 w-4 mr-1" />
                  {company.projectCount}+ projetos concluídos
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {company.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {company.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="h-4 w-4 mr-2" />
                    {company.website}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/empresas/${company.id}`} className="flex-1">
                    <Button className="w-full">Ver Detalhes</Button>
                  </Link>
                  <Button variant="outline" className="flex-1">
                    Solicitar Orçamento
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredCompanies.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Carregar Mais Empresas
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma empresa encontrada
            </h3>
            <p className="text-gray-600">
              Tente ajustar seus filtros ou termo de busca
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

