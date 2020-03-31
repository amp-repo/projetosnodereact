const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs').where('id', id).select('name').first();

        console.log(ong + "teste");

        if (!ong) {
            return response.status(400).json({ error: 'No Ong Find with this id' });
        }

        return response.json(ong);
    }
}