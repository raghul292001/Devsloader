document.getElementById("start").addEventListener("click", () => {
    const interval = parseInt(document.getElementById("interval").value);
    if (interval && interval >= 1000) {
      console.log(`Starting reload with an interval of ${interval} ms`);
      chrome.runtime.sendMessage({ action: "start", interval });
    } else {
      console.log("Invalid interval entered.");
      alert("Please enter a valid interval (minimum 1000 ms).");
    }
  });
  
  document.getElementById("stop").addEventListener("click", () => {
    console.log("Stopping reload.");
    chrome.runtime.sendMessage({ action: "stop" });
  });
  