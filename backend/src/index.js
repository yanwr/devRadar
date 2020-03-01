// tendo acesso a biblioteca/ dependecia / EXPORTS
        const express = require('express');
    // mongoose é a forma para que o Node.Js se conecta com a DB do Mongo
        const mongoose = require('mongoose');
    // pegando as rotas exporta do arquivo routes.js
        const routes = require('./routes');
    // pegando a bibliote cors para que seja liberado o acesso EXTERNO para qualquer aplicação
        const cors = require('cors');
//

const app = express();

// connection mongoDB               user : senha                              /nameDB
    mongoose.connect('mongodb+srv://yanwr:yanywr02@cluster0-7vy27.mongodb.net/devRadar?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
//
// 
    app.use(cors());
//
// fazer com que a nossa aplicação entenda respostas JSON para todas as rotas 
    app.use(express.json());
    app.use(routes);
// 
// a porta que o localhost vai ouvir 
    app.listen(2525);
//