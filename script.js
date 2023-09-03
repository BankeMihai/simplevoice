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

    // Create a media stream from the speech synthesis audio
    const audioStream = new MediaStream();
    const audioTrack = new MediaStreamTrack({ kind: "audio" });
    audioStream.addTrack(audioTrack);

    // Synthesize the speech and capture audio chunks
    utterance.audioStream = audioStream;
    speechSynthesis.speak(utterance);

    // Create a MediaRecorder to capture audio data
    const mediaRecorder = new MediaRecorder(audioStream);

    // When data is available, store it in audioChunks
    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            audioChunks.push(event.data);
        }
    };

    // When recording stops, create a Blob and download it
    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
        const url = URL.createObjectURL(audioBlob);

        const downloadLink = document.getElementById("downloadLink");
        downloadLink.href = url;
        downloadLink.download = "speech.mp3";
        downloadLink.style.display = "none";
        downloadLink.click();

        // Clear audioChunks for future use
        audioChunks = [];
    };

    // Start recording
    mediaRecorder.start();

    // Wait for the audio to finish
    utterance.onend = () => {
        // Stop recording
        mediaRecorder.stop();
    };
}
speakButton.addEventListener("click", speakText);
downloadButton.addEventListener("click", downloadAudio);
