const User = require('../models/User');

module.exports = {
    async index(request, response){
        const { latitude, longitude, tecnologias } = request.query;
        // transforma em array as tecnoligias
        const arrTec = tecnologias.split(',').map(tec => tec.trim());
        // buscar em usuario somente aquele que tem as mesma tecnologias selecionadas // o --$in, $near, $maxDistance, $geometry-- sao operadores do mongoDB 
        const users = await User.find({
            tecnologias: {
                $in: arrTec,  
            },
            location: {
                $near: { 
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ users });
    },
}