// Spirit Animal Data structure
const quizData = [
    {
        question: "1. Where do you feel most at home?",
        options: [
            { text: "In a dense, quiet forest", animal: "owl", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400" },
            { text: "On open plains and mountains", animal: "eagle", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400" },
            { text: "By rivers, lakes, or the ocean", animal: "wolf", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400" },
            { text: "In warm, sunny spaces", animal: "lion", img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400" }
        ]
    },
    {
        question: "2. How do you handle difficult situations?",
        options: [
            { text: "Analyze carefully before acting", animal: "owl", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400" },
            { text: "Rise above it and see the big picture", animal: "eagle", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400" },
            { text: "Rally your group/friends to solve it together", animal: "wolf", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400" },
            { text: "Face it directly with strength and confidence", animal: "lion", img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400" }
        ]
    },
    {
        question: "3. What is your primary drive in life?",
        options: [
            { text: "Leadership and authority", animal: "lion", img: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=400" },
            { text: "Deep loyalty and trust", animal: "wolf", img: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400" },
            { text: "Vision and total freedom", animal: "eagle", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400" },
            { text: "Independence and mystery", animal: "owl", img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400" }
        ]
    }
];

const resultsData = {
    lion: {
        title: "The Powerful Lion",
        desc: "You are a natural-born leader. You possess immense courage, strength, and confidence. People look to you for guidance, and you take pride in protecting your pride.",
        img: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=800",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        compat: "Best Matched with: 🐺 Wolf (Loyal Allies) & 🦅 Eagle (Visionary Partners)"
    },
    wolf: {
        title: "The Loyal Wolf",
        desc: "You thrive on community, family, and deep trust. You are highly intuitive, fiercely protective, and know that true strength lies in working together.",
        img: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        compat: "Best Matched with: 🦁 Lion (Strong Team) & 🦉 Owl (Wise Advisors)"
    },
    eagle: {
        title: "The Free Eagle",
        desc: "You value freedom and clear vision above all else. You can zoom out to see the bigger picture when others get lost in the details.",
        img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        compat: "Best Matched with: 🦉 Owl (Intellectual Equals) & 🦁 Lion (Ambitious Leaders)"
    },
    owl: {
        title: "The Wise Owl",
        desc: "You are observant, strategic, and deeply thoughtful. You see what others miss and prefer wisdom and clarity over rushing into action.",
        img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        compat: "Best Matched with: 🦅 Eagle (Shared Vision) & 🐺 Wolf (Trusted Companions)"
    }
};

let currentQuestion = 0;
let scores = { lion: 0, wolf: 0, eagle: 0, owl: 0 };
let finalResultKey = "lion";

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();

    // Event listener for PDF Generation
    document.getElementById('btn-pdf-mod').addEventListener('click', generatePDF);
    
    // Event listener for Audio player
    document.getElementById('btn-audio-mod').addEventListener('click', playAudio);

    // Event listener for Compatibility
    document.getElementById('btn-compat-mod').addEventListener('click', showCompatibility);
});

function loadQuestion() {
    const qData = quizData[currentQuestion];
    document.getElementById("question-text").innerText = qData.question;
    
    const container = document.getElementById("options-container");
    container.innerHTML = "";

    qData.options.forEach(opt => {
        const card = document.createElement("div");
        card.className = "option-card";
        card.innerHTML = `
            <img src="${opt.img}" alt="${opt.text}">
            <span>${opt.text}</span>
        `;
        card.onclick = () => selectOption(opt.animal);
        container.appendChild(card);
    });
}

function selectOption(animal) {
    scores[animal]++;
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-wrapper").style.display = "none";
    document.getElementById("result-wrapper").style.display = "block";

    // Determine highest score
    finalResultKey = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const result = resultsData[finalResultKey];

    document.getElementById("res-title").innerText = result.title;
    document.getElementById("res-desc").innerText = result.desc;
    document.getElementById("res-image").src = result.img;

    // Update social share buttons
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(`I got ${result.title} on the Spirit Beast Test!`);
    document.getElementById("fbBtn").href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    document.getElementById("pinBtn").href = `https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareText}`;
}

// Fixed PDF generation logic
function generatePDF() {
    const element = document.getElementById('pdf-content');
    
    const opt = {
        margin:       10,
        filename:     `Spirit_Animal_${finalResultKey}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}

function playAudio() {
    const container = document.getElementById("audio-container");
    const result = resultsData[finalResultKey];
    container.innerHTML = `<audio controls autoplay style="width:100%;"><source src="${result.audio}" type="audio/mpeg">Your browser does not support audio.</audio>`;
}

function showCompatibility() {
    const container = document.getElementById("compat-container");
    const result = resultsData[finalResultKey];
    container.innerHTML = `<div style="background:#0f172a; padding:15px; border-radius:8px; border:1px solid #334155;">
        <h4 style="margin:0 0 8px 0; color:#f59e0b;">Soul Match Profile</h4>
        <p style="margin:0; font-size:14px; color:#cbd5e1;">${result.compat}</p>
    </div>`;
}
