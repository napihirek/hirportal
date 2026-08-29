// Adsterra Direct Link
const ADSTERRA_DIRECT_LINK = "https://www.effectivecpmnetwork.com/vnenqyicb?key=4d43da1c5fc88a3ee9c22caada6d224f";

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

// 6 fenséges vadállat adatai
const totemAnimals = [
    {
        name: "Wolf",
        fullName: "The Mighty Wolf",
        color: "#8c3b1e",
        img: "https://images.pexels.com/photos/162256/wolf-predator-canis-lupus-wildlife-162256.jpeg?auto=compress&cs=tinysrgb&w=800",
        desc: "The wolf represents deep intuition, sharp intelligence, and a strong sense of community. When the wolf is your totem, you trust your inner voice above all else.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        name: "Eagle",
        fullName: "The Golden Eagle",
        color: "#b8860b",
        img: "https://images.pexels.com/photos/133459/pexels-photo-133459.jpeg?auto=compress&cs=tinysrgb&w=800",
        desc: "The eagle flies high above the earth, possessing clear vision and divine connection. It teaches you to look beyond daily struggles and focus on your highest goals.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        name: "Bear",
        fullName: "The Sacred Bear",
        color: "#5c4033",
        img: "https://images.pexels.com/photos/35435/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
        desc: "The bear brings profound strength, courage, and grounding energy. It stands as a guardian of healing and deep inner reflection during times of change.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        name: "Owl",
        fullName: "The Wise Owl",
        color: "#4a3b5c",
        img: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800",
        desc: "The owl sees through darkness and hidden truths. As a totem, it grants you wisdom, silent observation, and the ability to uncover mysteries.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        name: "Lion",
        fullName: "The Royal Lion",
        color: "#d97706",
        img: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800",
        desc: "The lion embodies supreme leadership, personal power, and fearless protection. It reminds you of the royal courage beating within your chest.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        name: "Panther",
        fullName: "The Swift Panther",
        color: "#27272a",
        img: "https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=800",
        desc: "The panther walks in shadow and light with complete confidence. It represents rebirth, reclaiming your personal power, and acting with stealth and agility.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    }
];

// Véletlenszerű motivációs üzenetek
const motivationalQuotes = [
    "\"Walk softly through life, but let your spirit roar like thunder.\"",
    "\"Listen to the wind, for it carries the voice of your ancestors.\"",
    "\"A brave heart is worth more than a thousand shields.\"",
    "\"Do not look back; the path forward is illuminated by your own inner fire.\"",
    "\"Like the mountain, stand unshakeable against the storms of doubt.\"",
    "\"Your soul knows the way. Trust the journey of the wild.\""
];

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const numSegments = totemAnimals.length;
const arcSize = (2 * Math.PI) / numSegments;
let currentRotation = 0;
let isSpinning = false;

// Kerék kirajzolása a canvasra
function drawWheel() {
    const center = canvas.width / 2;
    const radius = center - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    totemAnimals.forEach((item, index) => {
        const angle = index * arcSize;

        // Cikkely színezése
        ctx.beginPath();
        ctx.fillStyle = item.color;
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, angle, angle + arcSize);
        ctx.lineTo(center, center);
        ctx.fill();
        ctx.stroke();

        // Szöveg kiírása a cikkelyre
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 20px Georgia";
        ctx.fillText(item.name, radius - 30, 10);
        ctx.restore();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    drawWheel();

    const spinBtn = document.getElementById("spin-btn");
    const retryBtn = document.getElementById("retry-btn");

    spinBtn.addEventListener("click", () => {
        if (isSpinning) return;
        handleAdTrigger();
        startSpin();
    });

    retryBtn.addEventListener("click", () => {
        if (isSpinning) return;
        handleAdTrigger();
        resetAndSpin();
    });
});

function startSpin() {
    isSpinning = true;
    document.getElementById("spin-btn").disabled = true;

    // Véletlenszerű nyertes index kiválasztása
    const winningIndex = Math.floor(Math.random() * numSegments);
    
    // Számoljuk ki a forgatási szöget (több teljes fordulat + a nyertes szegmens szöge)
    const extraRotations = 5; // 5 teljes kör
    const anglePerSegment = 360 / numSegments;
    
    // A nyertes szegmens középpontjának elérése a tetején (270 fok / -90 fok)
    const targetAngle = 360 - (winningIndex * anglePerSegment) - (anglePerSegment / 2);
    const totalRotation = currentRotation + (360 * extraRotations) + (targetAngle - (currentRotation % 360));
    
    currentRotation = totalRotation;
    canvas.style.transform = `rotate(${currentRotation}deg)`;

    // Amikor a pörgetési animáció lejár (4 másodperc)
    setTimeout(() => {
        isSpinning = false;
        showResult(winningIndex);
    }, 4000);
}

function resetAndSpin() {
    document.getElementById("result-box").style.display = "none";
    document.getElementById("wheel-section").style.display = "flex";
    document.getElementById("spin-btn").disabled = false;
}

function showResult(winningIndex) {
    document.getElementById("wheel-section").style.display = "none";
    document.getElementById("result-box").style.display = "block";

    const animal = totemAnimals[winningIndex];
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

    document.getElementById("totem-name").innerText = animal.fullName;
    document.getElementById("totem-img").src = animal.img;
    document.getElementById("totem-quote").innerText = randomQuote;
    document.getElementById("totem-desc").innerText = animal.desc;

    // Zene automatikus indítása
    const audioBox = document.getElementById("audio-box");
    audioBox.innerHTML = `
        <audio controls autoplay style="width:100%; filter: sepia(100%) contrast(150%);">
            <source src="${animal.audio}" type="audio/mpeg">
            Your browser does not support audio.
        </audio>
    `;
}
