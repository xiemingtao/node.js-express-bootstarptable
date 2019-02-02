let connection = require('../mysql/mysql')
 module.exports = {
    format: (str)=> {
      let year = str.getFullYear();
      let month =
        str.getMonth() + 1 > 9 ? str.getMonth() + 1 : "0" + (str.getMonth() + 1);
      let date = str.getDate() > 9 ? str.getDate() : "0" + str.getDate();
      let hours = str.getHours() > 9 ? str.getHours() : "0" + str.getHours();
      let minutes =
        str.getMinutes() > 9 ? str.getMinutes() : "0" + str.getMinutes();
      let seconds =
        str.getSeconds() > 9 ? str.getSeconds() : "0" + str.getSeconds();
    
      return (
        year + "-" +month + "-" + date +" " +hours +":" +minutes +":" +seconds
      );
    },
    promise: (sql) =>{
      const p = new Promise((resolve, reject) => {
        connection.query(sql,(err, result) => {
          if (err) {
            reject(err)
            return
          }
          resolve(result)
        })
      })
      return p
    }
  }