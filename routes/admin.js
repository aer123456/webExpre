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
		field[3] = 'merchant_description';
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
	var sql;
	if (type == 'user') {
		var id = '1';
		sql = 'select * from Customer where customer_id = "' + id + '";';
	} else if (type == 'store') {
		var id = '1';
		sql = 'select * from Merchant where merchant_id = "' + id + '";';
	} else if (type == 'good') {
		var id = '1';
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
	var type = 'good';
	var sql;
	if (type == 'user') {
		var id = 'test1';
		var password = '1';
		var phone = '1';
		var address = '1';
		var sql = 'update Customer set customer_password = "' + password + '"'
			+ ' , customer_phone =  "' + phone + '"'
			+ ' , customer_address = "' + address + '"'
			+ ' where customer_id = "' + id + '";';
	} else if (type == 'store') {
		var id = 'test1';
		var password = '1';
		var phone = '1';
		var description = '1';
		var sql = 'update Merchant set merchant_password = "' + password + '"'
			+ ' , merchant_phone =  "' + phone + '"'
			+ ' , merchant_description = "' + description + '"'
			+ ' where merchant_id = "' + id + '";';
	} else if (type == 'good') {
		var id = '1';
		var merchant_id = 'test7';
		var price = 11;
		var description = '1';
		var image_path = 'img';
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
			console.log('0');
			return_info.updateSuccess = 0;
			res.send(return_info);
		} else {
			console.log('1');
			return_info.updateSuccess = 1;
			res.send(return_info);
		}
	});
}

/* 删除一个用户或者商品. */
exports.remove = function (req, res, next) {
	//接收： type + ID，判断session是否正确
	var type = 'user';
	var sql;
	if (type == 'user') {
		var id = '1';
		sql = 'delete from Customer where customer_id = "' + id + '";';
	} else if (type == 'store') {
		var id = '1';
		sql = 'delete from Merchant where merchant_id = "' + id + '";';
	} else if (type == 'good') {
		var id = '1';
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