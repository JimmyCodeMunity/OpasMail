const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;


//add a middleware to parse json requests
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send("Mail Server up and running");
})
app.get('/sent', (req,res)=>{
    res.send("Mail sent");
})

// Define a route to handle incoming messages
app.post('/send-mail', (req, res) => {
    const { from,subject, text } = req.body;

    // Create a transporter using your email provider's details
    const transporter = nodemailer.createTransport({
        // host: 'smtp.gmail.com',
        host: 'mail.resellersprint.com',
        port:465,
        secure:true,
        auth: {
            // user: 'ghostbmer@gmail.com', // replace with your email
            // pass: 'cofupbixpcurcvvb' // replace with your password
            user: 'contact@resellersprint.com', // replace with your email
            pass: 'Great-2030-' // replace with your password
        }
    });

    // Define the email options
    const mailOptions = {
        from,
        to:'dev.jimin02@gmail.com',
        subject,
        text
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }

        res.status(200).send('Email sent: ' + info.response);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
