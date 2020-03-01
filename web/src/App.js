import React, { useEffect, useState } from 'react';
import api from './services/api';

import './Css/global.css'
import './Css/App.css'
import './Css/AsideBar.css'
import './Css/Main.css'

import UserItem from './components/UserItem';
import UserForm from './components/UserForm';

// Componente -- é uma função que retorna Html, Css, Js com o App () que nao interfere no restante da aplicação
/* Estado -- Sao informações mantidas pelo componente, e lembrar que no React se usa o conseito de imutabilidade, onde sempre que algo for alterado, nao sera alterado e sim criado um novo apartir do valor do antigo
  temos que usar a importação 'useState' com ele temos os metodos set e get 
*/
/* Propriedade -- São os atributos/informações que o Componente PAI passa ao componente FILHO, como no HTML de uma <h1 title=''> 'title' é uma propriedade !
  para pegar as propriedades tem que colocar em parametro --props--  e usar "{props.PROPRIEDADE}"
*/
/* Fragment -- em todo componente so pode retornar um tag, de modo que quase sempre seja --<div> outras coisas </div>--
  e isso pode alterar alguma style, para nao acontecer isso usa --<> outras coisas </>---
*/
/* Exemplos : 
function App() {
  const [count, setCont] = useState(0);
  function incrementCounter(){
    setCont(count + 1);
  } 
  return (
    <>
      <h1>Contador: {count}</h1>
      <button onClick={incrementCounter}></button>
    </>
  );
} */
/* Explicações de codigo -----
 => utiliza o -- useEffect -- do React, ele serve para disparar uma função toda vez que uma informação for alterada. Ele recebe 2 parametros: 1° qual a função que ele deve executar. 2° quando a função deve executar, mandamos um -- [] vetor -- se o vetor tiver vazio, a função sera executada somente uma vez, se tiver algo, todas vezes que esse "algo" for alterado, a função sera executada. Funciona como um ajax, mas somente dentro do componente.
 => -- navigator.geolocation.getCurrentPosition -- serve para pegar a latitude e longitude do usuario, é uma variavel local.
 => -- useState -- do React, para usarmos state na aplicação.
 */
function App() {
//#region Estados
  const [ users, setUsers ] = useState([]);// essa const vai iniciar como um array 
//#endregion
  
//#region Update lista de users
  useEffect(() => {
      async function updateUser(){
        const response = await api.get('/users');
        setUsers(response.data);
      }
      updateUser();
  }, []);
//#endregion

//#region  salvando os dados no banco pela APi do backend
  async function handleAddDev(dados){ // function esta recebendo o evento do form e mandando para o componente filho, que no caso é UserForm
                    // metodo HTTP >> a query string >> depois o JSON com os valores para serem salvos 
      const response = await api.post('/users', dados)
      // para a lista de usuario ser atualizada com o novo usuario cadastrado. No React deve se criar o elemento do zero e nele add o ultimo(novo usuario cadastrado) user na ultima posição da lista
      setUsers([...users, response.data]);
  }
//#endregion

  return (
    <div id="app">
      <aside>
         <strong>Cadastrar</strong>
         <UserForm onSubmit={handleAddDev} /> 
      </aside>
      <main>
        <ul>
          {users.map(user => ( // fazendo um retorno de todos os elementos do array. Quando usamos map, percorrer um array dentro do componente, ele deve ter um valor unico no primeiro elemento de onde usamos o array, um 'key', no caso do mongo, temos um _id
            <UserItem key={user._id} user={ user }/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
