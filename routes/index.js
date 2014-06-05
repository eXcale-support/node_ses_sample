var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {

  var transport = nodemailer.createTransport(
    'SES',
    {
      AWSAccessKeyID: "AWSAccessKeyID",                      // AWS Access key ID を設定
      AWSSecretKey: "AWSSecretKey",                          // AWS Secret access key を設定
      ServiceUrl: "https://email.us-east-1.amazonaws.com"    // SES の endpoint を設定
    }
  );

  var mailOptions = {
    from: 'from@example.com',                                // 送信元メールアドレスを設定
    to: 'to@example.com',                                    // 送信先メールアドレスを設定
    subject: '[Message from Mail Form]',
    text: "[name]\n"
      + req.body.name + "\n\n"
      + "[content]\n"
      + req.body.content
  };
                            
  transport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.send("Error!");
    }else{
      console.log("Message sent: " + response.message);
      res.send("Message sent!");
    }
  });
});

module.exports = router;
