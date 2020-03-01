// importando o mongoose para ter acesso a nossa DB
    const mongoose = require('mongoose');
//
// importando o Ponit 
    const PonitSchema = require('./utils/PointSchema');
//
// Criando Entity Usuarios 
// Schema é a estruturação de uma entidade dentro do banco de dados
const UserSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    tecnologias:[String],
    location: {
        type: PonitSchema,
        //basicamente isso é o eixo Y e X, pq estamos trabalhando com GEOLOCALIZAÇÃO
        index: '2dsphere'
    }
});

// exportando a Entity 
module.exports = mongoose.model('User', UserSchema);