// script.js
const textInput = document.getElementById("text");
const speakButton = document.getElementById("speak");
const downloadButton = document.getElementById("download");
const pitchInput = document.getElementById("pitch");
const rateInput = document.getElementById("rate");
const audioElement = document.getElementById("audio");
let audioChunks = [];

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

// Modify the downloadAudio function
function downloadAudio() {
    const text = document.getElementById("text").value;
    const pitch = parseFloat(document.getElementById("pitch").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const voiceSelect = document.getElementById("voice");
    const selectedVoiceIndex = voiceSelect.options[voiceSelect.selectedIndex].value;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.voice = window.speechSynthesis.getVoices()[selectedVoiceIndex];

    // Synthesize the speech
    speechSynthesis.speak(utterance);

    // Wait for the audio to be ready
    utterance.onend = function () {
        // Create a Blob directly from the audio data
        const blob = new Blob([utterance.audioData], { type: 'audio/mpeg' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Set the download link's attributes and trigger the download
        const downloadLink = document.getElementById("downloadLink");
        downloadLink.href = url;
        downloadLink.download = "speech.mp3";
        downloadLink.style.display = "none"; // Hide the link
        downloadLink.click(); // Trigger the download
    };
}
speakButton.addEventListener("click", speakText);
downloadButton.addEventListener("click", downloadAudio);
