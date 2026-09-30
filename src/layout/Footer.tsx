import { Camera, Heart, Mail, Phone, Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-transparent to-pink-100/70 pt-16 pb-8 border-t border-pink-200/50 mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Coluna 1: Marca & Sobre */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="font-handwritten text-3xl font-bold text-[#FF6987] flex items-center gap-1">
              AnaCraft
              <Sparkles className="w-5 h-5 text-[#FF6987]" />
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed font-sans">
              Transformando afeto em mimos feitos à mão. Cada detalhe é pensado
              para espalhar amor e histórias únicas.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="font-handwritten text-xl font-bold text-gray-800 mb-3">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {/* Início / Home */}
              <li>
                <button
                  onClick={() => {
                    if (window.location.pathname !== "/") {
                      window.location.href = "/";
                      return;
                    }
                    if (window.location.hash) {
                      window.history.pushState(
                        "",
                        document.title,
                        window.location.pathname,
                      );
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-[#FF6987] transition-colors cursor-pointer"
                >
                 Home
                </button>
              </li>

              {/* Produtos (Seção da Home) */}
              <li>
                <button
                  onClick={() => {
                    if (window.location.pathname !== "/") {
                      window.location.href = "/#produtos";
                      return;
                    }
                    if (window.location.hash) {
                      window.history.pushState(
                        "",
                        document.title,
                        window.location.pathname,
                      );
                    }
                    document
                      .getElementById("produtos")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-[#FF6987] transition-colors cursor-pointer"
                >
                  Produtos
                </button>
              </li>

              {/* Categorias (Seção da Home) */}
              <li>
                <button
                  onClick={() => {
                    if (window.location.pathname !== "/") {
                      window.location.href = "/#categorias";
                      return;
                    }
                    if (window.location.hash) {
                      window.history.pushState(
                        "",
                        document.title,
                        window.location.pathname,
                      );
                    }
                    document
                      .getElementById("categorias")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-[#FF6987] transition-colors cursor-pointer"
                >
                  Categorias
                </button>
              </li>

              {/* Catálogo Completo (Página /catalogo) */}
              <li>
                <button
                  onClick={() => {
                    if (window.location.pathname !== "/catalogo") {
                      window.location.href = "/catalogo";
                      return;
                    }
                    if (window.location.search || window.location.hash) {
                      window.history.pushState(
                        "",
                        document.title,
                        window.location.pathname,
                      );
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-[#FF6987] transition-colors cursor-pointer"
                >
                  Catálogo
                </button>
              </li>

              {/* Sobre Nós (Página /sobre) */}
              <li>
                <button
                  onClick={() => {
                    if (window.location.pathname !== "/sobre") {
                      window.location.href = "/sobre";
                      return;
                    }
                    if (window.location.hash) {
                      window.history.pushState(
                        "",
                        document.title,
                        window.location.pathname,
                      );
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-[#FF6987] transition-colors cursor-pointer"
                >
                  Sobre Nós
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Atendimento */}
          <div>
            <h4 className="font-handwritten text-xl font-bold text-gray-800 mb-3">
              Atendimento
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF6987]" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF6987]" />
                <span>contato@anacraft.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#FF6987]" />
                <span>@anacraft.atelie</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Mensagem fofa */}
          <div className="bg-white/80 p-5 rounded-3xl border border-pink-200/60 shadow-sm flex flex-col justify-center">
            <span className="font-handwritten text-lg font-bold text-[#FF6987] mb-1">
              Feito sob medida!
            </span>
            <p className="text-xs text-gray-600">
              Precisa de uma lembrancinha corporativa ou festa personalizada?
              Fala com a gente no WhatsApp!
            </p>
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className="pt-8 border-t border-pink-200/50 text-center flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            © {new Date().getFullYear()} AnaCraft Ateliê Criativo. Todos os
            direitos reservados.
          </p>

          <p className="flex items-center gap-1.5 font-sans text-xs text-gray-600">
            Desenvolvido com{" "}
            <Heart className="w-3.5 h-3.5 text-[#FF6987] fill-current" /> por{" "}
            <a
              href="https://github.com/CauaRodolpho"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gray-800 hover:text-[#FF6987] underline decoration-pink-300 underline-offset-2 transition-colors duration-200"
            >
              Cauã Rodolpho
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
