var db = require('mysql');
var con = db.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});
con.connect();
var DBName = 'WebDevelopment';
con.query('use ' + DBName + ';');

/* 新增一个用户或者商家或者商品. */
exports.add = function (req, res, next) {
	//接收：type + 各种相关信息，判断session是否正确

	var userType = 'store';
	var userId = 'test7';
	var userPassword = 'test2';
	var userPhone = '123456';
	var userInfo = 'test2';
	var table;
	var field = [];
	var user = Object();
	if (userType == 'user') {
		table = 'Customer';
		field[0] = 'customer_id';
		field[1] = 'customer_password';
		field[2] = 'customer_phone';
		field[3] = 'customer_address';
		user.customer_id = userId;
		user.customer_password = userPassword;
		user.customer_phone = userPhone;
		user.customer_address = userInfo;
	} else if (userType == 'store') {
		table = 'Merchant';
		field[0] = 'merchant_id';
		field[1] = 'merchant_password';
		field[2] = 'merchant_phone';
		field[3] = 'description';
		user.merchant_id = userId;
		user.merchant_password = userPassword;
		user.merchant_phone = userPhone;
		user.merchant_description = userInfo;
	} else {

	}

	//1.check 2.add
	con.query('select * from ' + table + ' where ' + field[0] + '="' + userId + '";', function(err, rows) {
		var return_info = Object();
		return_info.usernameExist = 0;
		return_info.addSuccess = 0;
		if (rows.length != 0) {
			return_info.usernameExist = 1;
			res.send(return_info);
		} else {
			con.query('insert into ' + table + ' set ?', user, function(err, res) {
				if (err) {
					return_info.addSuccess = 0;
					res.send(return_info);
				} else {
					return_info.addSuccess = 1;
					res.send(return_info);
				}
			});
		}
	});
}

/* 查询一个用户或者商户或者商品信息. */
exports.search = function (req, res, next) {
	//接收：type + ID，判断session是否正确
	var type = 'user';
	var id = 'test';
	var table;
	var field = [];
	if (type == 'user') {
		table = 'Customer';
		field[0] = 'customer_id';
	} else if (type == 'store') {
		table = 'Merchant';
		field[0] = 'merchant_id';
	} else if (type == 'good') {
		table = 'Product';
		field[0] = 'product_id';
	} else {

	}

	con.query('select * from ' + table + ' where ' + field[0] + '="' + id + '";' ,function(err, rows) {
		var return_info = Object();
		console.log(rows);
		res.send(rows);
	});
}

/* 修改一个用户或者商品的信息. */
exports.change = function (req, res, next) {
	//接收： type + 所有相关信息，判断session是否正确
	var type = 'user';
	var table;
	var field = [];
	if (type == 'user') {
		table = 'Customer';
		field[0] = 'customer_id';
	} else if (type == 'store') {
		table = 'Merchant';
		field[0] = 'merchant_id';
	} else if (type == 'good') {
		table = 'Product';
		field[0] = 'product_id';
	} else {

	}
	con.query('update ');
}

/* 删除一个用户或者商品. */
exports.remove = function (req, res, next) {
	//接收： type + ID，判断session是否正确
	var table;
	var field = [];
	con.query('delete');
}

/* 主页：商户展示页面. */
exports.stores = function (req, res, next) {
	//获取所有商户信息，判断session是否正确
	// var userType = req.session.userType;
	// var username = req.session.username;
	// var password = req.session.password;
	// if (userType == 'admin') {

	// }	
	res.render('admin/stores');
}

/* API: 获取所有商户信息. */
exports.getAllStores = function (req, res, next) {
	var data;
	con.query('select * from Merchant;', function(err, rows) {
		console.info(rows);
		res.send(rows);
	});
}

/* 用户信息展示页面. */
exports.users = function (req, res, next) {
	//获取所有用户信息，判断session是否正确
	con.query('select * from Customer;', function(err, rows) {
		res.send(rows);
	});
	res.render('users', { users: users});
}

/* 商品信息展示页面 */
exports.goods = function (req, res, next) {
	//获取所有商品信息，判断session是否正确
	con.query('select * from Product;', function(err, rows) {
		res.send(rows);
	});
	res.render('goods', { goods: goods});
}