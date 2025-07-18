"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator, Send, MapPin, Home, Zap } from "lucide-react";

interface QuoteFormProps {
  companyId: string;
  companyName: string;
  onSubmit?: (quote: any) => void;
}

export function QuoteForm({ companyId, companyName, onSubmit }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    propertyType: "residential",
    roofType: "",
    monthlyBill: "",
    installationType: "grid-tied",
    description: "",
    budget: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }

    setIsSubmitting(true);

    const quote = {
      companyId,
      ...formData,
      userId: "user-123", // In real app, get from auth context
    };

    try {
      // In real app, make API call here
      console.log("Submitting quote request:", quote);
      
      if (onSubmit) {
        onSubmit(quote);
      }

      alert("Solicitação de orçamento enviada com sucesso! A empresa entrará em contato em breve.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        propertyType: "residential",
        roofType: "",
        monthlyBill: "",
        installationType: "grid-tied",
        description: "",
        budget: ""
      });
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("Erro ao enviar solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Calculator className="h-5 w-5 mr-2" />
          Solicitar Orçamento - {companyName}
        </CardTitle>
        <CardDescription>
          Preencha os dados abaixo para receber um orçamento personalizado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Informações Pessoais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone *
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Informações do Imóvel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço
                </label>
                <Input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Rua, número, bairro"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Sua cidade"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Selecione o estado</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="PR">Paraná</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="BA">Bahia</option>
                  <option value="GO">Goiás</option>
                  <option value="PE">Pernambuco</option>
                  <option value="CE">Ceará</option>
                </select>
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                  CEP
                </label>
                <Input
                  id="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  placeholder="00000-000"
                />
              </div>
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Imóvel
                </label>
                <select
                  id="propertyType"
                  value={formData.propertyType}
                  onChange={(e) => handleInputChange("propertyType", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="residential">Residencial</option>
                  <option value="commercial">Comercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="rural">Rural</option>
                </select>
              </div>
            </div>
          </div>

          {/* Energy Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Informações Energéticas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="monthlyBill" className="block text-sm font-medium text-gray-700 mb-2">
                  Valor da Conta de Luz (R$)
                </label>
                <Input
                  id="monthlyBill"
                  type="number"
                  value={formData.monthlyBill}
                  onChange={(e) => handleInputChange("monthlyBill", e.target.value)}
                  placeholder="Ex: 250"
                />
              </div>
              <div>
                <label htmlFor="roofType" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Telhado
                </label>
                <select
                  id="roofType"
                  value={formData.roofType}
                  onChange={(e) => handleInputChange("roofType", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="ceramic">Cerâmico</option>
                  <option value="concrete">Concreto</option>
                  <option value="metal">Metálico</option>
                  <option value="fiber-cement">Fibrocimento</option>
                  <option value="other">Outro</option>
                </select>
              </div>
              <div>
                <label htmlFor="installationType" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Instalação
                </label>
                <select
                  id="installationType"
                  value={formData.installationType}
                  onChange={(e) => handleInputChange("installationType", e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="grid-tied">Conectado à Rede (On-Grid)</option>
                  <option value="off-grid">Isolado (Off-Grid)</option>
                  <option value="hybrid">Híbrido</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Orçamento Estimado (R$)
                </label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  placeholder="Ex: 25000"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Informações Adicionais
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              placeholder="Descreva detalhes específicos do seu projeto, urgência, preferências ou dúvidas..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/500 caracteres
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Proteção de Dados
            </h4>
            <p className="text-xs text-blue-800">
              Seus dados serão compartilhados apenas com a empresa selecionada para elaboração do orçamento. 
              Não vendemos ou compartilhamos informações pessoais com terceiros.
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Enviando..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Solicitar Orçamento Gratuito
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

