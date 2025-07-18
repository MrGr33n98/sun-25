import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Star, 
  MapPin, 
  Users, 
  Award, 
  TrendingUp,
  Shield,
  Clock,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Encontre as Melhores
              <span className="text-orange-600 block">Empresas de Energia Solar</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Compare preços, avaliações e serviços das principais empresas de energia solar do Brasil. 
              Faça a escolha certa para sua transição energética.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Digite sua cidade ou estado..."
                  className="pl-12 pr-4 h-14 text-lg"
                />
                <Button className="absolute right-2 top-2 h-10">
                  Buscar
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">500+</div>
                <div className="text-sm text-gray-600">Empresas Verificadas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">10k+</div>
                <div className="text-sm text-gray-600">Projetos Concluídos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">25k+</div>
                <div className="text-sm text-gray-600">Avaliações</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-gray-600">Gratuito</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Empresas em Destaque
            </h2>
            <p className="text-lg text-gray-600">
              Conheça as empresas mais bem avaliadas pelos nossos usuários
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600 font-bold">S{i}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">Solar Empresa {i}</CardTitle>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">4.{8 + i % 2}</span>
                          <span className="text-sm text-gray-500">(127 avaliações)</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">Verificada</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Especializada em instalação residencial e comercial de sistemas fotovoltaicos 
                    com mais de 10 anos de experiência no mercado.
                  </CardDescription>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    São Paulo, SP
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {50 + i * 20}+ projetos concluídos
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/empresas">
              <Button size="lg">Ver Todas as Empresas</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-gray-600">
              Encontre a empresa ideal em 3 passos simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Busque</h3>
              <p className="text-gray-600">
                Digite sua localização e encontre empresas de energia solar próximas a você
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Compare</h3>
              <p className="text-gray-600">
                Analise avaliações, preços, serviços e projetos anteriores das empresas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Contrate</h3>
              <p className="text-gray-600">
                Solicite orçamentos e contrate a empresa que melhor atende suas necessidades
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que Escolher o InsideSolar?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Empresas Verificadas</h3>
              <p className="text-gray-600">
                Todas as empresas passam por um rigoroso processo de verificação
              </p>
            </div>

            <div className="text-center">
              <Star className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Avaliações Reais</h3>
              <p className="text-gray-600">
                Avaliações autênticas de clientes que já contrataram os serviços
              </p>
            </div>

            <div className="text-center">
              <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Economia de Tempo</h3>
              <p className="text-gray-600">
                Compare múltiplas empresas em um só lugar, sem perder tempo
              </p>
            </div>

            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Melhor Custo-Benefício</h3>
              <p className="text-gray-600">
                Encontre a melhor relação qualidade-preço para seu projeto
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Economizar com Energia Solar?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Junte-se a milhares de brasileiros que já fizeram a transição para energia limpa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/empresas">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Encontrar Empresas
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-orange-600">
              Cadastrar Minha Empresa
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

