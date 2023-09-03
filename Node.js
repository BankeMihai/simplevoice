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

    // Use node-gtts to generate audio and send it as a response
    const gttsStream = gtts(text, "en");
    res.setHeader("Content-Type", "audio/mpeg");
    gttsStream.pipe(res);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
