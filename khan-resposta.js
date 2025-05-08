const APP = {
  ver: "1.2.0",
  user: {
    id: 0
  },
  cfg: {
    mod: true,
    auto: false,
    questionSpoof: true,
    darkMode: true,
    autoSpeed: 750,
    speedOptions: [750, 1000, 1250, 1500]
  }
};

// Load external libraries
async function loadScript(url) {
  const response = await fetch(url);
  const script = await response.text();
  eval(script);
}

async function loadCss(url) {
  return new Promise(resolve => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    link.onload = resolve;
    document.head.appendChild(link);
  });
}

// Toast notification function
function sendToast(message, duration = 5000, position = "bottom") {
  if (typeof Toastify !== 'undefined') {
    Toastify({
      text: message,
      duration,
      gravity: position,
      position: "center",
      stopOnFocus: true,
      style: { background: "#000000" }
    }).showToast();
  } else {
    console.log("Toast:", message);
  }
}

// Audio player function
const playAudio = src => {
  new Audio(src).play();
};

class UI {
  static init() {
    const _0x3d849d = document.createElement("div");
    _0x3d849d.id = "ScriptbotJunin-panel";
    Object.assign(_0x3d849d.style, {
      position: "fixed",
      top: "10px",
      right: "15px",
      width: "200px",
      background: "linear-gradient(145deg, #1a1a1a, #111)",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      padding: "12px",
      zIndex: "9999",
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      border: "1px solid #333",
      maxWidth: "90%"
    });
    _0x3d849d.innerHTML = `
        <style>
          .ScriptbotJunin-header {
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #333;
            cursor: pointer;
            user-select: none;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .ScriptbotJunin-header:after {
            content: "▼";
            font-size: 12px;
            margin-left: 5px;
            transition: transform 0.3s ease;
          }
          .ScriptbotJunin-header.collapsed:after {
            transform: rotate(-90deg);
          }
          .ScriptbotJunin-content {
            transition: max-height 0.3s ease, opacity 0.3s ease;
            max-height: 500px;
            opacity: 1;
            overflow: hidden;
          }
          .ScriptbotJunin-content.collapsed {
            max-height: 0;
            opacity: 0;
          }
          .ScriptbotJunin-version {
            color: #666;
            font-size: 12px;
            font-weight: normal;
          }
          .ScriptbotJunin-opt {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #fff;
            padding: 8px;
            margin: 3px 0;
          }
          .switch {
            position: relative;
            display: inline-block;
            width: 44px;
            height: 22px;
          }
          .switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #333;
            transition: .4s;
            border-radius: 22px;
          }
          .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
          }
          input:checked + .slider {
            background: linear-gradient(145deg, #6200ea, #7c4dff);
          }
          input:checked + .slider:before {
            transform: translateX(22px);
          }
          .ScriptbotJunin-credit {
            color: #666;
            font-size: 11px;
            text-align: center;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #333;
          }
          .speed-slider-container {
            width: 100%;
            margin-top: 5px;
            padding: 0 2px;
            box-sizing: border-box;
            overflow: visible;
          }
          .speed-slider {
            -webkit-appearance: none;
            width: 100%;
            height: 8px;
            border-radius: 5px;
            background: #333;
            outline: none;
            margin: 10px 0;
          }
          .speed-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: linear-gradient(145deg, #6200ea, #7c4dff);
            cursor: pointer;
          }
          .speed-slider::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: linear-gradient(145deg, #6200ea, #7c4dff);
            cursor: pointer;
            border: none;
          }
          .speed-value {
            display: none;
          }
          .speed-ticks {
            display: none;
          }
          .speed-tick {
            display: none;
          }
          .speed-ticks {
            padding: 0;
          }
          .speed-tick {
            font-size: 7px;
          }
        </style>
        <div class="ScriptbotJunin-header">
          ScriptbotJunin <span class="ScriptbotJunin-version">${APP.ver}</span>
        </div>
        <div class="ScriptbotJunin-content">
          <div class="ScriptbotJunin-opt">
            <span>Auto Complete</span>
            <label class="switch">
              <input type="checkbox" id="autoCheck">
              <span class="slider"></span>
            </label>
          </div>
          <div class="ScriptbotJunin-opt">
            <span>Question Spoof</span>
            <label class="switch">
              <input type="checkbox" id="spoofCheck" checked>
              <span class="slider"></span>
            </label>
          </div>
          <div class="ScriptbotJunin-opt">
            <span>Dark Mode</span>
            <label class="switch">
              <input type="checkbox" id="darkModeCheck" checked>
              <span class="slider"></span>
            </label>
          </div>
          <div class="ScriptbotJunin-opt" id="speedControlContainer" style="display: none;">
            <span>Velocidade</span>
            <div style="width: 100%; display: flex; align-items: center; padding-left: 10px; box-sizing: border-box;">
              <div class="speed-slider-container">
                <input type="range" min="0" max="3" value="0" class="speed-slider" id="speedSlider">
                <div class="speed-value" id="speedValue" style="display: none;">750ms</div>
              </div>
            </div>
          </div>
          <div class="ScriptbotJunin-credit">by AdrielDev</div>
        </div>
    `;
    document.body.appendChild(_0x3d849d);

    // Adicionar evento de clique ao cabeçalho para encolher/expandir o menu
    const header = document.querySelector('.ScriptbotJunin-header');
    const content = document.querySelector('.ScriptbotJunin-content');

    header.addEventListener('click', () => {
      header.classList.toggle('collapsed');
      content.classList.toggle('collapsed');

      // Salvar o estado do menu no localStorage
      const isCollapsed = header.classList.contains('collapsed');
      localStorage.setItem('ScriptbotJunin-collapsed', isCollapsed);

      // Mostrar toast informativo
      sendToast(isCollapsed ? "🔼 Menu recolhido" : "🔽 Menu expandido", 1000);
    });

    // Verificar se o menu estava recolhido anteriormente
    const wasCollapsed = localStorage.getItem('ScriptbotJunin-collapsed') === 'true';
    if (wasCollapsed) {
      header.classList.add('collapsed');
      content.classList.add('collapsed');
    }

    // Setup event listeners
    document.getElementById("autoCheck").onchange = event => {
      APP.cfg.auto = event.target.checked;
      document.getElementById("speedControlContainer").style.display = APP.cfg.auto ? "flex" : "none";
      sendToast(APP.cfg.auto ? "✅ Auto Complete Enabled" : "❌ Auto Complete Disabled", 2000);
    };

    // Configurar o slider de velocidade
    const speedSlider = document.getElementById("speedSlider");
    const speedValue = document.getElementById("speedValue");

    // Definir o valor inicial do slider
    const initialIndex = APP.cfg.speedOptions.indexOf(APP.cfg.autoSpeed);
    speedSlider.value = initialIndex >= 0 ? initialIndex : 0;

    // Adicionar evento de mudança ao slider
    speedSlider.oninput = () => {
      const index = parseInt(speedSlider.value);
      const speed = APP.cfg.speedOptions[index];
      APP.cfg.autoSpeed = speed;
      speedValue.textContent = speed + "ms";
    };

    // Adicionar evento de mudança completa para mostrar toast
    speedSlider.onchange = () => {
      const index = parseInt(speedSlider.value);
      const speed = APP.cfg.speedOptions[index];
      sendToast(`⏱️ Velocidade alterada para ${speed}ms`, 2000);
    };

    document.getElementById("spoofCheck").onchange = event => {
      APP.cfg.questionSpoof = event.target.checked;
      sendToast(APP.cfg.questionSpoof ? "✅ Question Spoof Enabled" : "❌ Question Spoof Disabled", 2000);
    };

    document.getElementById("darkModeCheck").onchange = event => {
      APP.cfg.darkMode = event.target.checked;
      if (typeof DarkReader !== 'undefined') {
        if (APP.cfg.darkMode) {
          DarkReader.enable();
          sendToast("🌑 Dark Mode Enabled", 2000);
        } else {
          DarkReader.disable();
          sendToast("☀️ Dark Mode Disabled", 2000);
        }
      } else {
        console.error("DarkReader não está disponível");
        sendToast("⚠️ Dark Mode não disponível. Recarregue a página.", 3000);
      }
    };

    // Ativar Dark Mode por padrão
    if (APP.cfg.darkMode && typeof DarkReader !== 'undefined') {
      DarkReader.enable();
    }
  }
}

