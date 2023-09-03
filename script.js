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

    // Create an audio element
    const audio = new Audio();
    audio.src = URL.createObjectURL(new Blob([utterance.text], { type: 'audio/mpeg' }));

    // Set the audio element to be autoplay (to prevent speech from playing)
    audio.autoplay = false;

    // Add a listener to wait for audio to load
    audio.addEventListener('loadeddata', () => {
        // Set the download link's attributes and trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = audio.src;
        downloadLink.download = "speech.mp3";
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // Clean up the audio element and URL object
        URL.revokeObjectURL(audio.src);
    });

    // Load the audio
    audio.load();
}


speakButton.addEventListener("click", speakText);
downloadButton.addEventListener("click", downloadAudio);
