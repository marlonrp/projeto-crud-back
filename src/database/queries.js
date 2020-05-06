
const selectAll = table => `SELECT * FROM ${table}`
const selectAllFuncionarios = () => 'SELECT A.id, A.nome, A.idade, A.cargoId, B.nome as cargoNome FROM funcionario as A JOIN cargo AS B ON A.cargoId = B.id'
const selectById = (table, id) => `${selectAll(table)} WHERE id = ${id}`
const sellectFuncionarioById = id => `${selectAllFuncionarios()} WHERE A.id = ${id}`
const deleteById = (table, id) => `DELETE ${table} WHERE id = ${id}`
const insert = (table, objectDto) => `INSERT INTO ${table}(${getObjectKeys(objectDto)}) VALUES(${getObjectValues(objectDto)})`
const update = (table, id, objectDto) => `UPDATE ${table} SET ${getKeysAndFields(objectDto)} WHERE id = ${id}`

const execSQLQuery = sqlQry => global.conn.request()
  .query(sqlQry)
  .then(result => result)
  .catch(err => err);

const getObjectKeys = objectDto => JSON.stringify(Object.keys(objectDto).filter(key => key)).replace('[', '').replace(']', '').replace(/["]/g, '')

const getObjectValues = objectDto => JSON.stringify(Object.keys(objectDto).map(key => objectDto[key])).replace('[', '').replace(']', ``).replace(/["]/g, `'`)

const getKeysAndFields = objectDto => {
    let str = ''
    Object.keys(objectDto).forEach(key => str += str ? `,${key}='${objectDto[key]}'` : `${key}='${objectDto[key]}'`)
    return str
  }

module.exports = {
    selectAll,
    selectAllFuncionarios,
    selectById,
    sellectFuncionarioById,
    deleteById,
    insert,
    update,
    execSQLQuery
}