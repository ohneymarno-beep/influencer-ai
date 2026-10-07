const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/ai", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await client.responses.create({
            model: "gpt-5",
            input: message
        });

        res.json({
            response: response.output_text
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Erro ao falar com a IA."
        });
    }
});

app.listen(3000, () => {
    console.log("INFLUENCER AI rodando em http://localhost:3000");
});