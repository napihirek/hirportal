// Megadott Adsterra Direct Link
const ADSTERRA_DIRECT_LINK = "https://www.effectivecpmnetwork.com/vnenqyicb?key=4d43da1c5fc88a3ee9c22caada6d224f";

// 30 másodperces időzítő (Cooldown)
let canTriggerAd = true;
const AD_COOLDOWN_MS = 30000;

function handleAdTrigger() {
    if (canTriggerAd) {
        window.open(ADSTERRA_DIRECT_LINK, '_blank');
        canTriggerAd = false;
        
        setTimeout(() => {
            canTriggerAd = true;
        }, AD_COOLDOWN_MS);
    }
}

// Több lehetséges kép az egyes állatokhoz (véletlenszerű kiválasztáshoz)
const animalImages = {
    owl: [
        "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1394882/pexels-photo-1394882.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/106685/pexels-photo-106685.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    eagle: [
        "https://images.pexels.com/photos/133459/pexels-photo-133459.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1406506/pexels-photo-1406506.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2115984/pexels-photo-2115984.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    wolf: [
        "https://images.pexels.com/photos/162256/wolf-predator-canis-lupus-wildlife-162256.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/208821/pexels-photo-208821.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/53125/wolf-wolf-pack-lupus-canis-lupus-53125.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    lion: [
        "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1598377/pexels-photo-1598377.jpeg?auto=compress&cs=tinysrgb&w=800"
    ]
};

// Segédfüggvény: véletlenszerű kép választása egy adott állat kulcshoz
function getRandomImage(animalKey) {
    const list = animalImages[animalKey];
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

const quizData = [
    {
        question: "1. Where do you feel most at home?",
        options: [
            { text: "In a dense, quiet forest", animal: "owl" },
            { text: "On open plains and mountains", animal: "eagle" },
            { text: "Deep in the wilderness", animal: "wolf" },
            { text: "In warm, sunny spaces", animal: "lion" }
        ]
    },
    {
        question: "2. How do you handle difficult situations?",
        options: [
            { text: "Analyze carefully before acting", animal: "owl" },
            { text: "Rise above it and see the big picture", animal: "eagle" },
            { text: "Rally your group to solve it together", animal: "wolf" },
            { text: "Face it directly with strength", animal: "lion" }
        ]
    },
    {
        question: "3. What is your primary drive in life?",
        options: [
            { text: "Leadership and authority", animal: "lion" },
            { text: "Deep loyalty and trust", animal: "wolf" },
            { text: "Vision and total freedom", animal: "eagle" },
            { text: "Independence and wisdom", animal: "owl" }
        ]
    }
];

const resultsData = {
    lion: {
        title: "The Powerful Lion",
        desc: "You are a natural-born leader. You possess immense courage, strength, and confidence. People look to you for guidance, and you take pride in protecting your pride.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    wolf: {
        title: "The Loyal Wolf",
        desc: "You thrive on community, family, and deep trust. You are highly intuitive, fiercely protective, and know that true strength lies in working together.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    eagle: {
        title: "The Free Eagle",
        desc: "You value freedom and clear vision above all else. You can zoom out to see the bigger picture when others get lost in the details.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    owl: {
        title: "The Wise Owl",
        desc: "You are observant, strategic, and deeply thoughtful. You see what others miss and prefer wisdom and clarity over rushing into action.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    }
};

let currentQuestion = 0;
let scores = { lion: 0, wolf: 0, eagle: 0, owl: 0 };
let finalResultKey = "lion";
let chosenResultImage = ""; // Itt tároljuk a végeredményhez kisorsolt fix képet

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();

    document.getElementById('btn-pdf-mod').addEventListener('click', () => {
        handleAdTrigger();
        generatePDF();
    });

    document.getElementById('btn-audio-mod').addEventListener('click', () => {
        handleAdTrigger();
        playAudio();
    });
});

function loadQuestion() {
    const qData = quizData[currentQuestion];
    document.getElementById("question-text").innerText = qData.question;
    
    const container = document.getElementById("options-container");
    container.innerHTML = "";

    qData.options.forEach(opt => {
        // Minden opcióhoz betöltünk egy véletlenszerű képet az adott állat kategóriájából
        const randomImgUrl = getRandomImage(opt.animal);

        const card = document.createElement("div");
        card.className = "option-card";
        card.innerHTML = `
            <img src="${randomImgUrl}" alt="${opt.text}">
            <span>${opt.text}</span>
        `;
        
        card.onclick = () => {
            handleAdTrigger();
            selectOption(opt.animal);
        };
        
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

    finalResultKey = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const result = resultsData[finalResultKey];

    // Kiválasztunk egy véletlenszerű képet a végeredmény állatához is, és elmentjük a PDF-hez
    chosenResultImage = getRandomImage(finalResultKey);

    document.getElementById("res-title").innerText = result.title;
    document.getElementById("res-desc").innerText = result.desc;
    
    const imgElement = document.getElementById("res-image");
    imgElement.src = chosenResultImage;
}

function generatePDF() {
    const element = document.getElementById('pdf-content');
    const btn = document.getElementById('btn-pdf-mod');
    
    btn.innerText = "Generating PDF...";
    btn.disabled = true;

    const opt = {
        margin:       10,
        filename:     `Spirit_Animal_${finalResultKey}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2,
            useCORS: true,
            allowTaint: true
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    setTimeout(() => {
        html2pdf().set(opt).from(element).save().then(() => {
            btn.innerText = "Get PDF Certificate ►";
            btn.disabled = false;
        }).catch(err => {
            console.error("PDF generation error:", err);
            btn.innerText = "Get PDF Certificate ►";
            btn.disabled = false;
        });
    }, 400);
}

function playAudio() {
    const container = document.getElementById("audio-container");
    const result = resultsData[finalResultKey];
    container.innerHTML = `<audio controls autoplay style="width:100%;"><source src="${result.audio}" type="audio/mpeg">Your browser does not support audio.</audio>`;
}
