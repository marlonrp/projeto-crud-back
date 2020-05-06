const queries = require('./../database/queries')
const Funcionario = require('./../models/funcionario.model')
const entity = 'funcionario'

const funcionarioEntity = app => {
    app.get(`/${entity}`, async (req, res) => {
        const result = await queries.execSQLQuery(queries.selectAllFuncionarios())
        return res.send(result.recordset)
    }),
    
    app.get(`/${entity}/:id`, async (req, res) => {
        const result = await queries.execSQLQuery(queries.sellectFuncionarioById(req.params.id))
        return result.recordset && result.recordset.length ?
            res.send(result.recordset[0]) :
            res.status(404).send({error: 'Not found', error: 'Funcionário não encontrado'})
    }),
    
    app.post(`/${entity}`, async (req, res) => {
        console.log(req.body);
        
        const funcionarioDto = new Funcionario(null, req.body.nome, req.body.idade, req.body.cargoId)
        console.log(funcionarioDto);
        
        delete funcionarioDto.id
        if (!funcionarioDto.nome) return res.send('Parâmetro nome é obrigatório')
        else if (funcionarioDto.nome.length > 100) return res.send('Parâmetro nome deve conter no máximo 100(cem) caracteres')
        else if (!funcionarioDto.idade) return res.send('Parâmetro idade é obrigatório')
        else if (!funcionarioDto.cargoId) return res.send('Parâmetro id do cargo é obrigatório')
        const result = await queries.execSQLQuery(queries.insert(entity, funcionarioDto))
        return result.code ?
            res.status(400).send({error: 'Bad Request', message: 'Parâmetros informados incorretos'}) :
            res.send(result.rowsAffected ? 'Registro inserido com sucesso': result)
    }),
    
    app.delete(`/${entity}/:id`, async (req, res) => {
        const result = await queries.execSQLQuery(queries.deleteById(entity, req.params.id))
        return result.rowsAffected[0] ? res.send('Registro excluído com sucesso') : res.status(404).send({error: 'Not found', message: 'Registro não encontrado'})
    }),
    
    app.put(`/${entity}/:id`, async (req, res) => {
        const funcionarioDto = req.body;
        delete funcionarioDto.id
        if (!funcionarioDto.nome) return res.send('Parâmetro nome é obrigatório')
        else if (funcionarioDto.nome.length > 100) return res.send('Parâmetro nome deve conter no máximo 100(cem) caracteres')
        else if (!funcionarioDto.idade) return res.send('Parâmetro idade é obrigatório')
        else if (!funcionarioDto.cargoId) return res.send('Parâmetro id do cargo é obrigatório')
        const result = await queries.execSQLQuery(queries.update(entity, req.params.id, funcionarioDto))
        return result.code ?
            res.status(400).send({error: 'Bad Request', message: 'Parâmetros informados incorretos'}) :
            result.rowsAffected[0] ? res.send('Registro alterado com sucesso') : res.status(404).send({error: 'Not found', message: 'Registro não encontrado'})
    })
}

module.exports = funcionarioEntity