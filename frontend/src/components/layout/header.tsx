"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, Sun } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Sun className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">InsideSolar</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/empresas" className="text-gray-700 hover:text-orange-600 transition-colors">
              Empresas
            </Link>
            <Link href="/mapa" className="text-gray-700 hover:text-orange-600 transition-colors">
              Mapa
            </Link>
            <Link href="/servicos" className="text-gray-700 hover:text-orange-600 transition-colors">
              Serviços
            </Link>
            <Link href="/projetos" className="text-gray-700 hover:text-orange-600 transition-colors">
              Projetos
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-orange-600 transition-colors">
              Sobre
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar empresas de energia solar..."
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">
              Entrar
            </Button>
            <Button>
              Cadastrar Empresa
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar empresas..."
                  className="pl-10 pr-4"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/empresas"
                  className="text-gray-700 hover:text-orange-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Empresas
                </Link>
                <Link
                  href="/mapa"
                  className="text-gray-700 hover:text-orange-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mapa
                </Link>
                <Link
                  href="/servicos"
                  className="text-gray-700 hover:text-orange-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Serviços
                </Link>
                <Link
                  href="/projetos"
                  className="text-gray-700 hover:text-orange-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projetos
                </Link>
                <Link
                  href="/sobre"
                  className="text-gray-700 hover:text-orange-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sobre
                </Link>
              </nav>

              {/* Mobile Actions */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full">
                  Entrar
                </Button>
                <Button className="w-full">
                  Cadastrar Empresa
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

