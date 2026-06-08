document.getElementById("scanBtn").addEventListener("click", () => {

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

        let url = tabs[0].url;
        let score = 0;

        document.getElementById("website").innerText = url;

        // Rule 1: Long URL
        if (url.length > 50) score += 20;

        // Rule 2: Contains '@'
        if (url.includes("@")) score += 30;

        // Rule 3: Contains IP address
        let ipPattern = /(\d{1,3}\.){3}\d{1,3}/;
        if (ipPattern.test(url)) score += 30;

        // Rule 4: Too many hyphens
        let hyphenCount = (url.match(/-/g) || []).length;
        if (hyphenCount >= 2) score += 10;

        // Rule 5: Suspicious words
        let keywords = [
            "login",
            "verify",
            "update",
            "secure",
            "account",
            "banking",
            "signin"
        ];

        keywords.forEach(word => {
            if (url.toLowerCase().includes(word)) {
                score += 10;
            }
        });

        // Maximum score = 100
        if (score > 100) score = 100;

        let result = "";

        if (score < 30) {
            result = "🟢 SAFE\nRisk Score: " + score + "/100";
        } else if (score < 60) {
            result = "🟡 SUSPICIOUS\nRisk Score: " + score + "/100";
        } else {
            result = "🔴 PHISHING DETECTED\nRisk Score: " + score + "/100";
        }

        document.getElementById("result").innerText = result;

    });

});