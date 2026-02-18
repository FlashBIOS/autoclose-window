let autoClosePairs = [];

function addDefaultPair() {
    if (!autoClosePairs) autoClosePairs = [];
    autoClosePairs.push({ domain: "127.0.0.1", title: "Successfully Logged In" });
    browser.storage.local.set({ autoClosePairs });
}

function updatePairs() {
    browser.storage.local.get("autoClosePairs").then(items => {
        autoClosePairs = items.autoClosePairs;
        if ((autoClosePairs && autoClosePairs.length === 0) || !autoClosePairs) {
            addDefaultPair();
        }
    })
}

// Initial load
updatePairs();

// Update pairs when storage changes
browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.autoClosePairs) {
        autoClosePairs = changes.autoClosePairs.newValue;
        if (autoClosePairs.length === 0) {
            addDefaultPair();
        }
    }
});

function checkAndCloseTab(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' || tab.status === 'complete') {
        if (!tab.url) return;

        try {
            const url = new URL(tab.url);
            const domain = url.hostname;
            const title = tab.title || "";

            for (const pair of autoClosePairs) {
                const domainMatch = domain.includes(pair.domain);
                const titleMatch = title === pair.title;

                if (domainMatch && titleMatch) {
                    console.log(`Match found! Closing tab ${tabId} in 3 seconds. Domain: ${domain}, Title: ${title}`);
                    setTimeout(() => {
                        browser.tabs.remove(tabId, () => {
                            if (browser.runtime.lastError) {
                                console.warn("Could not close tab: " + chrome.runtime.lastError.message);
                            } else {
                                console.log(`Closed tab ${tabId}`);
                            }
                        });
                    }, 3000);
                    break;
                }
            }
        } catch (e) {
            console.error("Error parsing URL: ", e);
        }
    }
}

browser.tabs.onUpdated.addListener(checkAndCloseTab);
