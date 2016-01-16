var express = require('express');
var router = express.Router();

/* 请求同目录下的三个路由控制模块 *.js，从而集中处理路由，便于维护. */
var admin = require('./admin');
var users = require('./users');
var store = require('./store');

/* 应用封装模块请求. */
var db = require('mysql');
var con = db.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'helloworld'
});
con.connect();
var DBName = 'WebDevelopment';
con.query('use ' + DBName + ';');
// var DB = db.DB;
// var BaseRow = db.Row;
// var BaseTable = db.Table;

/* 定义全局变量，分别表示用户名存在、密码正确与否；1表示存在/正确，0表示错误.  */
var usernameExist, passwordCorrect;

/* 主页登录页面. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'express'});
});

/* 用户登录. */
router.post('/login', function (req, res, next) {
	console.info(req.body);
	var userType = req.body.userType;
	var username = req.body.username;
	var password = req.body.password;
	var table, id, pw;
	if (userType == 'admin') {
		table = 'Admin';
		id = 'admin_id';
		pw = 'admin_password';
	} else if (userType == 'user') {
		table = 'Customer';
		id = 'customer_id';
		pw = 'Customer_password';
	} else {
		table = 'Merchant';
		id = 'merchant_id';
		pw = 'merchant_password';
	}
	console.info(table, id, username);
	con.query('select * from ' + table + ' where ' + id + '="' + username + '";', function(err, rows) {
		if(err) throw err;
		console.log(rows);
		if (rows) {
			if (rows[0].admin_password == password) {

			} else {

			}
		} else {
			return 
		}
	})
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
