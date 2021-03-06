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

	var userType = req.body.stype;
	var userId = req.body.sid;
	var userPassword = req.body.password;
	var userPhone = req.body.phone;
	var userInfo = req.body.descriptions;
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
		field[3] = 'merchant_description';
		user.merchant_id = userId;
		user.merchant_password = userPassword;
		user.merchant_phone = userPhone;
		user.merchant_description = userInfo;
	} else {
		table = 'Product';
		field[0] = 'product_id';
		field[1] = 'merchant_id';
		field[2] = 'product_price';
		field[3] = 'product_description';
		user.product_id = userId;
		user.merchant_id = userPassword;
		user.product_price = userPhone;
		user.product_description = userInfo;
	}

	con.query('select * from ' + table + ' where ' + field[0] + '="' + userId + '";', function(err, rows) {
		var return_info = Object();
		return_info.usernameExist = 0;
		return_info.addSuccess = 0;
		if (rows.length != 0) {
			return_info.usernameExist = 1;
			res.send(return_info);
		} else {
			con.query('insert into ' + table + ' set ?', user, function(err, resp) {
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
	var type = req.body.stype;
	var sql;
	if (type == 'user') {
		var id = req.body.sid;
		sql = 'select * from Customer where customer_id = "' + id + '";';
	} else if (type == 'store') {
		var id = req.body.sid;
		sql = 'select * from Merchant where merchant_id = "' + id + '";';
	} else if (type == 'good') {
		var id = req.body.sid;
		sql = 'select * from Product where product_id = "' + id + '";';
	} else {

	}

	con.query(sql, function(err, rows) {
		res.send(rows);
	});
}

/* 修改一个用户或者商品的信息. */
exports.change = function (req, res, next) {
	//接收： type + 所有相关信息，判断session是否正确
	var type = req.body.stype;
	var sql;
	if (type == 'user') {
		var id = req.body.sid;
		var password = req.body.password;
		var phone = req.body.phone;
		var address = req.body.descriptions;
		var sql = 'update Customer set customer_password = "' + password + '"'
			+ ' , customer_phone =  "' + phone + '"'
			+ ' , customer_address = "' + address + '"'
			+ ' where customer_id = "' + id + '";';
	} else if (type == 'store') {
		var id = req.body.sid;
		var password = req.body.password;
		var phone = req.body.phone;
		var description = req.body.descriptions;
		var sql = 'update Merchant set merchant_password = "' + password + '"'
			+ ' , merchant_phone =  "' + phone + '"'
			+ ' , merchant_description = "' + description + '"'
			+ ' where merchant_id = "' + id + '";';
	} else if (type == 'good') {
		var id = req.body.sid;
		var merchant_id = req.body.password;
		var price = req.body.phone;
		var description = req.body.descriptions;
		var image_path = '/images/a.jpg';
		var sql = 'update Product set merchant_id = "' + merchant_id + '"'
			+ ' , product_price =  ' + price
			+ ' , product_description = "' + description + '"'
			+ ' , image_path = "' + image_path + '"'
			+ ' where product_id = "' + id + '";';
	} else {

	}
	
	con.query(sql, function(err, resp) {
		var return_info = Object();
		return_info.updateSuccess = 0;
		if (err) {
			return_info.updateSuccess = 0;
			res.send(return_info);
		} else {
			return_info.updateSuccess = 1;
			res.send(return_info);
		}
	});
}

/* 删除一个用户或者商品. */
exports.remove = function (req, res, next) {
	//接收： type + ID，判断session是否正确
	var type = req.body.stype;
	var sql;
	if (type == 'user') {
		var id = req.body.sid;
		sql = 'delete from Customer where customer_id = "' + id + '";';
	} else if (type == 'store') {
		var id = req.body.sid;
		sql = 'delete from Merchant where merchant_id = "' + id + '";';
	} else if (type == 'good') {
		var id = req.body.sid;
		sql = 'delete from Product where product_id = "' + id + '";';
	} else {

	}
	con.query(sql, function(err, resp) {
		var return_info = Object();
		return_info.deleteSuccess = 0;
		if (err) {
			return_info.deleteSuccess = 0;
			res.send(return_info);
		} else {
			return_info.deleteSuccess = 1;
			res.send(return_info);
		}
	});
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
	con.query('select * from Merchant;', function(err, rows) {
		res.send(rows);
	});
}

/* 用户信息展示页面. */
exports.users = function (req, res, next) {
	//获取所有用户信息，判断session是否正确
	res.render('admin/users');
}
/* 获取所有用户信息. */
exports.getAllUsers = function (req, res, next) {
	con.query('select * from Customer;', function(err, rows) {
		res.send(rows);
	});
}

/* 商品信息展示页面 */
exports.goods = function (req, res, next) {
	res.render('admin/goods');
}
/* 获取所有商品信息. */
exports.getAllGoods = function (req, res, next) {
	con.query('select * from Product;', function(err, rows) {
		res.send(rows);
	});
}
