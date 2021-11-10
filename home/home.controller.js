const express = require('express');
const router = express.Router();
const Joi = require('joi');



const nodemailer = require('nodemailer');
const validateRequest = require('_middleware/validate-request');
//const authorize = require('_middleware/authorize')
//const userService = require('./user.service');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');






// routes
//router.post('/authenticate', authenticateSchema, authenticate);
//router.post('/register', registerSchema, register);

//router.post('/sendemail', sendemailSchema , sendemail);

//router.get('/getUser',  getUsers);
//router.get('/getLogin',  getUsers);

//router.get('/', authorize(), getAll);
//router.get('/current', authorize(), getCurrent);
//router.get('/:id', authorize(), getById);
//router.put('/:id', authorize(), updateSchema, update);
//router.delete('/:id', authorize(), _delete);


router.get('/',  getHomePage);
router.get('/abotus',  getAboutus);
router.get('/contact-us',  getContactUs);

module.exports = router;


const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'orionsoftechorionmobile@gmail.com',
        pass: 'Password@123',
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});



function getHomePage(req, res, next) {

res.sendFile(path.join(__dirname, '/index.html'));

    }

    function getContactUs(req, res, next) {

res.sendFile(path.join(__dirname, '/contactus.html'));

    }


    function getAboutus(req, res, next) {

res.sendFile(path.join(__dirname, '/abotus.html'));

    }



function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

function sendemailSchema(req, res, next) {
    const schema = Joi.object({
        to: Joi.string().required(),
        subject: Joi.string().required(),
         text: Joi.string().required()
      
    });
    validateRequest(req, next, schema);
}

function getUsers(req, res, next){


res.status(200).json([
    
    { 
    name: 'Gourab Singha',
    class:'Class 1',
    },

    { 
    name: 'Indranil Pujari',
    class:'Class 1',
    }

    ]);


}

function sendemail(req, res, next) {

    //  res.status(200).json({ message: 'Response send to you' });

  const file = req.files.samplefuiles;
  //console.log( file);

 console.log(file.path);

  const fields = req.fields;


  let session=req.session;

  if(session.emial_send){
   delete req.session.emial_send;
  

  }else {

    session.emial_send = true;


  }
  

 

        const {to, subject, text } = req.fields;
    const mailData = {
        from: 'orionsoftechorionmobile@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: text,
    };



    if(false){


    

   
const uploadFolder = path.join(__dirname, "../uploads", "file_upload","image1.png");

     var form = new formidable.IncomingForm();
     form.multiples = true;
     form.maxFileSize = 50 * 1024 * 1024; // 5MB
     form.uploadDir = uploadFolder;
 


     fs.copyFile(file.path, uploadFolder , function (err) {
 if (err) {

res.status(200).json({ message: 'File Not uploaded, Email not send' });

   }
   else{




 var attachments2 = [

              {  
                 filename: 'image1.png',
                  content: fs.createReadStream(file)
              }

       ];

mailData.attachments = attachments2;





   }
});


 }



if(true){


     var attachments2 = [

              {  
                 filename: 'image1.png',
                  content: fs.createReadStream(file.path)
              }

       ];

mailData.attachments = attachments2;



     transporter.sendMail(mailData, (error, info) => {
        if (error) {
            res.status(200).json({ message: 'File Uploaded and email is send 1' });
        }
        else {
            res.status(200).json({ message: 'File Uploaded and email is send 2' });
        }
    });


 }

   
    // console.log(file.path);

   




}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}