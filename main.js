document.addEventListener("DOMContentLoaded", () => {
    // Megadott direkt hirdetési link
    const directAdLink = "https://www.effectivecpmnetwork.com/vnenqyicb?key=4d43da1c5fc88a3ee9c22caada6d224f";

    // Totemállatok adatbázisa
    const totems = [
        {
            name: "Fox",
            quote: "A sharp mind and swift adaptability overcome every obstacle.",
            desc: "The fox spirit brings cleverness, flexibility, and resourcefulness into your life. It teaches you how to find a way out of even the most complex situations.",
            img: "fox.jpg",
            audio: ""
        },
        {
            name: "Bison",
            quote: "Abundance, endurance, and profound respect for the Earth.",
            desc: "The bison embodies ancient strength and abundance. It reminds you to stay grateful for everything you have and press forward with unwavering perseverance.",
            img: "bison.jpg",
            audio: ""
        },
        {
            name: "Raven",
            quote: "The gateway of change is open; step through the mysteries.",
            desc: "The raven is the harbinger of magic, turning points, and creation. It helps you uncover the secrets of your subconscious and embrace transformation.",
            img: "raven.jpg",
            audio: ""
        },
        {
            name: "Wolf",
            quote: "The wolf is the guardian of inner instincts, loyalty, and community strength.",
            desc: "The wolf spirit guide teaches you to trust your inner voice and intuition. Strong bonds tie you to your family and community, yet you maintain your fierce independence.",
            img: "wolf.jpg",
            audio: ""
        },
        {
            name: "Eagle",
            quote: "Soar high above and perceive even the finest details of the universe.",
            desc: "The eagle totem symbolizes clarity, spiritual awareness, and a higher perspective. It empowers you to rise above everyday challenges and view the bigger picture.",
            img: "Eagle.jpg",
            audio: ""
        },
        {
            name: "Bear",
            quote: "True strength is rooted in inner stillness and deliberation.",
            desc: "The bear is a symbol of courage, healing, and introspection. It shows you when to pull back and gather strength, and when to step forward with determination.",
            img: "bear.jpg",
            audio: ""
        },
        {
            name: "Stag",
            quote: "Walk the paths of life with grace, gentleness, and resolve.",
            desc: "The stag represents grace, watchfulness, and nobility. It encourages you to approach obstacles with gentleness and dignity.",
            img: "stag.jpg",
            audio: ""
        },
        {
            name: "Owl",
            quote: "Wisdom dwells where darkness meets the light.",
            desc: "The owl is the keeper of the night, hidden truths, and deep wisdom. It helps you look past illusions and perceive reality clearly.",
            img: "owl.jpg",
            audio: ""
        }
    ];

    const canvas = document.getElementById("wheelCanvas");
    const ctx = canvas.getContext("2d");
    const spinBtn = document.getElementById("spin-btn");
    const resultBox = document.getElementById("result-box");
    const retryBtn = document.getElementById("retry-btn");
    const downloadBtn = document.getElementById("download-btn");
    
    const totemName = document.getElementById("totem-name");
    const totemImg = document.getElementById("totem-img");
    const totemQuote = document.getElementById("totem-quote");
    const totemDesc = document.getElementById("totem-desc");
    const audioBox = document.getElementById("audio-box");
    const shareFb = document.getElementById("share-fb");
    const sharePin = document.getElementById("share-pin");

    const numSlices = totems.length;
    const sliceAngle = (2 * Math.PI) / numSlices;
    const colors = ["#9b4f2f", "#d7a83d", "#7c3826", "#c8aa7b", "#5b2a1c", "#b76a32", "#3c2115", "#e8c98b"];

    let currentRotation = 0;
    let isSpinning = false;

    // Kerék kirajzolása
    function drawWheel() {
        const center = canvas.width / 2;
        const radius = canvas.width / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        totems.forEach((totem, index) => {
            const startAngle = index * sliceAngle;
            const endAngle = startAngle + sliceAngle;

            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.arc(center, center, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = colors[index % colors.length];
            ctx.fill();
            ctx.strokeStyle = "#1b100d";
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.save();
            ctx.translate(center, center);
            ctx.rotate(startAngle + sliceAngle / 2);
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff2cc";
            ctx.font = "bold 15px Georgia";
            ctx.fillText(totem.name, radius - 25, 5);
            ctx.restore();
        });
    }

    drawWheel();

    // Forgatás és reklámkezelés
    spinBtn.addEventListener("click", () => {
        if (isSpinning) return;
        
        // Hirdetés megnyitása új ablakban/fülön, hogy a főoldal ne navigáljon el
        window.open(directAdLink, '_blank');

        isSpinning = true;
        spinBtn.disabled = true;
        resultBox.style.display = "none";

        const selectedIndex = Math.floor(Math.random() * numSlices);
        const sliceDeg = 360 / numSlices;
        const targetSliceCenter = (selectedIndex * sliceDeg) + (sliceDeg / 2);
        
        const extraSpins = 360 * 5;
        const targetRotation = extraSpins + (360 - targetSliceCenter) + 270;

        currentRotation += (targetRotation - (currentRotation % 360));
        canvas.style.transform = `rotate(${currentRotation}deg)`;

        setTimeout(() => {
            isSpinning = false;
            spinBtn.disabled = false;
            showResult(selectedIndex);
        }, 4000);
    });

    // Eredmény megjelenítése
    function showResult(index) {
        const selectedTotem = totems[index];

        totemName.textContent = selectedTotem.name;
        totemImg.src = selectedTotem.img;
        totemQuote.textContent = `"${selectedTotem.quote}"`;
        totemDesc.textContent = selectedTotem.desc;

        if (selectedTotem.audio) {
            audioBox.innerHTML = `
                <audio controls src="${selectedTotem.audio}"></audio>
                <div class="audio-note">Listen to your spirit guide's voice</div>
            `;
            audioBox.style.display = "block";
        } else {
            audioBox.innerHTML = "";
            audioBox.style.display = "none";
        }

        const shareUrl = encodeURIComponent(window.location.href);
        const shareText = encodeURIComponent(`My spirit animal is the ${selectedTotem.name}! Find out your sacred totem too.`);
        
        shareFb.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        sharePin.href = `https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareText}&media=${encodeURIComponent(selectedTotem.img)}`;

        resultBox.style.display = "block";
        resultBox.scrollIntoView({ behavior: "smooth" });
    }

    retryBtn.addEventListener("click", () => {
        resultBox.style.display = "none";
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Kártya letöltése képtorzulás nélkül
    downloadBtn.addEventListener("click", () => {
        const captureCard = document.getElementById("capture-card");
        downloadBtn.textContent = "⌛ Generating Download...";
        downloadBtn.disabled = true;

        html2canvas(captureCard, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#2b1810"
        }).then(canvasImage => {
            const link = document.createElement("a");
            link.download = "my-spirit-totem.png";
            link.href = canvasImage.toDataURL("image/png");
            link.click();

            downloadBtn.textContent = "📥 Download Card";
            downloadBtn.disabled = false;
        }).catch(err => {
            console.error("Error capturing card:", err);
            downloadBtn.textContent = "📥 Download Card";
            downloadBtn.disabled = false;
        });
    });
});
