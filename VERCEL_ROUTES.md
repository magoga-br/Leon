# Leon - Configuração de Rotas Vercel

Este documento explica como as rotas estão configuradas no Leon para URLs limpas no deploy da Vercel.

## 📍 URLs Disponíveis

### URLs Principais

- `myleon.vercel.app/` → Página inicial
- `myleon.vercel.app/settings` → Configurações
- `myleon.vercel.app/chat` → Chat
- `myleon.vercel.app/music` → Música
- `myleon.vercel.app/games` → Jogos
- `myleon.vercel.app/profile` → Perfil
- `myleon.vercel.app/profile/edit` → Editar perfil

### URLs de Assets

- `myleon.vercel.app/css/*` → Arquivos CSS
- `myleon.vercel.app/js/*` → Arquivos JavaScript
- `myleon.vercel.app/fonts/*` → Fontes
- `myleon.vercel.app/assets/*` → Imagens e outros assets

## ⚙️ Configuração Técnica

### Arquivo `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/(css|fonts|js|assets)(/.*)?",
      "destination": "/$1$2"
    },
    {
      "source": "/settings",
      "destination": "/pages/settings/settings.html"
    },
    {
      "source": "/chat",
      "destination": "/pages/chat/chat.html"
    },
    {
      "source": "/music",
      "destination": "/pages/music/music.html"
    },
    {
      "source": "/games",
      "destination": "/pages/games/games.html"
    },
    {
      "source": "/profile",
      "destination": "/pages/profile/profile.html"
    },
    {
      "source": "/profile/edit",
      "destination": "/pages/profile/edit.html"
    },
    {
      "source": "/:page/:subpage",
      "destination": "/pages/:page/:subpage.html"
    },
    {
      "source": "/:page",
      "destination": "/pages/:page/:page.html"
    },
    {
      "source": "/",
      "destination": "/index.html"
    }
  ]
}
```

### Como Funciona

1. **Assets Estáticos**: A primeira regra preserva o acesso direto aos arquivos CSS, JS, fontes e assets.

2. **Rotas Específicas**: Cada página principal tem uma rota específica mapeada para seu arquivo HTML correspondente.

3. **Rotas Dinâmicas**: As duas últimas regras dinâmicas (`/:page/:subpage` e `/:page`) funcionam como fallback para páginas que não têm rotas específicas.

4. **Página Inicial**: A rota `/` mapeia diretamente para `index.html`.

### Ordem de Prioridade

A Vercel processa as regras de rewrite na ordem que aparecem no arquivo. Por isso:

1. **Assets** são verificados primeiro
2. **Rotas específicas** têm prioridade sobre as dinâmicas
3. **Rotas dinâmicas** servem como fallback
4. **Página inicial** é a última opção

## 🔗 Links Internos Atualizados

Todos os links internos da aplicação foram atualizados para usar as URLs limpas:

### Sidebar (`components/sidebar.html`)

- Home: `/`
- Music: `/music`
- Games: `/games`
- Chat: `/chat`
- Profile: `/profile`
- Settings: `/settings`

### Página Inicial (`index.html`)

- Cards de categoria usam URLs limpas

### Páginas de Perfil

- Link para edição: `/profile/edit`
- Link de volta ao perfil: `/profile`
- Links para outras seções: `/music`, `/games`, `/chat`

## 🚀 Deploy na Vercel

Para fazer o deploy:

1. Conecte o repositório à Vercel
2. Configure o projeto como um site estático
3. A Vercel automaticamente lerá o arquivo `vercel.json`
4. As rotas limpas funcionarão imediatamente

### Exemplo de Comandos para Deploy Manual

```bash
# Instalar Vercel CLI (se necessário)
npm i -g vercel

# Deploy
vercel

# Deploy para produção
vercel --prod
```

## ✅ Benefícios das URLs Limpas

1. **SEO**: URLs mais amigáveis para motores de busca
2. **UX**: URLs mais fáceis de lembrar e compartilhar
3. **Profissional**: Aparência mais limpa e profissional
4. **Flexibilidade**: Facilita mudanças na estrutura de arquivos sem quebrar links
5. **Branding**: URLs personalizáveis que refletem a marca

## 🔍 Teste Local

Para testar as rotas localmente com o mesmo comportamento da Vercel:

```bash
# Usar Vercel CLI para simular o ambiente
vercel dev

# Ou usar um servidor simples (sem rewrite rules)
python -m http.server 8080
```

> **Nota**: O servidor Python simples não processará as regras de rewrite, então você ainda verá URLs completas. Use `vercel dev` para testar o comportamento exato de produção.
