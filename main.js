// main.js - Central Controller & Monetization Engine

const DIRECT_LINK_URL = "https://www.effectivecpmnetwork.com/vnenqyicb?key=4d43da1c5fc88a3ee9c22caada6d224f";

// Quiz Data
const quizData = [
    {
        q: "1. Where do you feel most at home?",
        options: [
            { text: "High in the mountains", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80", animal: "eagle" },
            { text: "Deep, quiet forest", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80", animal: "wolf" },
            { text: "Sunlit open plains", img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80", animal: "lion" },
            { text: "Quiet shadows at night", img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80", animal: "panther" }
        ]
    },
    {
        q: "2. How do you handle major life challenges?",
        options: [
            { text: "Confront them head-on with courage", img: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=400&q=80", animal: "lion" },
            { text: "Stay calm, quiet and strategic", img: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=400&q=80", animal: "panther" },
            { text: "Rely on my close pack and friends", img: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=400&q=80", animal: "wolf" },
            { text: "Rise high above the drama", img: "https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?auto=format&fit=crop&w=400&q=80", animal: "eagle" }
        ]
    },
    {
        q: "3. What is your primary core instinct?",
        options: [
            { text: "Leadership and authority", img: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=400&q=80", animal: "lion" },
            { text: "Deep loyalty and trust", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80", animal: "wolf" },
            { text: "Vision and total freedom", img: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=400&q=80", animal: "eagle" },
            { text: "Independence and mystery", img: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=400&q=80", animal: "panther" }
        ]
    }
];

const animalResults = {
    lion: {
        title: "You Are a Majestic Lion 🦁",
        desc: "Bold, courageous, and a natural leader. You command respect and protect those you love with unwavering passion.",
        img: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80"
    },
    wolf: {
        title: "You Are a Timber Wolf 🐺",
        desc: "Deeply loyal, intuitive, and protective. You thrive when surrounded by your trusted circle and family pack.",
        img: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80"
    },
    eagle: {
        title: "You Are a Mountain Eagle 🦅",
        desc: "Visionary and free-spirited. You see the bigger picture, rise above challenges, and cherish absolute freedom.",
        img: "https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?auto=format&fit=crop&w=800&q=80"
    },
    panther: {
        title: "You Are a Black Panther 🐆",
        desc: "Mysterious, independent, and sharp. You move quietly in life but possess immense hidden power.",
        img: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80"
    }
};

let currentStep = 0;
let scores = { lion: 0, wolf: 0, eagle: 0, panther: 0 };
window.userFinalResult = null; // Stored globally for modules

function triggerAdAndExecute(callback) {
    // Open Adsterra Direct Link in new tab for monetization
    window.open(DIRECT_LINK_URL, '_blank');
    if (callback && typeof callback === 'function') {
        callback();
    }
}

function renderQuestion() {
    if (currentStep >= quizData.length) {
        finishQuiz();
        return;
    }
    const step = quizData[currentStep];
    document.getElementById("question-text").innerText = step.q;
    const container = document.getElementById("options-container");
    container.innerHTML = "";

    step.options.forEach(opt => {
        const card = document.createElement("div");
        card.className = "option-card";
        card.innerHTML = `<img src="${opt.img}" alt="Option"><span>${opt.text}</span>`;
        card.onclick = () => {
            scores[opt.animal]++;
            currentStep++;
            renderQuestion();
        };
        container.appendChild(card);
    });
}

function finishQuiz() {
    document.getElementById("quiz-wrapper").style.display = "none";
    
    // Determine winner
    let maxScore = -1;
    let finalAnimal = 'lion';
    for (const animal in scores) {
        if (scores[animal] > maxScore) {
            maxScore = scores[animal];
            finalAnimal = animal;
        }
    }

    const res = animalResults[finalAnimal];
    window.userFinalResult = { key: finalAnimal, ...res };

    document.getElementById('main-title').innerText = "Your Spirit Animal Revealed!";
    document.getElementById("res-image").src = res.img;
    document.getElementById("res-title").innerText = res.title;
    document.getElementById("res-desc").innerText = res.desc;
    document.getElementById('result-wrapper').style.display = 'block';

    // Update social share buttons
    const pageUrl = encodeURIComponent(window.location.href);
    const shareDesc = encodeURIComponent(`I got ${res.title}! Discover your spirit wild animal here:`);
    document.getElementById('pinBtn').href = `https://pinterest.com/pin/create/button/?url=${pageUrl}&media=${encodeURIComponent(res.img)}&description=${shareDesc}`;
    document.getElementById('fbBtn').href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
}

// Module Loaders with Lazy Script Injection
function loadScript(src, callback) {
    if (document.querySelector(`script[src="${src}"]`)) {
        if (callback) callback();
        return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

// Event Listeners for Premium Feature Buttons
document.getElementById('btn-pdf-mod').addEventListener('click', () => {
    triggerAdAndExecute(() => {
        loadScript('pdf-generator.js', () => {
            if (window.generatePDFCertificate) {
                window.generatePDFCertificate(window.userFinalResult);
            }
        });
    });
});

document.getElementById('btn-audio-mod').addEventListener('click', () => {
    triggerAdAndExecute(() => {
        loadScript('audio-player.js', () => {
            if (window.playSpiritAudio) {
                window.playSpiritAudio(window.userFinalResult.key);
            }
        });
    });
});

document.getElementById('btn-compat-mod').addEventListener('click', () => {
    triggerAdAndExecute(() => {
        loadScript('compatibility.js', () => {
            if (window.showCompatibility) {
                window.showCompatibility(window.userFinalResult.key);
            }
        });
    });
});

// Initialize Quiz
renderQuestion();
