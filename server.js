const express = require('express');
const app = express();
const expressValidator = require('express-validator');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const url = require('./config/config');
const cors = require('cors');
const PORT = process.env.PORT || 3000 ;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/',routes);
app.use(cors());

// app.use(express.json());
// app.use(expressValidator({
//     errorFormatter: function (param, msg, value) {
// 		var namespace = param.split('.')
// 			, root = namespace.shift()
// 			, formParam = root;

// 		while (namespace.length) {
// 			formParam += '[' + namespace.shift() + ']';
// 		}
// 		return {
// 			param: formParam,
// 			msg: msg,
// 			value: value
// 		};
// 	},
// 	customValidators: {
// 		isArray: function (value) {
// 			return Array.isArray(value);
// 		},
// 		gte: function (param, num) {
// 			return param >= num;
// 		}
// 	}
// }));



app.listen(PORT,() => {
    console.log('Listening on Port '+PORT);
});

startMongo(url);                          

function startMongo() {
    const mongoose = require('mongoose');        
    mongoose.connect(url, { useCreateIndex: true, useNewUrlParser: true }); 
    const db = mongoose.connection;              

    db.on('error', () => {                       
        console.error('connection error with mongodb...');
        process.exit(0);                       
    })

    db.once('open', () => {                       
        console.log('MongoDB is connected');
    })
}

module.exports = app;