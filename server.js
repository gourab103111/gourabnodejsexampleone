require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const path = require('path');


//const fileUpload = require('express-fileupload');
const formidableMiddleware = require('express-formidable');
const session = require('express-session');


/*app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());*/

const oneDay = 1000 * 60 * 60 * 24;

const uploadFolder = path.join(__dirname, "../node_mysql/data");

/*
app.use(formidableMiddleware({
  encoding: 'utf-8',
  uploadDir: uploadFolder,
  multiples: true,
}));*/

app.use(formidableMiddleware());

app.use(session({

    secret: '881d613e67e64457be016c618539babe',
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false

}));


app.use(cors());


 app.use('/media', express.static(__dirname + '/media'));
  app.use(express.static(__dirname + '/public'));


// api routes
app.use('/users', require('./users/users.controller'));

app.use('/', require('./home/home.controller'));

// global error handler
app.use(errorHandler);




// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));