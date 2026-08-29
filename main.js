// Adsterra Direct Link
const ADSTERRA_DIRECT_LINK = "https://www.effectivecpmnetwork.com/vnenqyicb?key=4d43da1c5fc88a3ee9c22caada6d224f";

// 30 másodperces időzítő (Cooldown) a reklámhoz
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

// Kizárólag fenséges vadállatok és hiteles képek
const totemAnimals = [
    {
        name: "The Mighty Wolf",
        img: "https://images.pexels.com/photos/162256/wolf-predator-canis-lupus-wildlife-162256.jpeg?auto=compress&cs=tinysrgb&w=800",
        desc: "The wolf represents deep intuition, sharp intelligence, and a strong sense of community. When the wolf is your totem, you trust your inner voice above all else.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        name: "The Golden Eagle",
        img: "https://images.pexels.com/photos/133459/pexels-photo-133459.jpeg?auto=compress&cs=tinysrgb&w=800",
        desc: "The eagle flies high above the earth, possessing clear vision and divine connection. It teaches you to look beyond daily struggles and focus on your highest goals.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        name: "The Sacred Bear",
        img: "https://images.pexels.com/photos/35435/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
        desc: "The bear brings profound strength, courage, and grounding energy. It stands as a guardian of healing and deep inner reflection during times of change.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        name: "The Wise Owl",
        img: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800",
        desc: "The owl sees through darkness and hidden truths. As a totem, it grants you wisdom, silent observation, and the ability to uncover mysteries.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        name: "The Royal Lion",
        img: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800",
        desc: "The lion embodies supreme leadership, personal power, and fearless protection. It reminds you of the royal courage beating within your chest.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        name: "The Swift Panther",
        img: "https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=800",
        desc: "The panther walks in shadow and light with complete confidence. It represents rebirth, reclaiming your personal power, and acting with stealth and agility.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    }
];

// Véletlenszerű motivációs / indián bölcsességi üzenetek
const motivationalQuotes = [
    "\"Walk softly through life, but let your spirit roar like thunder.\"",
    "\"Listen to the wind, for it carries the voice of your ancestors.\"",
    "\"A brave heart is worth more than a thousand shields.\"",
    "\"Do not look back; the path forward is illuminated by your own inner fire.\"",
    "\"Like the mountain, stand unshakeable against the storms of doubt.\"",
    "\"Your soul knows the way. Trust the journey of the wild.\""
];

document.addEventListener("DOMContentLoaded", () => {
    const spinBtn = document.getElementById("spin-btn");
    const retryBtn = document.getElementById("retry-btn");

    spinBtn.addEventListener("click", () => {
        handleAdTrigger();
        spinWheel();
    });

    retryBtn.addEventListener("click", () => {
        handleAdTrigger();
        spinWheel();
    });
});

function spinWheel() {
    const spinBtn = document.getElementById("spin-btn");
    spinBtn.innerText = "Consulting Ancestors...";
    spinBtn.disabled = true;

    // Kis vizuális késleltetés a pörgetés érzékeltetésére
    setTimeout(() => {
        showRandomTotem();
        spinBtn.innerText = "Spin the Totem Wheel 🪶";
        spinBtn.disabled = false;
    }, 600);
}

function showRandomTotem() {
    // Elrejtjük a gombot, megmutatjuk a kártyát
    document.getElementById("wheel-container").style.display = "none";
    document.getElementById("result-box").style.display = "block";

    // Véletlenszerű állat kiválasztása
    const randomAnimal = totemAnimals[Math.floor(Math.random() * totemAnimals.length)];
    
    // Véletlenszerű motivációs üzenet kiválasztása
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

    // Adatok beillesztése a kártyára
    document.getElementById("totem-name").innerText = randomAnimal.name;
    document.getElementById("totem-img").src = randomAnimal.img;
    document.getElementById("totem-quote").innerText = randomQuote;
    document.getElementById("totem-desc").innerText = randomAnimal.desc;

    // Zene automatikus elindítása
    const audioBox = document.getElementById("audio-box");
    audioBox.innerHTML = `
        <audio controls autoplay style="width:100%; filter: sepia(100%) contrast(150%);">
            <source src="${randomAnimal.audio}" type="audio/mpeg">
            Your browser does not support audio.
        </audio>
    `;
}
