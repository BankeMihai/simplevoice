const textToSpeechInput = document.getElementById('text-to-speech-input');
const speakButton = document.getElementById('speak-button');
const audioPlayer = document.getElementById('audio-player');

speakButton.addEventListener('click', () => {
    const text = textToSpeechInput.value.trim();
    if (text !== '') {
        // Send the text to the server to generate an audio file
        fetch('/synthesize', {
            method: 'POST',
            body: JSON.stringify({ text }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.blob())
        .then(blob => {
            // Create an object URL for the audio blob
            const audioURL = URL.createObjectURL(blob);
            
            // Set the audio player source and play it
            audioPlayer.src = audioURL;
            audioPlayer.play();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
