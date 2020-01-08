// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('./utils/passport');
const mongoose = require('mongoose');
const path = require('path');
const app = express()
const routes = require("./controllers");
const PORT = process.env.PORT || 8080
const io = require('socket.io')();



io.on("connection", socket => {
	console.log("new client");
	socket.join('game room');

	socket.on("incoming data", (data)=>{
		socket.to('game room').emit("outgoing data", {num: data});
	})
});

const axios = require("axios");
const questionArray = [];


function broadcastQuestion() {

        axios.get('https://opentdb.com/api.php?amount=50').then((response) => {
    questionArray.push(response.data.results[0]);
    // console.log(questionArray);
    let broadcastedQuestion = questionArray[Math.floor(Math.random() * questionArray.length)];
    console.table('Category: ' + broadcastedQuestion.category);
    console.table('Difficulty: ' + broadcastedQuestion.difficulty);
    console.table('Question: ' + broadcastedQuestion.question);
    console.table('Answers: ' + broadcastedQuestion.correct_answer + ','
     + broadcastedQuestion.incorrect_answers);

    io.to('game room').emit("incoming data", broadcastedQuestion);
    

    })

    

    
        

    

}
setInterval(broadcastQuestion, 2000)



const socketPort = 8000;
io.listen(socketPort);
console.log('listening on port ', socketPort);



// ===== Middleware ====
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/projectthree",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser


// ==== if its production environment!
if (process.env.NODE_ENV === "production") {
	console.log("Prod Mode Enabled")
	app.use(express.static("client/build"));
}

// ====== Routing & Controllers =====
app.use(routes);


// ====== React App ======
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// ====== Error handler ====
app.use(function (err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})



// ==== Starting Server =====

// io.on('connect', function (socket) {
// 	console.log('a user connected');
// 	socket.on('disconnect', function () {
// 	  console.log('user disconnected');
// 	});
//   });

app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
