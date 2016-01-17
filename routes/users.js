var db = require('mysql');
var con = db.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'helloworld'
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
	var user_id;
	var sql = 'select * from Customer where customer_id = "' + user_id + '";';
	con.query(sql, function(err, rows) {
		res.send(rows);
	});
}

/* 主页：显示我的所有订单. */
exports.allOrders = function (req, res, next) {
	//如果麻烦就不要了，需要做分页功能
	var user_id;
	var order_id;

	var sql = 'select * from Order where customer_id = "' + user_id + '";';
	con.query(sql, function(err, rows) {
		res.send(rows);
	});
}

/* 查看订单详情. */
exports.orderDetail = function (req, res, next) {
	//接收：唯一订单号
	var order_id = '1';
	var sql = 'select * from Order_Product, Product '
		+ 'where Order_Product.product_id = Product.product_id and Order_Product.order_id = "' + order_id + '";';
	con.query(sql, function(err, rows) {
		res.send(rows);
	});
}

/* 评价订单和上传订单图片. */
exports.orderEvaluation = function (req, res, next) {

}

/* 查询订单. */
exports.searchOrder = function (req, res, next) {
	//接收：订单号
}



