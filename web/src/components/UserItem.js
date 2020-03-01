import React from 'react';
import '../Css/UserItem.css'

function UserItem({ user }){
    return(
        <li className="dev-item">
            <header>
            <img src={user.avatar_url} alt={user.name}/>
            <div className="user-info">
                <strong>{user.name}</strong> 
                <span>{user.tecnologias.join(', ')}</span>
            </div>
            </header>
            <p>{user.bio}</p>
            <a href={`https://github.com/${user.github_username}`}>Acessar perfil no GitHub</a>
        </li>
    );
}

export default UserItem;