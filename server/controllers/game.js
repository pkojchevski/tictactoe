const Game = require('../models/game');
const mongoose = require('mongoose')



exports.startGame = async (req, res) => {
    const { username } = req.body;
    try {
        const games = await Game.find({}).exec()
        // Check if there is any game
            if(games && games.length === 0) {
                // There is no any game, add user and create new game
                console.log('There is no any game, add user and create new game')
                // const gameId = new mongoose.mongo.ObjectId();
                const newGame = {
                    // _id:gameId,
                    users: {playerOne:username, playerTwo: ''},
                    noOfUsers: 1,
                    finished: false,
                    ongoing: false,
                }
                const gameToAdd1 = new Game(newGame)
                try {
                    const g1 = await gameToAdd1.save(newGame)
                    return res.status(200).json({gameId: g1.id, status:'player'})
                } catch(e) {
                    console.log('err:', e)
                }
            } else if (games.filter(game => game.finished === false).length === 0) {
                // All games are finished, add user and create new game
                console.log('All games are finished, add user and create new game')
                // const gameId1 = mongoose.Types.ObjectId()
                // console.log('gameId1:', gameId1.id)
                const newGame1 = {
                    // _id:gameId1,
                    users: {playerOne:username, playerTwo: ''},
                    noOfUsers: 1,
                    finished: false,
                    ongoing: false,
                }
                const gameToAdd2 = new Game(newGame1)
                try {
                    const g2 = await gameToAdd2.save(newGame1)
                    return res.status(200).json({gameId: g2.id, status:'player'})
                } catch(e) {
                    console.log('e1:',e)
                }
            } else if(games.filter(game => game.ongoing).length === 1) {
                // game is ongoing
                console.log('game is ongoing')
                const openGame = games.filter(game => game.ongoing === true)[0]
                return res.status(200).json({gameId:openGame._id, status:'watcher'})
            } else {
                let game = games.filter(game => game.noOfUsers === 1)
                if(game && game.length == 1 && username !== game[0].users.playerOne) {
                    console.log('username:', username)
                    // Add second user to the game
                    console.log('Add second user to the game:', username)
                    game[0].users.playerTwo = username
                    game[0].noOfUsers = 2
                    game[0].ongoing = true
                    game[0].finished = false
                    const gameToAdd3 = new Game(game[0])
                    try {
                        const g3 = await gameToAdd3.save(game[0])
                        return res.status(200).json({gameId:game[0]._id, status:'player'})
                    } catch(e) {
                        console.log('err2:', e)
                    } 
                }
            }
        } catch(e) {
            console.log('err3:', e)
        }
}

// exports.startGame = async (req, res) => {
//     const { username } = req.body;
//     let id = null
//     // Check if there is any game
//     try {
//         const games = await Game.find({}).exec()
//         if(games && games.length === 0) {
//         // There is no any game, add user and save the game
//         const gameId = mongoose.Types.ObjectId();
//         id = gameId.toString()
//         console.log('gameid:', gameId)
//         const newGame = {
//             _id:gameId,
//             users: {playerOne:username, playerTwo: ''},
//             noOfUsers: 1,
//             finished: false,
//             ongoing: false,
//         }
//         const gameToAdd1 = new Game(newGame)
//         try {
//             await gameToAdd1.save(newGame)
//             return res.status(200).json({gameId, status:'player'})
//         } catch(e) {
//             console.log(e)
//         }
//     } else if (games.filter(game => game.finished === false).length === 0) {
//         // All games are finished, add user and create new game
//         const gameId1 = mongoose.Types.ObjectId();
//         id = gameId1.toString()
//         console.log('gameid1:', gameId1)
//         const newGame1 = {
//             _id:gameId1,
//             users: {playerOne:username, playerTwo: ''},
//             noOfUsers: 1,
//             finished: false,
//             ongoing: false,
//         }
//         const gameToAdd2 = new Game(newGame1)
//         try {
//             await gameToAdd2.save(newGame1)
//             return res.status(200).json({gameId1, status:'player'})
//         } catch(e) {
//             console.log(e)
//         }
//     }
//       else {
//         let game = games.filter(game => game.noOfUsers === 1)
//         if(game && game.length == 1) {
//             id = game[0]._id.toString()
//             // Add second user to the game
//             game[0].users.playerTwo = username
//             game[0].noOfUsers = 2
//             game[0].ongoing = true
//             game[0].finished = false
//             try {
//                 console.log('game2:', game)
//                 await game[0].save()
//                 return res.status(200).json({gameId:game[0]._id, status:'player'})
//             } catch(e) {
//                 console.log(e)
//             } 
//         }
//     }
//     } catch(e) {
//         console.log(e)
//     }
//         return res.status(200).json({gameId:id, status:'watcher'})
// }


exports.getGame = async (gameId) => {
    const game = await Game.findOne({_id: gameId})
    return game
}

exports.closeGame = async (gameId, winner) => {
    console.log(gameId, typeof gameId)
    return await Game.findOneAndUpdate({'_id': gameId}, { winner, finished: true, ongoing:false}, {new: true})
}



// exports.startGame = (req, res) => {
//     const { username } = req.body;
//     // Check if there is any game
//      Game.find({}).exec()
//         .then(games => {
//             if(games && games.length === 0)
//             // There is no any game, add user and save the game
//              game = {
//                 users: {playerOne:username, playerTwo: ''},
//                 noOfUsers: 1,
//                 finished: false,
//                 ongoing: false,
//             }
//                 Games.save(game).exec()
//                     .then(() => res.status(200).json({game: game._id, content: "User is added as player one, waiting for second user"})
//                     )
//                     .catch(console.log)
//         })
//         .catch(console.log)

//         // Check if there is game with only one user
//         Game.findOne({noOfUsers: 1}).exec()
//             .then(game => {
//                 if(game) {   
//                             // Add second user to the game
//                             game.users.noOfUsers.playerTwo = username
//                             game.ongoing = true
//                             game.save(game).exec()
//                             .then(() => res.status(200).json({game:game._id, content:"User was added in the game, and game started"}))
//                             .catch(console.log)
//                         }
                                
//                     })
//                     .catch(console.log)
//         return res.status(200).json({game:null, content:'There is no free game'})
// }