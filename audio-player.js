// audio-player.js - Ambient Soundscape Player

const audioTracks = {
    lion: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=savannah-ambient-11234.mp3",
    wolf: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_845b5db30e.mp3?filename=night-forest-wind-11142.mp3",
    eagle: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=mountain-wind-ambient-14285.mp3",
    panther: "https://cdn.pixabay.com/download/audio/2021/08/09/audio_8b8b80e468.mp3?filename=jungle-night-ambient-9843.mp3"
};

window.playSpiritAudio = function(animalKey) {
    const container = document.getElementById('audio-container');
    const audioUrl = audioTracks[animalKey] || audioTracks.lion;

    container.innerHTML = `
        <div style="background: #0f172a; padding: 10px; border-radius: 8px; border: 1px solid #334155;">
            <p style="font-size: 11px; color: #f59e0b; margin: 0 0 5px 0;">🎵 Now Playing Nature Ambience</p>
            <audio controls autoplay style="width: 100%; height: 35px;">
                <source src="${audioUrl}" type="audio/mpeg">
                Your browser does not support audio playback.
            </audio>
        </div>
    `;
};
