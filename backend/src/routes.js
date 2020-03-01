const { Router } = require('express');// pegar somente uma dependecia das bibliotecas/ Entity /
const UserController = require('./controller/UserController');
const SearchController = require('./controller/SearchController');

const routes = Router();

function comoFazerRotas_tipoDeParametros(){/* podemos usar diversas rota, com os METODOS HTTP: get, put, delete, post 
    get: buscar uma informação/receber uma informação
    post: criar alguma infromação/ salvar/ cadastrar
    put: editar uma informação
    delete: deletar uma informação
*/
/* Tipos de parametros :
    Query Params: quase sempre utilizado com o metodo GET, todos query params fcam amostras na URL 
       como acessar: request.query(filtrar, ordenar, paginar, ...)

    Route Params: quase sempre utilizado com os metodos PUT e DELETE
        como acessar: request.params(identificar um recurso na alteração ou remoção)

    Body: quese sempre utilizado com os metodo POST e PUT. 
        como acessar: request.body( Dados para criação ou alteração de um registro) 
*/

// criando a rota com o metodo get para a pagina web -- () => -- é uma forma de fazer uma function sem precisar escrever function
//    routes.get('/', (request, response) => {
//        return response.json({ msg: 'Hello World' });
//    });
//
}

// Rota para cadastro de usuario
routes.post('/users', UserController.store);
//
// Rota para listar todos usuarios
routes.get('/users', UserController.index);
//
// Rota para buscar usuario por latitude/longitude/tec_trampo
routes.get('/search', SearchController.index);
//

// exportando todas as routes para aplicação toda
    module.exports = routes;
//