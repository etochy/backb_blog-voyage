// var nodemailer = require('nodemailer');

const PASSWORD = process.env.MDP_EMAIL || "";
const EMAIL = process.env.EMAIL || "";

var transporter = null;

function envoi_mail(req, res) {
    var contenu = req.body;

    console.log(EMAIL);

    res.status(204).send(EMAIL);
/*
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    });

    var mailOptions = {
        from: EMAIL,
        to: 'esteban.launay.pro@gmail.com',
        subject: contenu.sujet,
        text: contenu.mail + ' : \n' + contenu.message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(503).send('Error when sending mail');
        } else {
            console.log('Email sent: ' + info.response);

            mailOptions.to = contenu.mail;
            mailOptions.text = "Vous avez essayé de me contacter par email : \n\n" +
                "'" + contenu.message + "' \n\n" +
                "Je vous recontacte dès que possible. \n\nCordialement, Esteban Launay";
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(503).send('Error when sending mail');
                } else {
                    res.status(204).send('Mail ok');
                }
            });
        }
    });*/
}

module.exports.envoi_mail = envoi_mail;
