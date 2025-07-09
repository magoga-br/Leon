# Leon - Sistema de Configurações

Este documento descreve todas as configurações disponíveis no Leon e como elas funcionam.

## 📱 Configurações Implementadas

### 🎨 Aparência

#### Temas Disponíveis

**Temas Neutros:**

- **Light**: Tema claro neutro usando apenas preto, branco e tons de cinza
- **Dark**: Tema escuro neutro usando apenas preto, branco e tons de cinza

**Temas Coloridos:**

- **Dark Blue**: Tema escuro com acentos em azul
- **Light Purple**: Tema claro com acentos em roxo
- **Dark Green**: Tema escuro com acentos em verde
- **Light Orange**: Tema claro com acentos em laranja
- **Dark Red**: Tema escuro com acentos em vermelho
- **Light Teal**: Tema claro com acentos em verde-azulado

**Outras Configurações:**

- **Tamanho da Fonte**: Ajuste o tamanho do texto (Pequeno, Médio, Grande, Extra Grande)
- **Modo Alto Contraste**: Melhora a visibilidade com cores mais contrastantes
- **Reduzir Movimento**: Minimiza animações para usuários sensíveis ao movimento

> **Nota sobre Temas Neutros**: Os temas "Light" e "Dark" foram especificamente projetados para serem completamente neutros, utilizando apenas escalas de cinza, preto e branco. Cores vibrantes foram removidas destes temas para proporcionar uma experiência visual mais sóbria e profissional.

### 🌍 Idioma e Região

- **Idioma**: Suporte para Inglês, Português e Espanhol
- **Formato de Data**: DD/MM/YYYY, MM/DD/YYYY ou YYYY-MM-DD

### 🔔 Notificações

- **Notificações do Navegador**: Permite notificações nativas do sistema
- **Notificações Sonoras**: Reproduz sons para alertas
- **Notificações de Chat**: Específicas para mensagens recebidas

### 🔒 Privacidade e Segurança

- **Auto-salvar Histórico de Chat**: Salva conversas automaticamente
- **Limpar Todos os Dados**: Remove todos os dados salvos e preferências

### ♿ Acessibilidade

- **Tamanho da Fonte**: Ajuste personalizado para melhor legibilidade
- **Modo Alto Contraste**: Para usuários com deficiências visuais
- **Reduzir Movimento**: Para usuários com sensibilidade a movimento

### ⚙️ Avançado

- **Modo Desenvolvedor**: Habilita ferramentas de debug e informações técnicas
- **Atualização Automática**: Verifica atualizações automaticamente
- **Restaurar Padrões**: Reseta todas as configurações

## 🛠️ Arquitetura Técnica

### Arquivos Principais

#### `js/settings.js`

- **SettingsManager**: Classe principal que gerencia todas as configurações
- **Funcionalidades**:
  - Carregamento e salvamento de configurações
  - Aplicação de configurações em tempo real
  - Validação de entrada
  - Notificações de sucesso/erro

#### `js/translations.js`

- **TranslationManager**: Sistema de internacionalização
- **Funcionalidades**:
  - Suporte a múltiplos idiomas
  - Atualização dinâmica de textos
  - Fallback para inglês
  - Eventos de mudança de idioma

#### `js/notifications.js`

- **NotificationManager**: Sistema de notificações
- **Funcionalidades**:
  - Notificações nativas do navegador
  - Notificações in-app (toast)
  - Reprodução de sons
  - Gestão de permissões

#### `css/settings.css`

- Estilos para a página de configurações
- Suporte a temas claro/escuro
- Recursos de acessibilidade
- Animações e transições

### Estrutura de Dados

```javascript
// Configurações padrão
defaultSettings = {
  theme: "light",
  language: "en",
  dateFormat: "dd/mm/yyyy",
  browserNotifications: false,
  soundNotifications: true,
  chatNotifications: true,
  autoSaveChat: true,
  fontSize: "medium",
  highContrastMode: false,
  reduceMotion: false,
  developerMode: false,
  autoUpdate: true,
};
```

## 📋 Como Usar

### Para Usuários

1. **Acesse as Configurações**: Clique no ícone de engrenagem na sidebar
2. **Navegue pelas Seções**: Use as diferentes seções organizadas por categoria
3. **Ajuste as Configurações**: Modifique as opções conforme sua preferência
4. **Salvamento Automático**: Todas as mudanças são salvas automaticamente

### Para Desenvolvedores

