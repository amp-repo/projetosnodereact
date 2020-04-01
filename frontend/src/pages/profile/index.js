import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImage from '../../assets/logo.svg';
import './style.css';

import api from '../../services/api';

export default function Profile() {

    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongID = localStorage.getItem('ongId');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongID,
            }
        }).then(
            response => {
                setIncidents(response.data);
            })
    }, [ongID]);

    async function handleDeleteIncident(id) {

        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongID,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('erro ao deletar caso, tente novamente');
        }

    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImage} alt="Logo" />
                <span>Bem vinda, {ongName}</span>

                <Link to="/incident/new" className="button">Cadastrar novo caso</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(incident.value)}</p>

                        <button type="button" onClick={
                            () => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={18} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}