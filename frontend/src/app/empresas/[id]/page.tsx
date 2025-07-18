import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  MapPin, 
  Users, 
  Phone, 
  Mail, 
  Globe,
  Award,
  Calendar,
  CheckCircle,
  MessageSquare,
  Calculator
} from "lucide-react";

// Generate static params for static export
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}

// Mock data - in real app, this would come from API based on params.id
const company = {
  id: "1",
  name: "SolarTech Brasil",
  description: "Especializada em sistemas fotovoltaicos residenciais e comerciais com mais de 15 anos de experiência no mercado brasileiro.",
  rating: 4.8,
  reviewCount: 234,
  location: "São Paulo, SP",
  phone: "(11) 99999-9999",
  email: "contato@solartech.com.br",
  website: "www.solartech.com.br",
  services: ["Residencial", "Comercial", "Industrial"],
  projectCount: 450,
  verified: true,
  logo: "ST"
};

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{company.logo}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-2xl">{company.name}</CardTitle>
                    {company.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verificada
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{company.rating}</span>
                      <span className="ml-1">({company.reviewCount} avaliações)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {company.location}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Avaliar
                </Button>
                <Button>
                  <Calculator className="h-4 w-4 mr-2" />
                  Solicitar Orçamento
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base mb-4">
              {company.description}
            </CardDescription>
            
            {/* Services */}
            <div className="flex flex-wrap gap-2 mb-4">
              {company.services.map((service) => (
                <Badge key={service} variant="outline">
                  {service}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{company.projectCount}+ projetos concluídos</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{company.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{company.email}</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{company.website}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre a Empresa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  A SolarTech Brasil é uma empresa líder no mercado de energia solar, 
                  oferecendo soluções completas e personalizadas para residências, 
                  comércios e indústrias. Com mais de 15 anos de experiência, nossa 
                  equipe técnica altamente qualificada garante a máxima qualidade 
                  em todos os projetos.
                </p>
                <p className="text-gray-600">
                  Utilizamos apenas equipamentos de primeira linha e oferecemos 
                  garantia estendida em todos os nossos serviços. Nosso compromisso 
                  é proporcionar economia real na conta de energia elétrica dos 
                  nossos clientes, contribuindo para um futuro mais sustentável.
                </p>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <CardTitle>Avaliações dos Clientes</CardTitle>
                <CardDescription>
                  Veja o que nossos clientes dizem sobre nossos serviços
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Sample Reviews */}
                  <div className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">JM</span>
                        </div>
                        <span className="font-medium">João Martins</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Excelente atendimento e qualidade dos equipamentos. 
                      A instalação foi rápida e profissional. Recomendo!
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">MS</span>
                        </div>
                        <span className="font-medium">Maria Silva</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Projeto muito bem executado. A economia na conta de luz 
                      foi imediata. Equipe muito profissional.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Entre em Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Solicitar Orçamento
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar Agora
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar E-mail
                </Button>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Certificações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="text-sm">INMETRO Certificado</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="text-sm">ISO 9001:2015</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="text-sm">CREA Registrado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

