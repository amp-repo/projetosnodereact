const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/*
    Rota é o caminho completo
    Recurso é apenas o recurso que se deseja acessar, vem depois da barra
*/

/*
*Métodos HTTP:

GET: serve para buscar informação do backend.
POST: usado para criar uma informação no backend
PUT: usado para alterar uma informação
DELETE: usado para deletar uma informação
*/

/*
Tipos de parâmetros

Query Params: parâmetros nomeados enviados na rota após o "?" e
    geralmente servem para filtros, paginação...
Route Params: parâmetros usados para notificar recursos
Request Body: corpo da requisição, utilizado para criar ou alterar recursos
*/

/*
    Será utilizado o SQLite, com o Query Builder chamado Knex.js
*/

routes.get('/users/:id', (request, response) => {
    // return response.send('Hello World!!');
    // const params = request.query; //acessa através do query

    // const params = request.params; //acessa o id usando Route params
    //const params = request.body; //usado para pegar os parâmetros do corpo

    console.log(params);
    return response.json({
        evento: 'Semana OmniStack',
        aluno: 'Adelson Portela'
    });
});

// rota para o login
routes.post('/sessions', SessionController.create);

// rotas para Ongs
routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.index);

// pega os dados de uma ong especifica
routes.get('/profile', ProfileController.index);

// rotas para os casos (icidentes)
routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;