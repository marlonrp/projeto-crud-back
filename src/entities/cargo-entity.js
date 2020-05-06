const queries = require('./../database/queries')
const Cargo = require('./../models/cargo.model')
const entity = 'cargo'

const cargoEntity = app => {
    app.get(`/${entity}`, async (req, res) => {
        const result = await queries.execSQLQuery(queries.selectAll(entity))
        return res.send(result.recordset)
    }),
    
    app.get(`/${entity}/:id`, async (req, res) => {
        const result = await queries.execSQLQuery(queries.selectById(entity, req.params.id))
        return result.recordset.length ? res.send(result.recordset[0]) : res.status(404).send({error: 'Not found', error: 'Cargo não encontrado'})
    }),
    
    app.post(`/${entity}`, async (req, res) => {
        const cargoDto = new Cargo(null, req.body.nome)
        delete cargoDto.id
        if (!cargoDto.nome) return res.send('Parâmetro nome é obrigatório')
        else if (cargoDto.nome.length > 100) return res.send('Parâmetro nome deve conter no máximo 100(cem) caracteres')
        const result = await queries.execSQLQuery(queries.insert(entity, cargoDto))
        return res.send(result.rowsAffected ? 'Registro inserido com sucesso': result)
    }),
    
    app.delete(`/${entity}/:id`, async (req, res) => {
        const result = await queries.execSQLQuery(queries.deleteById(entity, req.params.id))
        return result.rowsAffected[0] ? res.send('Registro excluído com sucesso') : res.status(404).send({error: 'Not found', message: 'Registro não encontrado'})
    }),
    
    app.put(`/${entity}/:id`, async (req, res) => {
        const cargoDto = req.body;
        delete cargoDto.id
        if (!cargoDto.nome) return res.send('Parâmetro nome é obrigatório')
        else if (cargoDto.nome.length > 100) return res.send('Parâmetro nome deve conter no máximo 100(cem) caracteres')
        const result = await queries.execSQLQuery(queries.update(entity, req.params.id, cargoDto))
        return result.rowsAffected[0] ? res.send('Registro alterado com sucesso') : res.status(404).send({error: 'Not found', message: 'Registro não encontrado'})
    })
}

module.exports = cargoEntity