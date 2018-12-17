var nodemailer = require('nodemailer');
var mongoose = require('mongoose'),
    Message = mongoose.model('Message');


function creer_message(req, res) {
    var new_message = new Message(req.body);
    new_message.save(function (err, message) {
        if (err)
            res.send(err);
        else
            res.json(message);
    });
}

function get_all_messages(req, res) {
    Message.find({}).sort({ date: 'desc' }).exec(function (err, message) {
        if (err)
            res.send(err);
        res.json(message);
    });
}

function update_a_message(req, res){
    var _mes = new Ressource(req.body);
    Message.findOne({ akRessource: req.params.idMessage }, function (err, mes) {
        if (err)
            res.send(err);
        else {
            mes.vu = _mes.vu;
            mes.save(function (err, mes) {
                if (err)
                    res.send(err);
                res.json(mes);
            });
        }
    });
}

const PASSWORD = process.env.MDP_EMAIL || "";
const EMAIL = process.env.EMAIL || "";

var transporter = null;
transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});

function envoi_mail(req, res) {
    var contenu = req.body;
    
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
    });
}

module.exports.envoi_mail = envoi_mail;

module.exports.creer_message = creer_message;
module.exports.get_all_messages = get_all_messages;
module.exports.update_a_message = update_a_message;
