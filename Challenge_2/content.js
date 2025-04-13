const companyData = {
    companyName: "TechCorp",
    matchScore: 86,
    accountStatus: "Target"
};


function createWidget(data) {
    const container = document.createElement("div");
    container.id = "enhancer-widget";

    const statusColor = data.accountStatus === "Target" ? "green" : "red";

    container.innerHTML = `
      <div class="widget-header">
        <strong>${data.companyName}</strong>
        <button id="toggle-btn">Hide</button>
      </div>
      <div class="widget-body">
        <p>Match Score: ${data.matchScore}</p>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${data.matchScore}%;"></div>
        </div>
        <p>Status: <span class="status-tag ${statusColor}">${data.accountStatus}</span></p>
      </div>
    `;

    document.body.appendChild(container);

    // Toggle widget visibility
    document.getElementById("toggle-btn").addEventListener("click", () => {
        container.classList.toggle("hidden");
        const hidden = container.classList.contains("hidden");
        chrome.storage.local.set({ widgetVisible: !hidden });
        document.getElementById("toggle-btn").innerText = hidden ? "Show" : "Hide";
    });

    // Restore visibility from storage
    chrome.storage.local.get(["widgetVisible"], (result) => {
        if (result.widgetVisible === false) {
            container.classList.add("hidden");
            document.getElementById("toggle-btn").innerText = "Show";
        }
    });
}

createWidget(companyData);
