<p align="center">
  <img src="assets/logo.png" alt="Logo HORIZONTE JIU JITSU" width="300">
</p>

# 🥋 HORIZONTE JIU JITSU • TIMER

Aplicativo de cronômetro interativo para treinos de Jiu-Jitsu, adaptado para **TV**, **desktop**, **mobile** e **tablet**, com **sons**, **temas**, **modo foco**, **modo infinito**, **presets rápidos**, e **PWA** (instalável). Desenvolvido por Vinicius Simões para a equipe HORIZONTE JIU JITSU (João Pessoa/PB, liderada pelo Professor Alexandre Wanderley), para a honra e glória de Nosso Senhor Jesus Cristo.

---

## 🎯 Objetivo
Cronômetro claro, grande e responsivo para treinos, com:
- Contagem regressiva de **rounds** e **intervalos** (incluindo modo infinito com ∞);
- **Preparação** (5s/10s) com piscar laranja e beeps;
- Aviso nos **10s finais do descanso** (piscar amarelo, beeps, "PREPARAR!");
- **Sons** (beep, fight, gong, appintroboom, padrão ON) e **temas** selecionáveis;
- **Modo foco** com fullscreen automático e status (rounds/estágio) acima do tempo;
- **Presets rápidos** (Iniciante: 10s prep, 3x3:00, 60s rest; Avançado: 10s prep, 3x5:00, 60s rest);
- **Persistência** de configurações (localStorage);
- PWA instalável, com suporte offline.

---

## 🧭 Como usar
1. **Defina**: preparação, tempo do round, rounds (1-5 ou ∞), intervalo. Ou use **presets** (Iniciante/Avançado).
2. Clique em **DEFINIR** ou **preset** para aplicar.
3. Clique em **INICIAR** (depois **PAUSAR/RETOMAR**). Em mobile, swipe direita pausa, esquerda para.
4. **PARAR** encerra (com confirmação).
5. **RESET** (em idle) restaura padrão (1 round, 5:00, sem prep, tema Horizon, sons ON).
6. **Tema** e **Sons**: seletores no topo (desktop/TV, lado a lado) ou após controles (mobile/tablet).

---

## 📲 Manual de instalação do PWA
Instale como app nativo, funcionando offline após primeiro acesso.

### 📱 Android (Chrome/Edge)
1. Acesse o site.
2. Toque em **⋮ (menu)** > **Adicionar à tela inicial**.
3. Confirme com **Adicionar**.
4. Ícone **HORIZONTE TIMER** aparece na tela inicial.

### 🍎 iPhone/iPad (Safari)
1. Abra no **Safari**.
2. Toque no **ícone de compartilhamento** (⬆️).
3. Selecione **Adicionar à Tela de Início**.
4. Confirme e abra pelo ícone.

### 💻 Computador (Chrome/Edge/Brave)
1. Clique no ícone **Instalar** na barra de endereços (ou botão **INSTALAR APP**).
2. Confirme para abrir em janela própria.

### 📺 Smart TV
- Acesse no navegador, adicione aos favoritos ou instale como PWA.
- Use em **tela cheia** para treinos.

> 💡 **Dica**: Para atualizar, remova e reinstale o PWA.

---

## 🧩 Controles
- **INICIAR / PAUSAR / RETOMAR**
- **PARAR** (com confirmação)
- **RESET** (em idle, com confirmação)
- **TESTAR SOM**
- **PRESETS**: Iniciante (10s prep, 3x3:00, 60s rest); Avançado (10s prep, 3x5:00, 60s rest)

**Atalhos:**
- **Enter / Play-Pause**: Iniciar/pausar/retomar
- **Esc / Backspace**: Parar (com confirmação)
- **0**: Alterna sons ON/OFF
- **1–5**: Define rounds
- **Swipe (mobile)**: Direita (pausar), esquerda (parar)

---

## 📱 PWA
- Instalável via **Adicionar à tela inicial** ou botão **INSTALAR APP**.
- Ícones: `favicon.ico`, `icon-256.png`, `icon-192.png`, `icon-512.png`.
- `manifest.json` + `service-worker.js` para offline.
- Cache atualizado por versão.

