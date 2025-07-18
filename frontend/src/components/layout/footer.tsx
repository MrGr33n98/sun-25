import Link from "next/link";
import { Sun, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">InsideSolar</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              O maior marketplace de energia solar do Brasil. Conectamos consumidores 
              às melhores empresas de energia solar, facilitando a transição para 
              energia limpa e renovável.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/empresas" className="text-gray-300 hover:text-white transition-colors">
                  Empresas
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="text-gray-300 hover:text-white transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/projetos" className="text-gray-300 hover:text-white transition-colors">
                  Projetos
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-gray-300 hover:text-white transition-colors">
                  Como Funciona
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ajuda" className="text-gray-300 hover:text-white transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-300 hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-gray-300 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 InsideSolar. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Desenvolvido com energia solar ☀️
          </p>
        </div>
      </div>
    </footer>
  );
}

