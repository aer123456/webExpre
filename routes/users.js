var db = require('mysql');
var con = db.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});
con.connect();
var DBName = 'WebDevelopment';
con.query('use ' + DBName + ';');

/* 主页. */
exports.homepage = function (req, res, next) {
	res.render('user/users');
}

/*  */
exports.userInfo = function (req, res, next) {
	//post请求，获取用户信息
	var user_id = req.session.username;
	var sql = 'select * from Customer where customer_id = "' + user_id + '";';
	con.query(sql, function(err, rows) {
		res.send(rows);
	});
}

/* 主页：显示我的所有订单. */
exports.allOrders = function (req, res, next) {
	//如果麻烦就不要了，需要做分页功能
	var user_id = req.session.username;

	var sql = 'select * from Orders where customer_id = "' + user_id + '";';
	con.query(sql, function(err, rows) {
		res.send(rows);
	});
}

/* 修改用户信息，包括电话和地址. */
exports.changeInfo = function (req, res, next) {
	var customer_id = req.session.username;
	var customer_phone = req.body.phone;
	var customer_address = req.body.address;
	var sql = 'update Customer set customer_phone =  "' + customer_phone + '"'
			+ ' , customer_address = "' + customer_address + '"'
			+ ' where customer_id = "' + customer_id + '";';
	con.query(sql, function(err, resp) {
		var updateSuccess = '0';
		if (err) {
			updateSuccess = '0';
			res.send(updateSuccess);
		} else {
			updateSuccess = '1';
			res.send(updateSuccess);
		}
	});
}

/* 查看订单详情. */
exports.orderDetail = function (req, res, next) {
	//接收：唯一订单号
	var order_id = '1';
	var sql = 'select * from Orders, Order_Product, Product '
		+ 'where Orders.order_id = Order_Product.product_id and Order_Product.product_id = Product.product_id and Order_Product.order_id = "' + order_id + '";';
	con.query(sql, function(err, rows) {
		res.send(rows);
	});
}

/* 新增订单. */
exports.addOrder = function (req, res, next) {
	var user_id = req.session.username;
	var order_id = new Date().getTime();
	var products_id = req.body.products_id.split('&');

	var sql = 'insert into Orders(order_id,customer_id) values("' + order_id + '","' + user_id + '");';
	con.query(sql, function(err, resp) {});
	for (var i = 0; i < products_id.length - 1; i++ ) {
		sql = sql = 'insert into Order_Product(order_id,product_id) values("' + order_id + '","' + products_id[i] + '");';
		con.query(sql, function(err, resp) {});
	}
	res.send("1");
}

/* 评价订单和上传订单图片. */
exports.orderEvaluation = function (req, res, next) {

}

/* 查询订单. */
exports.searchOrder = function (req, res, next) {
	//接收：订单号
}



