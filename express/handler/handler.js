
let format = require('../libs/utils').format
let promise = require('../libs/utils').promise
module.exports = {
  getCors:(req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader( "Access-Control-Allow-Headers","X-Requested-With,Origin,Content-Type,Accept" );
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("Content-type", "text/json;charset=utf-8");
    next();
  },
  getUserlist:(req, res)=> {
    let dataResult = {};  
    let params = req.body;
    // console.log(params)
    let pageStart = (params.pageNumber - 1) * params.limit;
    let pageEnd = Number(params.limit);
    let searchText = params.search;
    // 判断升序或是降序
    let order = params.order;
    // 以哪个字段进行排序
    let sortName = params.sort;
    // 把搜索索引值进行处理
    let searchList = searchText.split(' ');
    let vagueTxt = " "
    // 根据索引值生成sql语句
    searchList.forEach(function (item) {
      item = item == '力量' ? 'power' : item == '敏捷' ? 'agile' : item == '智力' ? 'intelligence' : item
      
      vagueTxt += "CONCAT(name,type,race,datatime,location,outfit) like '%"+item +"%' and "
    });
    vagueTxt = vagueTxt.substring(0, vagueTxt.lastIndexOf('and'))
    let sql ="SELECT * from mytable WHERE "+ vagueTxt +"ORDER BY " + sortName + " "+ order + " limit" + " "+ pageStart + "," + pageEnd
    // console.log(sql);
    let sqlTotal ="SELECT count(*) as total from mytable WHERE "+ vagueTxt
    promise(sql)
    .then(data => {
      dataResult.rows = data
      return promise(sqlTotal)
    })
    .then(data => {
      dataResult.total = data[0].total
      res.send(JSON.stringify(dataResult))
    })
    .catch(err => {
      res.send(JSON.stringify(err))
    })
  },
  getUserId:(req,res) =>{
    let sql = "SELECT * FROM mytable WHERE id =" + req.body.id
    promise(sql)
    .then(data => {
      res.send(JSON.stringify(data))
    }).catch(err => {
       res.send(JSON.stringify(err))
    })
    // connection.query(sql,function(err, result) {
    //   if (err) {
       
    //     return
    //   }
    //   res.send(JSON.stringify(result))
    // })
  },
  updateUserId:(req, res) =>{
    let params = req.body
    let sql = "UPDATE mytable set name='"+ params.name +"',type='"+ params.type +"',race='" + params.race +"',datatime='"+ format(new Date()) +"',location='"+ params.location +"',outfit='"+ params.outfit +"'WHERE id=" + params.id
    promise(sql)
    .then(data => {
      res.send(JSON.stringify(data))
    }).catch(err => {
       res.send(JSON.stringify(err))
    })
  },
  deleteUser: (req, res) => {
    let sql = " DELETE FROM mytable where id = "+ req.body.id
    promise(sql)
    .then(data => {
      res.send(JSON.stringify(data))
    }).catch(err => {
       res.send(JSON.stringify(err))
    })
  },
  insertUser: (req, res)=> {
    let sql = "insert into mytable values(null,'" + req.body.name + "','" + req.body.type + "','"
    + req.body.race + "','" + req.body.datatime + "','" + req.body.location + "','" + req.body.outfit + "')"
    
    promise(sql)
    .then(data => {
      res.send(JSON.stringify(data))
    }).catch(err => {
       res.send(JSON.stringify(err))
    })
  }
}


