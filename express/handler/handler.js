var connection = require('../mysql/mysql')
var format = require('../libs/utils').format

module.exports = {
  getCors:function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader( "Access-Control-Allow-Headers","X-Requested-With,Origin,Content-Type,Accept" );
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("Content-type", "text/json;charset=utf-8");
    next();
  },
  getUserlist:function(req, res) {
    var dataResult = {};  
    var params = req.body;
    // console.log(params)
    var pageStart = (params.pageNumber - 1) * params.limit;
    var pageEnd = Number(params.limit);
    var searchText = params.search;
    // 判断升序或是降序
    var order = params.order;
    // 以哪个字段进行排序
    var sortName = params.sort;
    var sql ="SELECT * from mytable WHERE name LIKE '%" + searchText + "%' ORDER BY " + sortName + " " +order
    connection.query(sql, function(err, result) {
      if (err) {
        res.send(err.message);
        return;
      }
      dataResult = {
        total: result.length,
        rows: result.slice(pageStart, pageStart + pageEnd)
      };
      res.send(JSON.stringify(dataResult));
    });
  },
  getUserId:function(req,res) {
    var sql = "SELECT * FROM mytable WHERE id =" + req.body.id
    connection.query(sql,function(err, result) {
      if (err) {
        res.send(JSON.stringify(err))
        return
      }
      res.send(JSON.stringify(result))
    })
  },
  updateUserId:function(req, res){
    var params = req.body
    var sql = "UPDATE mytable set name='"+ params.name +"',type='"+ params.type +"',race='" + params.race +"',datatime='"+ format(new Date()) +"',location='"+ params.location +"',outfit='"+ params.outfit +"'WHERE id=" + params.id
    // console.log(sql)
    connection.query(sql,function(err, result) {
      if (err) {
        res.send(JSON.stringify(err))
        return
      }
      res.send(JSON.stringify(result))
    })
  },
  deleteUser: function(req, res) {
    var sql = " DELETE FROM mytable where id = "+ req.body.id
    connection.query(sql,function(err, result) {
      if (err) {
        res.send(JSON.stringify(err))
        return
      }
      res.send(JSON.stringify(result))
    })
  },
  insertUser: function(req, res) {
    var sql = "insert into mytable values(null,'" + req.body.name + "','" + req.body.type + "','"
    + req.body.race + "','" + req.body.datatime + "','" + req.body.location + "','" + req.body.outfit + "')"
    connection.query(sql,function(err,result) {
      if (err) {
        res.send(JSON.stringify(err))
        return
      }
      res.send(JSON.stringify(result))
    })
  }
}
