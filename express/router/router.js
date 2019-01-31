var express = require("express");

var router = express.Router();
var handler = require('../handler/handler')
// 解决跨域中间件
router.use("/", handler.getCors);
// 查询接口
router.post("/api/userlist",handler.getUserlist);
// 根据id获取数据
router.post("/api/getUserId", handler.getUserId)
// 修改资料
router.post("/api/updateUser", handler.updateUserId)
// 删除人员资料
router.post("/api/deleteUser", handler.deleteUser)
// 添加人员资料
router.post("/api/insertUser", handler.insertUser)

module.exports = router