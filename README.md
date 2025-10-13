# 🥋 HORIZONTE JIU JITSU • TIMER

Aplicativo de cronômetro interativo para treinos de Jiu-Jitsu, adaptado para **TV**, **desktop**, **mobile** e **tablet**, com **sons**, **temas**, **modo foco** e **PWA** (instalável). O app foi desenvolvido por Vinicius Simões para a equipe da HORIZONTE JIU JITSU, com sede na cidade de João Pessoa/PB e liderada pelo Professor Alexandre Wanderley, para a honra e glória de Nosso Senhor Jesus Cristo.

---

## 🎯 Objetivo
Oferecer um cronômetro de treinos claro, grande e responsivo, com:
- Contagem regressiva de **rounds** e **intervalos**;
- **Preparação** antes do 1º round (5s/10s) e aviso nos **10s finais do descanso**;
- **Sons** distintos (beep, fight, gong) e **tema** selecionável;
- **Modo foco** para treinar com atenção no cronômetro;
- **Persistência** das configurações (salvas no dispositivo);
- PWA para “Adicionar à tela inicial”.

---

## 🧭 Como usar
1. **Defina**: preparação, tempo do round (min/seg), quantidade de rounds e intervalos.  
2. Clique em **DEFINIR** para aplicar as configurações.  
3. Clique em **INICIAR** (depois **PAUSAR/RETOMAR**).  
4. **PARAR** encerra o treino (com confirmação).  
5. **RESET** (apenas em idle) volta ao padrão salvo (1 round 5:00, sem preparação, tema Horizon, sons ON).  
6. **Tema** e **Sons**: seletores no topo (desktop/TV) e, no mobile/tablet, após os botões de controle.

---

## 📲 Manual de instalação do PWA (passo a passo simples)

Você pode **instalar o aplicativo** no seu celular, tablet ou computador como um app normal — depois de aberto ao menos uma vez, funciona até **offline**.

### 📱 Android (Google Chrome ou Edge)
1. Acesse o site do cronômetro.  
2. Toque em **⋮ (menu)** no canto superior direito.  
3. Selecione **“Adicionar à tela inicial”**.  
4. Confirme com **“Adicionar”**.  
5. O ícone **BJJ TIMER** aparecerá na tela inicial.

### 🍎 iPhone / iPad (Safari)
1. Abra o site no **Safari**.  
2. Toque no **ícone de compartilhamento** (quadrado com seta ↑).  
3. Toque em **“Adicionar à Tela de Início”**.  
4. Confirme em **“Adicionar”**.  
5. Abra pelo novo ícone para usar em modo de app.

### 💻 Computador (Windows / macOS)
1. Abra no **Chrome/Edge/Brave**.  
2. Clique no ícone **Instalar** (na barra de endereços).  
3. Confirme a instalação.  
4. O app abre em **janela própria**.

### 📺 Smart TV (Tizen / WebOS / Android TV)
- Acesse o endereço no navegador da TV.  
- Adicione aos favoritos ou instale como PWA se o navegador oferecer a opção.  
- Use em **tela cheia** durante o treino.

> 💡 Dica: se já instalou antes, para atualizar ícones/descrição, pode ser preciso **remover e reinstalar** o PWA.

---

## 🧩 Controles
- **INICIAR / PAUSAR / RETOMAR**  
- **PARAR** (com confirmação)  
- **RESET** (apenas em idle; com confirmação para padrão)  
- **TESTAR SOM**

Atalhos (quando disponíveis):  
- **Enter / Play-Pause**: iniciar/pausar/retomar  
- **Esc / Backspace**: parar (com confirmação)  
- **0**: alterna sons ON/OFF  
- **1–5**: define rapidamente a quantidade de rounds

---

## 📱 PWA
- O app é instalável no celular via navegador (Chrome/Edge/Safari) → **Adicionar à tela inicial**.  
- Ícones: `favicon.ico`, `icon-256.png`, `assets/icons/icon-192.png`, `assets/icons/icon-512.png`.  
- `manifest.json` + `service-worker.js` garantem experiência offline básica.  
- Em atualizações, o **CACHE_NAME** muda no service worker para forçar refresh.

---

## 🧾 Histórico de versões

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
/ (raiz do app)
index.html
styles.css
script.js
manifest.json
service-worker.js
favicon.ico
icon-256.png
apple-touch-icon.png
/assets
/icons
icon-192.png
icon-512.png
logo.png
beep.mp3
click.mp3
fight.mp3
gong.mp3