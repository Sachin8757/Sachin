require('dotenv').config({fetch: true});
var express = require('express');
var app = express();
const path = require('path');

const port = process.env.PORT || 3000;

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

// app.post('/contact', function (req, res) {
//   let { name, email, message } = req.body;

//   contactQueries.push({
//     name: name,
//     email: email,
//     message: message,
//     date: new Date()
//   });

//   res.redirect('/');
// });

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