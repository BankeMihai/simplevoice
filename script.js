// script.js
const textInput = document.getElementById("text");
const speakButton = document.getElementById("speak");
const downloadButton = document.getElementById("download");
const pitchInput = document.getElementById("pitch");
const rateInput = document.getElementById("rate");
const audioElement = document.getElementById("audio");

// Define a list of available voices
const availableVoices = [
    { name: "Voice 1", lang: "en-US" },
    { name: "Voice 2", lang: "en-GB" },
    { name: "Voice 3", lang: "es-ES" }
];

// Function to populate the voice selection dropdown
function populateVoiceDropdown() {
    const voiceSelect = document.getElementById("voice");

    availableVoices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.text = voice.name;
        voiceSelect.appendChild(option);
    });
}

// Function to speak the entered text using the selected voice
function speakText() {
    const text = document.getElementById("text").value;
    const pitch = parseFloat(document.getElementById("pitch").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const voiceSelect = document.getElementById("voice");
    const selectedVoiceIndex = voiceSelect.options[voiceSelect.selectedIndex].value;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.voice = window.speechSynthesis.getVoices()[selectedVoiceIndex];
    speechSynthesis.speak(utterance);
}

function initializeVoices() {
    const voices = speechSynthesis.getVoices();
    const voiceSelect = document.getElementById("voice");
    voiceSelect.innerHTML = "";
    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = voice.name;
        voiceSelect.appendChild(option);
    });
}

// Initialize voices when the page loads
window.addEventListener("load", () => {
    initializeVoices();
});

function downloadAudio() {
    const text = document.getElementById("text").value;
    const pitch = parseFloat(document.getElementById("pitch").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const voiceSelect = document.getElementById("voice");
    const selectedVoiceIndex = voiceSelect.options[voiceSelect.selectedIndex].value;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.voice = speechSynthesis.getVoices()[selectedVoiceIndex];

    // Prevent the speech from playing
    utterance.volume = 0;

    // Synthesize the speech
    speechSynthesis.speak(utterance);

    // Wait for the audio to be ready
    utterance.onend = function () {
        // Set the download link's href to the audio data URL
        const audioBlob = new Blob([new Uint8Array(utterance.audioBuffer)], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);
        const downloadLink = document.getElementById("downloadLink");
        downloadLink.href = audioUrl;
        downloadLink.download = "speech.mp3";
        downloadLink.style.display = "block"; // Show the link
    };
}

// ... (previous code)

// Event listener for the speak button
document.getElementById("speak").addEventListener("click", () => {
    // Ensure the download link is hidden
    const downloadLink = document.getElementById("downloadLink");
    downloadLink.style.display = "none";

    // Generate and download the audio
    downloadAudio();
});

speakButton.addEventListener("click", speakText);
downloadButton.addEventListener("click", downloadAudio);
