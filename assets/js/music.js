const audio = new Audio();
audio.src = "./assets/music/ss.mp3";
audio.volume = 1.0;
audio.loop = true; 

let isPlaying = false;

function startMusic() {
    if (isPlaying) return;
    isPlaying = true;

    audio.play().catch(err => {
        console.error("Play error:", err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
});

window.MusicPlayer = {
    start: startMusic,
    getAudio: () => audio
};
