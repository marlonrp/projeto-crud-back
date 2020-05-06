const sql = require('mssql')
const connStr = 'Server=localhost;Database=empresa;User Id=SA;Password=P@55w0rd;'
module.exports = sql.connect(connStr).then(conn => global.conn = conn).catch(err => console.log(err))