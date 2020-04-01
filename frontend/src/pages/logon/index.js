import React, { useState } from 'react';
import api from '../../services/api';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './style.css';

import heroesImage from '../../assets/heroes.png';
import logoImage from '../../assets/logo.svg';

export default function Logon() {

    const [id, setID] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert("Falha no login, tente novamente");
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImage} alt="Quero Ajudar" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e => setID(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="./register">
                        <FiLogIn size={16} color="#e02041" /> Não tenho cadastro</Link>
                </form>
            </section>

            <img src={heroesImage} alt="Heroes"></img>
        </div>
    );
}