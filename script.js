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

function playAudio() {
    const text = document.getElementById('text').value;
    const pitch = parseFloat(document.getElementById('pitch').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const voiceSelect = document.getElementById('voice');
    const selectedVoiceIndex = voiceSelect.options[voiceSelect.selectedIndex].value;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, pitch, rate }),
    };

    fetch('/tts', requestOptions)
        .then((response) => response.json())
        .then((data) => {
            const audioUrl = data.audioUrl;
            const audio = document.getElementById('audio');
            audio.src = audioUrl;
            audio.style.display = 'block'; // Show the audio player
            audio.play(); // Play the audio
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Event listener for the speak button
document.getElementById('speak').addEventListener('click', () => {
    // Generate and play the audio
    playAudio();
});
speakButton.addEventListener("click", playAudio);

