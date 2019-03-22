function beginAutoCookies() {
    try {
        updateCookiesCount(cps);
    } catch (err) {
    }
    setTimeout(beginAutoCookies, 1000);
}