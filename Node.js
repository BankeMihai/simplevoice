const express = require("express");
const bodyParser = require("body-parser");
const gtts = require("node-gtts");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/tts", (req, res) => {
    const text = req.body.text;
    const pitch = req.body.pitch || 1;
    const rate = req.body.rate || 1;
    const gttsStream = gtts(text, "en");
    gttsStream.pipe(res);

    // Optionally, you can save the speech to a file
    const outputFile = "output.mp3";
    gtts(text, "en", pitch, rate).save(outputFile, () => {
        console.log(`Speech saved to ${outputFile}`);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
