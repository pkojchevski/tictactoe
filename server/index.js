const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const { getGame, closeGame } = require('./controllers/game')


const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http)

const userRoutes = require('./router/user')
const gameRoutes = require('./router/game')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Connect to database 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected...'))
    .catch(err => console.log('Error connecting database',err));

//To remove depreceate warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


// routes middleware
app.use('/api', userRoutes);
app.use('/api', gameRoutes);


// Open Socket io Connection
io.on('connection', (socket) => {
    // user join register 
    let click = null
    socket.on('join', async gameId =>{
        socket.join(gameId);
        const game = await getGame(gameId)

        if ( game && game.noOfUsers == 1 ) {
            io.to(gameId).emit('waitingSecondPlayer', {game});
        }

        if ( game && game.noOfUsers == 2 ) {
            io.to(gameId).emit('startGame', {game});
        }
    })

    socket.on('squareClicked' , ( {i , username , gameId} ) => {
        click = {
			i,
			username,
            gameId
		};
        console.log(`${username} clicked ${i} square in game ${gameId}`);
        io.to(gameId).emit('squareClickedReceived' , click );
    })

    socket.on('playAgain' , gameId =>{
        io.to(gameId).emit('playAgainReceived');
    })

    socket.on('closeGame', async ({gameId, winner}) => {
        try {
            const res = await closeGame(gameId, winner)
            console.log('closeGame', res)
            io.to(gameId).emit('endGame');
        } catch(e) {
            console.log(e)
        }  
    })
})


// Start Up Server 
const PORT = process.env.PORT || 8000;
http.listen(PORT, () => {
    console.log('Backend Server listing at PORT:', PORT);
})