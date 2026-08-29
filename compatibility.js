// compatibility.js - Soul Match Matrix Engine

const compatibilityMatrix = {
    lion: { match: "Timber Wolf 🐺", reason: "Both share fierce loyalty, commanding presence, and deep protection for their pack." },
    wolf: { match: "Majestic Lion 🦁", reason: "Your mutual devotion to tribe and team creates an unbreakable bond." },
    eagle: { match: "Black Panther 🐆", reason: "You both respect individual freedom, high intellect, and silent independence." },
    panther: { match: "Mountain Eagle 🦅", reason: "Neither of you smothers the other; you thrive in high freedom and deep mutual respect." }
};

window.showCompatibility = function(animalKey) {
    const container = document.getElementById('compat-container');
    const data = compatibilityMatrix[animalKey] || compatibilityMatrix.lion;

    container.innerHTML = `
        <div style="background: #0f172a; padding: 18px; border-radius: 10px; border: 1px solid #d97706; animation: fadeIn 0.5s;">
            <h3 style="color: #f59e0b; margin-top: 0; font-size: 18px;">💞 Your Soul Match: ${data.match}</h3>
            <p style="font-size: 14px; color: #e2e8f0; line-height: 1.5; margin-bottom: 0;">${data.reason}</p>
        </div>
    `;
};