class Core {
  static init() {
    // Inicialização sequencial das funcionalidades
    this.setupMod();
    this.setupAuto();
  }

  static async loadExternalLibraries() {
    try {
      await loadCss("[https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css](https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css)");
      await loadScript("[https://cdn.jsdelivr.net/npm/toastify-js](https://cdn.jsdelivr.net/npm/toastify-js)");
      await loadScript("[https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js](https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js)");

      // Configurar o DarkReader após carregá-lo
      if (typeof DarkReader !== 'undefined') {
        DarkReader.setFetchMethod(window.fetch);
        if (APP.cfg.darkMode) {
          DarkReader.enable();
        }
      } else {
        console.error("Scriptbot não foi carregado corretamente");
      }

      // Verificar se Toastify foi carregado antes de usar
      if (typeof Toastify !== 'undefined') {
        sendToast("🌿 Script loaded successfully!");
      } else {
        console.error("Toastify não foi carregado corretamente");
      }

      console.clear();
    } catch (error) {
      console.error("Erro ao carregar bibliotecas externas:", error);
    }
  }

  static setupMod() {
    const messages = [
      "",
      "🤍 Made by [@AdrielDev])."
    ];

    const originalFetch = window.fetch;
    window.fetch = async function (_0xb0b6f5, _0x45b6eb) {
      const _0x238f50 = await originalFetch.apply(this, arguments);
      const _0xc057f3 = _0x238f50.clone();

      try {
        const _0x46e77b = await _0xc057f3.text();
        let _0x3cbec8 = JSON.parse(_0x46e77b);

        if (_0x3cbec8?.data?.assessmentItem?.item?.itemData) {
          let _0x3ca1c5 = JSON.parse(_0x3cbec8.data.assessmentItem.item.itemData);

          if (_0x3ca1c5.question.content[0] === _0x3ca1c5.question.content[0].toUpperCase() && APP.cfg.questionSpoof) {
            _0x3ca1c5.answerArea = {
              calculator: false
            };

            _0x3ca1c5.question.content = messages[Math.floor(Math.random() * messages.length)] + "[[☃ radio 1]]";
            _0x3ca1c5.question.widgets = {
              "radio 1": {
                type: "radio",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                  choices: [{
                    content: "✅",
                    correct: true
                  }],
                  randomize: false