---

## 🧾 Testes e Ferramentas
- **Jest**: Testes unitários para funções como `enterPhase`, `render`, `syncCfgFromSelects`. Setup: `npm install --save-dev jest`, crie `/tests/timer.test.js`. Exemplo:
  ```javascript
  test('enterPhase prep sets remain correctly', () => {
    enterPhase('prep');
    expect(remain).toBe(cfg.prepSeconds);
  });
  ```
  Rodar: `npm test`. Cobertura >80%.
- **Lighthouse**: Use Chrome DevTools > Lighthouse. Mire 100/100:
  - **Performance**: Minifique JS/CSS, comprima imagens (ex.: TinyPNG).
  - **Acessibilidade**: Verifique ARIA, contrastes (WCAG 2.1 AA).
  - **Best Practices**: HTTPS, sem console errors.
  - **PWA**: Manifest válido, service-worker robusto.

---

## 🧾 Histórico de versões
- **v2.0.2**
  - 📐 **Tela Configuração PC**: Seletores de configuração (PREPARAÇÃO, TEMPO, ROUNDS, INTERVALO, DEFINIR) revertidos para horizontal, sem rolagem.
  - 📐 **Seletores Temas/Sons**: Corrigido para ficarem lado a lado no PC (gap 12px).
  - 🖼️ **Modo Foco PC**: Logo menor à direita dos botões (PAUSAR/RETOMAR, PARAR), botões visíveis sem corte.
  - 🔊 **Som Padrão**: Definido como ON na inicialização e reset.
  - 🔒 Integridade mantida: Splash, timer, presets, modo infinito, fullscreen, acessibilidade, PWA.

- **v2.0.1**
  - 🗑️ **Removido**: Funções e botões de exportar/importar configs.
  - ⏱️ **Display no foco**: Status (rounds/estágio) exibido acima do tempo.
  - ✅ **Confirmado**: Últimos 10s de descanso piscam amarelo, tocam beeps, mostram "PREPARAR!".
  - 🟠 **Preparação**: Display pisca laranja com beeps por segundo.
  - 🛠️ **Presets**: Iniciante (10s prep, 3x3:00, 60s rest); Avançado (10s prep, 3x5:00, 60s rest).
  - 📐 **Layout PC**: Seletores sons/temas lado a lado; botões presets lado a lado abaixo seletores.
  - 🖼️ **Foco PC**: Logo sem invadir display (gap aumentado); números maiores (font-size ajustado).
  - 🌐 **Favicon**: Adicionado `<link rel="shortcut icon">` para compatibilidade.
  - 🖼️ **Splash**: Finaliza em 5s com som `appintroboom.mp3`, sem flash inicial do cronômetro.
  - ♾️ **Modo Infinito**: Rounds ilimitados com ∞.
  - 📺 **Fullscreen**: Automático no modo foco.
  - 📱 **Swipe**: Direita pausa, esquerda para (mobile).
  - ♿ **Acessibilidade**: `role="timer"`, `aria-valuenow`, vibração fallback.
  - ⏱️ **Precisão**: `performance.now()` no timer.
  - 🧹 **Simplificação**: Unificados selects, removida detecção UA, CSS consolidado.
  - 📲 **PWA**: Prompt de instalação customizado.
  - 🔍 **Lighthouse/Jest**: Suporte a testes/auditoria.
  - 🔒 Integridade total preservada.


- **v2.0.0**
  - ♾️ **Modo Infinito**: Rounds ilimitados com ∞.
  - 📺 **Fullscreen**: Automático no modo foco.
  - 🛠️ **Presets**: Iniciante (3min, 3 rounds), Avançado (5min, 5 rounds).
  - 📤 **Export/Import**: Configs via JSON.
  - 📱 **Swipe**: Direita pausa, esquerda para (mobile).
  - ♿ **Acessibilidade**: `role="timer"`, `aria-valuenow`, vibração fallback.
  - ⏱️ **Precisão**: `performance.now()` no timer.
  - 🧹 **Simplificação**: Unificados selects, removida detecção UA, CSS consolidado.
  - 📲 **PWA**: Prompt de instalação customizado.
  - 🔍 **Lighthouse/Jest**: Suporte a testes/auditoria.
  - 🔒 Integridade total preservada.

