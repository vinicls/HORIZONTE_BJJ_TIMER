# 🥋 HORIZONTE JIU JITSU • TIMER

Aplicativo de cronômetro interativo para treinos de Jiu-Jitsu, adaptado para **TV**, **desktop**, **mobile** e **tablet**, com **sons**, **temas**, **modo foco** e **PWA** (instalável). App desenvolvido por Vinicius Simões para a equipe HORIZONTE JIU JITSU (JOÃO PESSOA/PB), liderada pelo Sensei Alexandre Wanderley.

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
3. Clique em **INICIAR** (depois **PAUSAR/RETOMAR** se necessário).  
4. **PARAR** encerra o treino (com confirmação).  
5. **RESET** (apenas em idle) volta ao padrão salvo (1 round 5:00, sem preparação, tema Horizon, sons ON).  
6. **Tema** e **Sons**: seletores no topo (desktop/TV) e, no mobile/tablet, após os botões de controle.

---

## 📲 Manual de instalação do PWA (passo a passo simples)

Você pode **instalar o aplicativo** no seu celular, tablet, ou computador como se fosse um app comum — ele funcionará mesmo **sem conexão com a internet** (depois de aberto ao menos uma vez).

### 📱 Android (Google Chrome ou Edge)
1. Acesse o site do cronômetro normalmente.  
2. No canto superior direito do navegador, toque em **⋮ (menu)**.  
3. Selecione **“Adicionar à tela inicial”**.  
4. Confirme com **“Adicionar”**.  
5. O ícone “BJJ TIMER” aparecerá na sua tela inicial.  
6. Depois disso, o app pode ser aberto **como aplicativo independente**, sem barra de navegação.

### 🍎 iPhone / iPad (Safari)
1. Abra o site no **Safari**.  
2. Toque no **ícone de compartilhamento** (quadrado com seta para cima).  
3. Role até encontrar **“Adicionar à Tela de Início”** e toque.  
4. Confirme em **“Adicionar”**.  
5. O app será instalado na tela inicial e poderá ser aberto como um app completo.

### 💻 Computador (Windows / macOS)
1. Acesse o site do cronômetro pelo navegador **Chrome**, **Edge** ou **Brave**.  
2. Clique no ícone **“Instalar”** (geralmente aparece na barra de endereços, à direita).  
3. Confirme a instalação.  
4. O aplicativo abrirá em uma **janela própria**, sem menus de navegador.  

### 📺 Smart TV (Tizen / WebOS / Android TV)
- Acesse o endereço no navegador da TV.  
- Adicione aos favoritos ou **instale como PWA** se o navegador da TV oferecer essa opção.  
- Mantenha o app aberto em tela cheia para uso durante o treino.

💡 **Dica:** após instalar, abra o app pelo ícone “BJJ TIMER” — ele funcionará em modo tela cheia, rápido e sem distrações.

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
- Em atualizações, o **CACHE_NAME** muda para forçar refresh.

---

## 🧾 Histórico de versões

- **v1.9.0**
  - 📱 Layout **responsivo** (mobile/tablet/desktop/TV) sem overflow horizontal;
  - 🖼️ Logo **no topo** e **no rodapé** (mobile/tablet);
  - 🧭 Título em **duas linhas** e **centralizado** no mobile/tablet;
  - 🕐 Data e hora **ocultas** no mobile/tablet (mantidas em desktop/TV);
  - 🎚️ Seletores **Tema/Som** movidos **para depois dos botões** (mobile/tablet);
  - 🔲 Modo foco (mobile/tablet): **botões empilhados** verticalmente, com espaçamento;
  - 🧱 **Splash 100%** da tela (sem rolagem, sem “vazar” a tela inicial);
  - 🔒 Integridade total preservada.

- **v1.8.7**
  - 🧭 Preparação sempre **antes do 1º round** (inclusive round único);
  - 🔒 Flag para não repetir preparação entre rounds;
  - 🧩 Sem mudanças visuais/PWA.

- **v1.8.6_prepFix**
  - 🧭 Preparação respeitada no round simples;
  - 📝 Rótulos dos seletores em **CAIXA ALTA + negrito**;
  - 🔘 **DEFINIR** do tamanho dos seletores;
  - 🖼️ Referências garantidas aos ícones (favicon/256/apple-touch).

- **v1.8.5_prepUX**
  - Pequenos ajustes de UX da preparação e revisão de triggers de som.

- **v1.8.4_focusUX**
  - 🖲️ Feedback de foco/hover no modo foco;
  - ↔️ Mais espaçamento entre botões.

- **v1.8.3_fix**
  - 🔔 Preparação correta após reset; confirmação de RESET;
  - 🪪 PWA com `short_name` “HORIZONTE TIMER”.

- **v1.8**
  - 🧱 **Modo foco**: cronômetro ampliado, botões visíveis e logo no canto;  
  - ✅ **DEFINIR** verde padronizado; fade suave nos estados.

- **v1.7.2**
  - 🛠️ Correções de estado/cor no tema **Cores por estado**.

- **v1.7.1**
  - 🖼️ Splash com logo por **5s**;  
  - 🟡 Descanso: **10s finais piscando** em amarelo;  
  - 🕒 Data e hora **+50%**; README com créditos e histórico.

- **v1.7**
  - ⬆️ Rótulos **+50%**, selects **+30%**;  
  - 🧹 Limpar preferências.

- **v1.6**
  - ➕ **45s** nos segundos do round;  
  - 💾 Persistência de configurações.

- **v1.5.1**
  - 🐞 `start()` em idle; `lastTick` zerado em `start()/resume()`;  
  - 🔔 fight no início do round; beep 3s finais; gong no fim;  
  - 🔁 Iniciar ↔ Pausar ↔ Retomar;  
  - 🧱 Ajustes de logo/layout sem sobreposição.

- **v1.5**
  - 🧭 Centralização do cronômetro;  
  - 🟥 **PARAR** (confirmação); **RESET** apenas em idle;  
  - 🔒 **DEFINIR** desativado durante execução; selects no lugar de inputs;  
  - 🎨 Tema “Estados”; descanso em cinza; seg. do round 0/15/30.

- **v1.4.1**
  - ↘️ Logo à direita do cronômetro;  
  - 🛠️ Início pela **Preparação** (se houver) após reset/fim;  
  - 🪲 Correções de fase/idle e exibição inicial.

- **v1.4**
  - 🧱 Base com layout, temas, sons e exibição de data/hora;  
  - 🕹️ Controles principais e estrutura do app.

- **v1.3**
  - 🔊 Adição dos sons e primeiros sinais sonoros por fase.

- **v1.2**
  - 🎨 Primeiros temas visuais; layout aprimorado.

- **v1.1**
  - ⏱️ Cronômetro estável com contagem regressiva básica.

- **v1.0**
  - 🌱 Primeira versão funcional do cronômetro.

---

## 📁 Estrutura sugerida de pastas
