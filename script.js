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
// Function to generate and download audio
// Function to generate and download audio
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

    // Create a new AudioContext to access the audio data
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Wait for the audio to be ready
    utterance.onend = async function () {
        const audioBuffer = audioContext.createBufferSource();
        audioBuffer.buffer = audioContext.createBuffer(1, utterance.audioBuffer.length, audioContext.sampleRate);
        audioBuffer.buffer.getChannelData(0).set(utterance.audioBuffer);

        // Create a Blob from the audioBuffer
        try {
            const blob = await audioBufferToBlob(audioBuffer.buffer);
            const audioUrl = URL.createObjectURL(blob);

            // Set the download link's attributes and trigger the download
            const downloadLink = document.getElementById("downloadLink");
            downloadLink.href = audioUrl;
            downloadLink.download = "speech.mp3";
            downloadLink.style.display = "block"; // Show the link
        } catch (error) {
            console.error("Error creating Blob:", error);
        }
    };
}

// Function to convert an AudioBuffer to a Blob
function audioBufferToBlob(buffer) {
    return new Promise((resolve, reject) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const destination = audioContext.createMediaStreamDestination();
        const recorder = new MediaRecorder(destination.stream);

        recorder.ondataavailable = (e) => {
            resolve(e.data);
            audioContext.close();
        };

        recorder.onstop = () => {
            audioContext.close();
        };

        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(destination);
        source.start();
        recorder.start();
        recorder.stop();
    });
}

speakButton.addEventListener("click", speakText);
downloadButton.addEventListener("click", downloadAudio);