- **v1.9.5.fix**
  - 🎵 Adicionado som **appintroboom.mp3** na tela inicial (splash de 5s).
  - 🚫 Bloqueio de rolagem durante o splash, impedindo visualização da tela de configuração antes do carregamento.
  - 🖥️ Ajuste visual do **display no modo foco** (PC/TV), com proporções fixas e maior visibilidade.
  - 📱 Layout mobile aprimorado:
    - Título dividido em **duas linhas**, centralizado e em **CAIXA ALTA + negrito**.
    - Logos superior e inferior com **sombreamento branco leve**.
    - Botões empilhados e centralizados no modo foco.
    - Ocultação da data/hora em telas pequenas.
  - 🕓 Implementado **Wake Lock API**, mantendo a tela do dispositivo ligada durante a execução do cronômetro.
  - 🧩 `manifest.json` atualizado com `"version": "1.9.5.fix"` e descrição aprimorada.
  - 🧱 `service-worker.js` atualizado com novo `CACHE_NAME` e inclusão de `appintroboom.mp3` no cache.
  - 📅 Rodapé atualizado com data estática “18/10/2025” e nome do desenvolvedor.
  - 🔒 Mantida a integridade completa da versão **v1.9.3** como base estrutural.

- **v1.9.4**
  - 🔊 Adicionado som `appintroboom.mp3` na tela inicial (splash).  
  - 🧩 Ajuste visual do modo foco (PC/TV): display ampliado e espaçamento refinado.  
  - ⚙️ Atualização completa dos arquivos (`index`, `styles`, `script`, `manifest`, `service-worker`).  

- **v1.9.3 (mobileFocusFix)**
  - 📱 **Foco (mobile/tablet):** visíveis só o **display** + **PAUSAR/RETOMAR** e **PARAR** (em coluna); **logo abaixo** do display; sem sobreposição; sem overflow lateral.
  - 🖥️ **Foco (PC/TV):** visíveis **Hora**, **display** maior e **estático**, **PAUSAR/RETOMAR** e **PARAR** (lado a lado) e **logo à direita** alinhada ao display.
  - ⏱️ **Display fixo no foco:** largura/altura **clamp** estáveis — o cronômetro não “pula” quando mudam os dígitos.
  - 🔒 Integridade total preservada; sem alterações de lógica/sons/temas/PWA.

- **v1.9.2**
  - 🧭 **Modo foco (PC/TV):** visíveis apenas **Hora**, **display do cronômetro**, **PAUSAR/RETOMAR** e **PARAR** (lado a lado) e **logo à direita**, alinhada ao display.
  - 📱 **Modo foco (mobile/tablet):** os dois botões ficam **em coluna** (vertical).
  - 🖥️ **Display estático no foco:** largura/altura **fixas responsivas** (sem “pular” quando o número muda); ocupa o máximo sem ultrapassar as margens.
  - 🏷️ **Título** centralizado em todas as telas.
  - 🔒 Integridade total das versões anteriores preservada.

- **v1.9.1**
  - 🧭 Correção do **modo foco**:
    - Foco agora é aplicado também ao **retomar** (resume).
    - Oculta áreas de configuração e centraliza cronômetro + botões.
    - Em mobile/tablet: layout 100% vertical, sem overflow lateral.
  - 🖼️ **Sombreamento branco** reativado nas logos do mobile (topo e rodapé).
  - 🧱 Título centralizado no mobile e margens ajustadas.
  - 🔒 Integridade total das versões anteriores preservada.

