import io from 'socket.io-client';
import { API } from '../../constant'



let socket;
export const initiateSocket = (gameId) => {
  socket = io(API);
  console.log(`Connecting socket...`);
  if (socket) socket.emit('join', gameId);
  return true
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}

export const waitingSecondPlayer = (callback) => {
  socket.on('waitingSecondPlayer', msg => {
    console.log('waitingSecondPlayer received!');
    return callback(null, msg);
  });
}

export const startGame = (callback) => {
  socket.on('startGame', msg => {
    console.log('startGame event received!');
    return callback(null, msg);
  });
}

export const endGame = (callback) => {
  socket.on('endGame', () => {
    console.log('endGame event received!');
    return callback(null);
  });
}

export const closeGame = (data) => {
  socket.emit('closeGame', data)
}

export const squareClickedReceived = (callback) => {
  if (!socket) return(true);
  socket.on('squareClickedReceived', msg => {
    console.log('squareClickedReceived event received!');
    return callback(null, msg);
  });
}

export const playAgainReceived = (callback) => {
  if (!socket) return(true);
  socket.on('playAgainReceived', msg => {
    console.log('playAgainReceived event received!');
    return callback(null, msg);
  });
}

export const squareClicked = (data) => {
  console.log('squareClicked')
  socket.emit('squareClicked', data)
}

