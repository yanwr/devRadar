const axios = require('axios');// biblioteca axios serve para ter comunicação entre os APi RESTfull // vamos pegar dados do GitHub 
const User = require('../models/User');// pegando de models nossa Entity User para ser colocado os valores
const { findConnections, sendMessage} = require('../webSocket');
// existem 5 function dentro de um controller =  index: mostra lista de todos, show: mostra unico, store: cadastrar, update: atualizar, destroy: deletar

module.exports = {
    // usamos o --async-- para que: a chamada da APi do git pode demorar para respoder, assim ela vai esperar a resposta do GitHub ai entao devolver o return com os dados que queremos
    async store (request, response) {
        // buscando somente a informação de cada prop JSON da Entity User
        const { github_username, tecnologias, latitude, longitude } = request.body;

        // fazer a buscar dentro do banco para ver se usuario já existe e nao ter duplicação
        let user = await User.findOne({ github_username });

        if(!user) {
            // utilizamos o --await-- (somente usar com --async-- ) para esperar a resposta, devido a demora da comunicação entre duas APi. Sem isso, poderia retorna valores nulos.
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            // resposta com todos os dados da APi do git 
            // --console.log(apiResponse.data);--
            // pegando somente os dados que desejamos para nossa aplicação
                // name = login : serve para se nao tiver name altomaticamente pega o do login
            const {name = login, avatar_url, bio} = apiResponse.data;
            // pegando a String que recebe do JSON, tranformando a cada "," um elemento do vetor e com o map() percorrer o vetor e com o trim() eliminar todos os espaços inuteis
            const arrTec_trampo = tecnologias.split(',').map(tec => tec.trim());
            // pegando latitude e longitude 
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
            // coloacando todo nosso novo user // utilizar o --await-- pq pode surgir demoras e nao queremos nada null 
            user = await User.create({
                github_username: github_username,
                name: name,
                avatar_url: avatar_url,
                bio: bio,
                tecnologias: arrTec_trampo, 
                location: location,
            });

            /* Parte que tem haver com o socket. Filtrar as connections la do webSocket.js,
                se uma delas estiver no raio de 10km de distancia e se o novo User tenha pelo
                menos uma das tecnologias filtradas
            */
            const sendSocketMessageTo = findConnections({ latitude, longitude}, tecnologias);
            sendMessage(sendSocketMessageTo, 'NewUser', user);
        }
        return response.json(user);
    },

    async index(request, response){
        const users = await User.find();
        
        return response.json(users);
    },
};