const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true, // need mic
        video: false, // need webcam
    });
    video.srcObject = stream;
    video.play();
};

startBtn.addEventListener("click", handleStart);