- **v1.9.0_m1**
  - 📲 Manifest atualizado:
    - `description` descrevendo o app (não a versão).
    - `"orientation": "any"` (mais adaptativo).
    - Remoção de campos não-padrão (compatibilidade máxima).
  - 📱 Layout totalmente **responsivo** (mobile/tablet/desktop/TV) sem overflow lateral.
  - 🖼️ **Logo no topo** e **no rodapé** (mobile/tablet).
  - 🧭 Título em **duas linhas**, centralizado no mobile/tablet.
  - 🧱 **Splash 100%** da tela (sem rolagem, sem “vazar” a tela inicial).
  - 🔒 Integridade total preservada.

- **v1.9.0**
  - Mesmo conjunto de melhorias de responsividade e splash; base visual consolidada.

- **v1.8.7**
  - 🧭 Preparação sempre **antes do 1º round** (inclusive round único).
  - 🔒 Flag para não repetir preparação entre rounds.
  - 🧩 Sem mudanças visuais/PWA.

- **v1.8.6_prepFix**
  - 🧭 Preparação respeitada no round simples.
  - 📝 Rótulos dos seletores em **CAIXA ALTA + negrito**.
  - 🔘 **DEFINIR** do tamanho dos seletores.
  - 🖼️ Garantia de ícones (favicon/256/apple-touch).

- **v1.8.5_prepUX**
  - Pequenos ajustes de UX da preparação e revisão de sinais sonoros.

- **v1.8.4_focusUX**
  - 🖲️ Feedback de foco/hover no modo foco.
  - ↔️ Espaçamento maior entre botões.

- **v1.8.3_fix**
  - 🔔 Preparação correta após reset; **confirmação** de RESET.
  - 🪪 PWA com `short_name` “HORIZONTE TIMER”.

- **v1.8**
  - 🧱 **Modo foco**: cronômetro ampliado, botões visíveis e logo no canto.
  - ✅ **DEFINIR** verde, padronizado; transições em fade.

- **v1.7.2**
  - 🛠️ Correções de estado/cor no tema **Cores por estado**.

- **v1.7.1**
  - 🖼️ Splash com logo por **5s**.
  - 🟡 Descanso: **10s finais piscando** em amarelo.
  - 🕒 Data e hora **+50%**; README com créditos/histórico.

- **v1.7**
  - ⬆️ Rótulos **+50%**, selects **+30%**.
  - 🧹 Limpar preferências.

- **v1.6**
  - ➕ **45s** nos segundos do round.
  - 💾 Persistência de configurações.

- **v1.5.1**
  - 🐞 `start()` em idle; `lastTick` zerado em `start()/resume()`.
  - 🔔 fight no início; beep 3s finais; gong no fim.
  - 🔁 Iniciar ↔ Pausar ↔ Retomar.
  - 🧱 Ajustes de logo/layout sem sobreposição.

- **v1.5**
  - 🧭 Centralização do cronômetro.
  - 🟥 **PARAR** (confirmação); **RESET** apenas em idle.
  - 🔒 **DEFINIR** desativado durante execução; selects no lugar de inputs.
  - 🎨 Tema “Estados”; descanso em cinza; seg. do round 0/15/30.

- **v1.4.1**
  - ↘️ Logo à direita do cronômetro.
  - 🛠️ Início pela **Preparação** (se houver) após reset/fim.
  - 🪲 Correções de fase/idle e exibição inicial.

- **v1.4**
  - 🧱 Base com layout, temas, sons e exibição de data/hora.
  - 🕹️ Controles principais e estrutura do app.

- **v1.3**
  - 🔊 Inclusão dos sons e primeiros avisos por fase.

- **v1.2**
  - 🎨 Primeiros temas visuais; layout aprimorado.

- **v1.1**
  - ⏱️ Cronômetro estável com contagem regressiva básica.

- **v1.0**
  - 🌱 Primeira versão funcional do cronômetro.

---

## 📁 Estrutura de pastas
```
/index.html
/styles.css
/script.js
/manifest.json
/service-worker.js
/favicon.ico
/icon-256.png
/apple-touch-icon.png
/assets
  /icons
    icon-192.png
    icon-512.png
  logo.png
  beep.mp3
  click.mp3
  fight.mp3
  gong.mp3
```