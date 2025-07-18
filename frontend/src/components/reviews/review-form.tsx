"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Send } from "lucide-react";

interface ReviewFormProps {
  companyId: string;
  companyName: string;
  onSubmit?: (review: any) => void;
}

export function ReviewForm({ companyId, companyName, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert("Por favor, selecione uma avaliação de 1 a 5 estrelas");
      return;
    }

    setIsSubmitting(true);

    const review = {
      companyId,
      rating,
      title: title.trim(),
      content: content.trim(),
      userId: "user-123", // In real app, get from auth context
    };

    try {
      // In real app, make API call here
      console.log("Submitting review:", review);
      
      if (onSubmit) {
        onSubmit(review);
      }

      // Reset form
      setRating(0);
      setTitle("");
      setContent("");
      
      alert("Avaliação enviada com sucesso!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Erro ao enviar avaliação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Avaliar {companyName}</CardTitle>
        <CardDescription>
          Compartilhe sua experiência para ajudar outros usuários
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Stars */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avaliação Geral *
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 hover:text-yellow-300"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-gray-600">
                  {rating === 1 && "Muito Ruim"}
                  {rating === 2 && "Ruim"}
                  {rating === 3 && "Regular"}
                  {rating === 4 && "Bom"}
                  {rating === 5 && "Excelente"}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título da Avaliação
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Ex: Excelente atendimento e instalação rápida"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">
              {title.length}/100 caracteres
            </p>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Detalhes da Experiência
            </label>
            <textarea
              id="content"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              placeholder="Conte sobre sua experiência com esta empresa. Como foi o atendimento? A instalação foi feita no prazo? Você recomendaria?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {content.length}/500 caracteres
            </p>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Diretrizes para Avaliações
            </h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Seja honesto e construtivo em sua avaliação</li>
              <li>• Foque na qualidade do serviço e atendimento</li>
              <li>• Evite informações pessoais ou ofensivas</li>
              <li>• Sua avaliação ajuda outros usuários a tomar decisões</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || rating === 0}
          >
            {isSubmitting ? (
              "Enviando..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Enviar Avaliação
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

