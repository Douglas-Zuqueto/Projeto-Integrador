const dbConnection = require('../db/dbConnection.js')

class searchModel {
  executeSQL(sql, parameters = "") {
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, parameters, (error, response) => {
        if (error) {
          return reject(error);
        }
        return resolve(response);
      });
    });
  }

  searchList(data) {
    const sql = "SELECT * FROM produtos WHERE nome LIKE ?";
    return this.executeSQL(sql, data);
  }

}

module.exports = new searchModel();