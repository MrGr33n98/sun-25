"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ThumbsDown, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for reviews
const reviews = [
  {
    id: "1",
    rating: 5,
    title: "Excelente atendimento e instalação perfeita",
    content: "Contratei a empresa para instalação de painéis solares em minha residência e fiquei muito satisfeito. O atendimento foi excelente desde o primeiro contato, com explicações claras sobre o processo e custos. A instalação foi feita no prazo combinado e com muito profissionalismo. Recomendo!",
    user: {
      name: "Carlos Silva",
      avatar: "CS",
      verified: true
    },
    createdAt: "2024-01-15",
    helpful: 12,
    notHelpful: 1
  },
  {
    id: "2",
    rating: 4,
    title: "Bom custo-benefício, pequenos atrasos",
    content: "A empresa oferece um bom custo-benefício para instalação de energia solar. O projeto foi bem elaborado e a equipe técnica é competente. Houve um pequeno atraso na instalação devido ao clima, mas nada que comprometesse o resultado final. Estou satisfeito com a economia na conta de luz.",
    user: {
      name: "Maria Santos",
      avatar: "MS",
      verified: false
    },
    createdAt: "2024-01-10",
    helpful: 8,
    notHelpful: 0
  },
  {
    id: "3",
    rating: 5,
    title: "Profissionais qualificados e suporte excelente",
    content: "Desde o orçamento até a finalização do projeto, tudo foi muito bem conduzido. Os profissionais são qualificados e o suporte pós-instalação é excelente. Já indiquei para amigos e todos ficaram satisfeitos. A economia na conta de energia elétrica superou as expectativas.",
    user: {
      name: "João Oliveira",
      avatar: "JO",
      verified: true
    },
    createdAt: "2024-01-05",
    helpful: 15,
    notHelpful: 2
  },
  {
    id: "4",
    rating: 3,
    title: "Serviço ok, mas comunicação pode melhorar",
    content: "O serviço de instalação foi realizado adequadamente e os painéis estão funcionando bem. Porém, a comunicação durante o processo poderia ser melhor. Algumas vezes tive dificuldade para obter informações sobre o andamento do projeto. No geral, estou satisfeito com o resultado.",
    user: {
      name: "Ana Costa",
      avatar: "AC",
      verified: false
    },
    createdAt: "2023-12-28",
    helpful: 5,
    notHelpful: 3
  }
];

interface ReviewListProps {
  companyId: string;
  showTitle?: boolean;
}

export function ReviewList({ companyId, showTitle = true }: ReviewListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {showTitle && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Avaliações dos Clientes
          </h3>
          <p className="text-gray-600">
            {reviews.length} avaliações verificadas
          </p>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-medium text-sm">
                      {review.user.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {review.user.name}
                      </span>
                      {review.user.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verificado
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-sm font-medium ${getRatingColor(review.rating)}`}>
                        {review.rating}.0
                      </span>
                      <span className="text-sm text-gray-500">
                        • {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <h4 className="font-medium text-gray-900 mb-2">
                {review.title}
              </h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                {review.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Útil ({review.helpful})</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <ThumbsDown className="h-4 w-4" />
                    <span>Não útil ({review.notHelpful})</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center">
        <Button variant="outline">
          Carregar Mais Avaliações
        </Button>
      </div>
    </div>
  );
}

