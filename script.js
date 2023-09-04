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

// Event listener for the download button
downloadButton.addEventListener("click", async () => {
    const text = textInput.value;
    const pitch = parseFloat(document.getElementById("pitch").value);
    const rate = parseFloat(document.getElementById("rate").value);

    try {
        const response = await fetch("/tts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text, pitch, rate }),
        });

        if (response.ok) {
            const blob = await response.blob();

            // Create a URL for the Blob
            const audioUrl = URL.createObjectURL(blob);

            // Set the download link's attributes and trigger the download
            const downloadLink = document.getElementById("downloadLink");
            downloadLink.href = audioUrl;
            downloadLink.download = "speech.mp3";
            downloadLink.style.display = "block"; // Show the link
        } else {
            console.error("Failed to generate audio:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error generating audio:", error);
    }
});


speakButton.addEventListener("click", speakText);

