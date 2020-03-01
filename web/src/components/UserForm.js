import React, { useState, useEffect } from 'react';
import '../Css/UserForm.css'
/* Explicações de codigo -----
 => utiliza o -- useEffect -- do React, ele serve para disparar uma função toda vez que uma informação for alterada. Ele recebe 2 parametros: 1° qual a função que ele deve executar. 2° quando a função deve executar, mandamos um -- [] vetor -- se o vetor tiver vazio, a função sera executada somente uma vez, se tiver algo, todas vezes que esse "algo" for alterado, a função sera executada. Funciona como um ajax, mas somente dentro do componente.
 => -- navigator.geolocation.getCurrentPosition -- serve para pegar a latitude e longitude do usuario, é uma variavel local.
 => -- useState -- do React, para usarmos state na aplicação.
 */
function UserForm({ onSubmit }){
//#region Estados 
    const [ github_username, setGitHubUserName ] = useState('');
    const [ tecnologias, setTecnologias ] = useState('');
    const [ latitude, setLatitude ] = useState('');
    const [ longitude, setLongitude ] = useState('');
//#endregion
//#region Getting Geolocalização
    useEffect(() => {
        navigator.geolocation.getCurrentPosition( 
        (position) => {
            const { latitude, longitude } = position.coords; 
            setLatitude(latitude);
            setLongitude(longitude);
        },
        (error) => {
            console.log(error);
        },
        {
            timeout: 30000,
        }
        )
    }, []);
//#endregion
//#region função para mandar para App.js que é o componente pai  
    async function handleSubmit(e){
        e.preventDefault(); // nao deixar o form levar a aplicação para outra rota
        await onSubmit({
                github_username,
                tecnologias,
                latitude,
                longitude,
            });
         // depois de cadastrar deixa todos os campos vazios
        setGitHubUserName('');
        setTecnologias('');
    }
//#endregion
    return (
        <form onSubmit={ handleSubmit }> 
            <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input 
                name="github_username" 
                id="github_username" 
                required
                value={github_username}
                onChange={ e => setGitHubUserName(e.target.value)}
                />
            </div>

            <div className="input-block">
            <label htmlFor="tecnologias">Tecnologias que você manja</label>
            <input 
                name="tecnologias" 
                id="tecnologias" 
                required
                value={tecnologias}
                onChange={ e => setTecnologias(e.target.value)}
                />
            </div>

            <div className="input-group">
            <div className="input-block">
                <label htmlFor="latitude">Latidute</label>
                <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required 
                value={latitude}
                onChange={e => setLatitude(e.target.value)} // assim estou setando no estado valor atribuido ao input
                /> 
            </div>

            <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange={e => setLongitude(e.target.value)} // assim estou setando no estado valor atribuido ao input
                />
            </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
    );
}

export default UserForm;