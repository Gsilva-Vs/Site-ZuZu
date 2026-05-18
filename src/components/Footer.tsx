import { Instagram, Mail } from 'lucide-react';

const links = [
  { label: 'Início', href: '#inicio' },
  { label: 'Receitas', href: '#receitas' },
  { label: 'Conceitos', href: '#conceitos' },
  { label: 'Guia Zero', href: '#guia' },
  { label: 'Dicas', href: '#dicas' },
];

function Footer() {
  return (
    <footer className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-lg border border-white/70 bg-white/60 p-6 shadow-glass backdrop-blur-xl md:p-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo-icon.svg"
                alt=""
                className="h-12 w-12 rounded-lg object-contain"
              />
              <div>
                <p className="font-display text-2xl font-black text-stone-950">Zuzu Zero</p>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-zuzu-olive">comida leve, sabor real</p>
              </div>
            </div>
            <p className="mt-5 max-w-xl leading-8 text-stone-650">
              Receitas e conteúdo sobre alimentação sem açúcar adicionado.
            </p>
          </div>

          <div>
            <h3 className="font-black text-stone-950">Navegação</h3>
            <div className="mt-4 grid gap-2">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="font-bold text-stone-600 hover:text-zuzu-olive">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black text-stone-950">Contato</h3>
            <div className="mt-4 flex gap-2">
              {[
                { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/projetozuzuzero06/' },
                { label: 'E-mail', icon: Mail, href: '#dicas' },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'Instagram' ? '_blank' : undefined}
                    rel={item.label === 'Instagram' ? 'noreferrer noopener' : undefined}
                    aria-label={item.label}
                    className="grid h-11 w-11 place-items-center rounded-lg border border-white/70 bg-white/70 text-stone-700 transition hover:bg-zuzu-yellow hover:text-stone-950"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <p className="mt-5 text-sm leading-6 text-stone-500">
              Conteúdo educativo. Para orientações clínicas, procure nutricionista ou médico.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-stone-200/70 pt-5 text-sm font-semibold text-stone-500">
          © 2026 Zuzu Zero. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
