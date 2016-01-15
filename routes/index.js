var express = require('express');
var router = express.Router();

/* 请求同目录下的三个路由控制模块 *.js，从而集中处理路由，便于维护. */
var admin = require('./admin');
var users = require('./users');
var store = require('./store');

/* 应用封装模块请求. */
var db = require('node-mysql');
var DB = db.DB;
var BaseRow = db.Row;
var BaseTable = db.Table;

/* 用户登录 */
router.get('/', function (req, res, next) {
	//将用户名和密码和type写进session，根据type跳转到相应页面
	req.session.userId = 'huguantao';
	res.render('index', { title: 'express'});

});

/* 用户退出. */
router.get('/logout', function (req, res, next) {
	//清除session，跳到登录页面
	
});

/* 管理员相关路由及控制模块. */
router.get('/admin', admin.stores);
router.get('/admin/users', admin.users);
router.get('/admin/goods', admin.goods);
router.post('/admin/add', admin.add);
router.post('/admin/search', admin.search);
router.post('/admin/change', admin.change);
router.post('/admin/remove', admin.remove);

/* 商家相关路由以及控制模块. */
router.get('/store', store.store);
router.get('/store/changePhone', store.changePhone);
router.get('/store/changeGoodsInfo', store.changeGoodsInfo);
router.get('/store/searchGoods', store.searchGoods);
router.get('/store/addGoods', store.addGoods);
router.get('/store/removeGoods', store.removeGoods);

/* 用户相关路由及控制模块. */
router.get('/users', users.allOrders);
router.get('/users/searchOrder', users.searchOrder);
router.get('/users/orderDetail', users.orderDetail);
router.get('/users/orderEvaluation', users.orderEvaluation);

module.exports = router;
