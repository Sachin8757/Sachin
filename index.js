require('dotenv').config({fetch: true});
var express = require('express');
var app = express();
const path = require('path');

const port = process.env.PORT || 3000;
const DSAQuestion=require("./model/DSAQuestion.js")
const connetion=require("./config/connction.js")

const contactQueries = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


app.get('/', function (req, res) {
  res.render('index');
});

// this page help to add question in my protfolio 
app.get("/add", (req, res) => {
    res.render("addDSA.ejs");
});

app.post("/admin/questions/add", async (req, res) => {
    try {
        const {
            leetcodeNumber,
            title,
            difficulty,
            description,
            code,
            language,
            topics,
            leetcodeUrl,
            githubUrl
        } = req.body;

        // Convert topics string into array
        const topicArray = topics
            ? topics.split(",").map(topic => topic.trim())
            : [];

        const question = new DSAQuestion({
            leetcodeNumber,
            title,
            difficulty,
            description,
            code,
            language,
            topics: topicArray,
            leetcodeUrl,
            githubUrl
        });

        await question.save();

        res.redirect("/dsa");

    } catch (error) {
        console.error("Error adding DSA question:", error);

        res.status(500).send("Failed to add DSA question");
    }
});

// this page help to show all solve dsa quetion 
app.get("/dsa", async (req, res) => {
    try {
        const questions = await DSAQuestion
            .find()
            .sort({ leetcodeNumber: 1 });

        const total = questions.length;

        const easy = questions.filter(
            question => question.difficulty === "Easy"
        ).length;

        const medium = questions.filter(
            question => question.difficulty === "Medium"
        ).length;

        const hard = questions.filter(
            question => question.difficulty === "Hard"
        ).length;

        res.render("dsa", {
            questions,
            total,
            easy,
            medium,
            hard
        });

    } catch (error) {
        console.error("Error fetching DSA questions:", error);
        res.status(500).send("Unable to load DSA questions");
    }
});

app.get("/dsa/:id", async (req, res) => {
    try {
        const question = await DSAQuestion.findById(req.params.id);

        if (!question) {
            return res.status(404).send("DSA question not found");
        }

        res.render("ShowDSA.ejs", {
            question
        });

    } catch (error) {
        console.error("Error fetching DSA question:", error);

        res.status(500).send("Server Error");
    }
});













app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        contactQueries.push({
            name,
            email,
            message,
            date: new Date()
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.TO_USER,
            replyTo: email,
            subject: `New Portfolio Contact Message from ${name}`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Message:</strong></p>
                <p>${message}</p>

                <hr>
                <p>Sent from your portfolio website.</p>
            `
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Thank you for contacting me, ${name}`,
            html: `
                <p>Dear ${name},</p>
                <p>Thank you for reaching out to me. I have received your message and will get back to you as soon as possible.</p>
                <p>Best regards,</p>
                <p>Sachin Kumar</p>
            `
        });

        res.redirect("/");
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).send("Failed to send message");
    }
});



app.get('/show', (req, res) => {
  res.json(contactQueries);
});



app.listen(port, () => {
  console.log("app running...");
});