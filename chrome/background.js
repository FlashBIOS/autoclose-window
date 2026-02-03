let autoClosePairs = [];

function updatePairs() {
    chrome.storage.sync.get({ autoClosePairs: [] }, (items) => {
        autoClosePairs = items.autoClosePairs;
    });
}

// Initial load
updatePairs();

// Update pairs when storage changes
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.autoClosePairs) {
        autoClosePairs = changes.autoClosePairs.newValue;
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
                        chrome.tabs.remove(tabId, () => {
                            if (chrome.runtime.lastError) {
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

chrome.tabs.onUpdated.addListener(checkAndCloseTab);