#### Adicionando Nova Configuração

1. **Adicione ao `defaultSettings`**:

```javascript
defaultSettings.newSetting = "defaultValue";
```

2. **Crie o controle HTML**:

```html
<div class="setting-item">
  <div class="setting-info">
    <h4 data-translate="settings.newsetting">New Setting</h4>
    <p data-translate="settings.newsetting.desc">Description</p>
  </div>
  <div class="setting-control">
    <input type="checkbox" id="newSetting" />
  </div>
</div>
```

3. **Adicione as traduções**:

```javascript
// Em translations.js
'settings.newsetting': 'New Setting',
'settings.newsetting.desc': 'Description of the new setting'
```

4. **Implemente a lógica**:

```javascript
// Em settings.js na função bindEvents()
const newSettingToggle = document.getElementById("newSetting");
if (newSettingToggle) {
  newSettingToggle.addEventListener("change", (e) => {
    this.updateSetting("newSetting", e.target.checked);
  });
}
```

5. **Adicione aplicação da configuração**:

```javascript
// Em settings.js na função applySettings()
this.applyNewSetting(this.settings.newSetting);
```

## 🎯 Recursos Especiais

### Sistema de Temas

- Suporte automático a tema claro/escuro
- Variáveis CSS dinâmicas
- Persistência de preferência

### Acessibilidade

- Conformidade com WCAG 2.1
- Suporte a leitores de tela
- Navegação por teclado
- Modo alto contraste
- Redução de movimento

### Responsividade

- Layout adaptativo para mobile
- Controles otimizados para touch
- Textos escaláveis

### Performance

- Carregamento lazy de configurações
- Debounce em mudanças frequentes
- Otimização de reflows

## 🔧 Configurações de Desenvolvimento

### Modo Desenvolvedor

Quando ativado, adiciona:

- Painel de informações de debug
- Indicador visual "DEV MODE"
- Logs detalhados no console
- Métricas de performance

### Estrutura de Eventos

O sistema emite eventos customizados:

- `settingsChanged`: Quando uma configuração muda
- `languageChanged`: Quando o idioma muda
- `themeChanged`: Quando o tema muda

### LocalStorage

Todas as configurações são persistidas em:

- `leonSettings`: Configurações principais
- `leonNotificationSettings`: Configurações de notificação
- `theme`: Tema atual
- `language`: Idioma atual

## 🚀 Próximas Funcionalidades

### Planejadas

- [ ] Tema automático baseado no sistema
- [ ] Exportação/importação de configurações
- [ ] Configurações por perfil de usuário
- [ ] Integração com sincronização na nuvem
- [ ] Mais idiomas (Francês, Alemão, Italiano)
- [ ] Configurações de teclado personalizadas
- [ ] Modo offline avançado

### Em Desenvolvimento

- [ ] Sistema de plugins
- [ ] Configurações de performance
- [ ] Backup automático de configurações

## 📖 Documentação da API

### SettingsManager

#### Métodos Públicos

- `getSettings()`: Retorna todas as configurações
- `getSetting(key)`: Retorna uma configuração específica
- `updateSetting(key, value)`: Atualiza uma configuração
- `resetToDefaults()`: Reseta para padrões
- `exportSettings()`: Exporta configurações
- `importSettings(file)`: Importa configurações

### TranslationManager

#### Métodos Públicos

- `setLanguage(language)`: Define o idioma
- `getText(key)`: Obtém texto traduzido
- `getCurrentLanguage()`: Retorna idioma atual

### NotificationManager

#### Métodos Públicos

- `showNotification(title, options)`: Exibe notificação
- `showInAppNotification(title, message, type)`: Notificação in-app
- `requestPermission()`: Solicita permissão
- `clearAll()`: Limpa todas as notificações

## 🐛 Solução de Problemas

### Configurações não salvam

1. Verifique se localStorage está habilitado
2. Confirme que não há erros no console
3. Teste em modo anônimo

### Traduções não funcionam

1. Verifique se `translations.js` está carregado
2. Confirme os atributos `data-translate`
3. Teste mudança manual de idioma

### Notificações não aparecem

1. Verifique permissões do navegador
2. Confirme configurações de notificação
3. Teste em diferentes navegadores

### Tema não aplica

1. Verifique se `theme.js` está carregado
2. Confirme variáveis CSS
3. Teste limpeza de cache

## 📄 Licença

Este sistema de configurações faz parte do projeto Leon e segue a mesma licença do projeto principal.
