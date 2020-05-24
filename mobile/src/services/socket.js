import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.15:2525', {
    autoConnect: false,
});

function subscribeToNewUsers(subscribeFunction) {
    // recebendo algo do BE sem a interação do FE, no caso, sem fazer a chamada da APi, sem request
    // socket.on recebe as coisas la do BE do metodo sendMenssage quando um user for add e em realTime atualizar para parecer no map
    socket.on('NewUser', subscribeFunction);
}

function connect(latitude, longitude, tecnologias){
    // enviando parametros para o BE, assim vamos poder atualizar users que tem a ver com a busca feita pelo Usuario
    socket.io.opts.query = {
        latitude,
        longitude,
        tecnologias
    };
    socket.connect();
}

function disconnect() {
    if(socket.connected){
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewUsers
};