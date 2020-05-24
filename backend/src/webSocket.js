const socketio = require('socket.io');

let io;
const connections = [];
exports.setupWebSocket = (server) => {
    io = socketio(server);

    // add um eventListener. Toda vez que a aplicação ouvir o protocolo HTTP, uma atualização, vai ser disparado
    io.on('connection', socket => {
        // console.log(socket.id);
        // // pegar os parametros
        // console.log(socket.handshake.query);
    // BE enviando algo pro FE sem interação, com o socket.emit( title, data)
        // setTimeout(() => {
        //     socket.emit('message', 'Hello FrontEnd');
        // }, 3000)
        const { latitude, longitude, tecnologias } = socket.handshake.query;
        const arrTecnologias = tecnologias.split(',').map(tec => tec.trim());
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            tecnologias: arrTecnologias
        });
    });
};

exports.findConnections = (coordinates, tecnologias) => {
    return connections.filter( connection => {
        // 1° verificar se a coordinate do novo User esta em um raio de 10km da coordinate das Connections, fazer um calc entre dois pontos,
       // 2° vericar se as tecnologias do novo User batem com as filtradas. o metodo array.some( item ) é pra verificar se algum elemento do array é igual ao o selecionado e o include se um array contém um determinado elemento, os dois sao quase iguals, ambos retornam boolean
        return calcDistanceFromLatLonInKm(coordinates, connection.coordinates) < 10
            && connection.tecnologias.some(item => tecnologias.includes(item))
    });
};

// é o calculo Naval Haversine, fórmula de haversine, que calcula a distâncias entre dois pontos de uma esfera a partir de suas latitudes e longitudes
const calcDistanceFromLatLonInKm = (centerCoordinates, pointCoordinates) => {
    const deg2rad= (distance) => {
        return distance * (Math.PI / 180);
    };
    const radius = 6371;
    const { latitude: lat1, longitude: lon1 } = centerCoordinates;
    const { latitude: lat2, longitude: lon2 } = pointCoordinates;

    const distanceLat = deg2rad(lat2 - lat1 );
    const distanceLon = deg2rad(lon2 - lon1 );

    const a =
        Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(distanceLon / 2) * Math.sin(distanceLon / 2);

    const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * center;

    return distance;
};

// Param to = Obj de connections,
// Param message =
// Param data = Dados do User novo que foi cadastrado
exports.sendMessage = (to, message, data) => {
    to.forEach( elementConnection => {
        io.to(elementConnection.id).emit(message, data);
    });
};