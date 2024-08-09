let reloadInterval = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start") {
    if (reloadInterval) {
      clearInterval(reloadInterval);
      console.log("Existing interval cleared.");
    }

    console.log(`Setting up reload every ${message.interval} ms.`);
    reloadInterval = setInterval(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          console.log(`Reloading tab with ID: ${tabs[0].id}`);
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => window.location.reload(),
          });
        } else {
          console.log("No active tab found.");
        }
      });
    }, message.interval);
  } else if (message.action === "stop") {
    if (reloadInterval) {
      clearInterval(reloadInterval);
      console.log("Reload interval cleared.");
    } else {
      console.log("No reload interval to clear.");
    }
    reloadInterval = null;
  }
});
