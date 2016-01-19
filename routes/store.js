var db = require('mysql');
var con = db.createConnection({
	host: 'localhost',
	user: 'root',
	password: ''
});
con.connect();
var DBName = 'WebDevelopment';
con.query('use ' + DBName + ';');

/* 显示主页信息. */
exports.homepage = function (req, res, next) {
	res.render('store/index');
}

/* 主页：获取本商家信息. */
exports.getStore = function (req, res, next) {
	var merchant_id = req.session.username;
	var sql = 'select * from Merchant where merchant_id = "' + merchant_id + '";';
	con.query(sql, function (err, rows) {
		res.send(rows);
	});
}

/* 主页：获取所有商品信息. */
exports.store = function (req, res, next) {
	//判断session是否正确, 然后根据session中的帐号密码查数据
	var id = req.session.username;
	con.query('select * from Product where merchant_id = "' + id + '";',function(err, rows){
		res.send(rows);
	});
}

/* 商家修改客服号码和商家描述. */
exports.changePhone = function(req, res, next) {
	var phoneNumber = req.body.phone;
	var describe = req.body.describe;
	var merchant_id = req.session.username;

 	var sql = 'update Merchant set merchant_phone = " ' + phoneNumber + '", merchant_description = " ' + describe + '" '
 			+ ' where merchant_id = "' + merchant_id + '";';

 	var changeSuccess = '0';
	con.query(sql, function(err, resp){
		if(err){
			res.send(changeSuccess);
		}else{
			changeSuccess = '1';
			res.send(changeSuccess);
		}	
	});
}

/* 修改商品信息. */
exports.changeGoodsInfo = function (req, res, next) {
	var productMsg = req.body.msg;
	var product_ID = req.body.sid;
	var product_Price = req.body.price;
	var sql = 'update Product set product_description = " ' + productMsg + '",product_Price = "' + product_Price + '" '
 			+ ' where product_id = "' + product_ID + '";';

	var changeSuccess = '0';
 	con.query(sql, function(err,resp){
 		if(err){
 			res.send(changeSuccess);
 		}else{
 			changeSuccess = '1';
 			res.send(changeSuccess);
 		}
 	});
}

/* 查询商品信息. */
exports.searchGoods = function (req, res, next) {
	var product_ID = req.body.sid;
	var sql = 'select * from Product where product_id = "' + product_ID + '";';
	con.query(sql, function(err,rows){
		res.send(rows);
	});
}

/* 增加商品信息. */
exports.addGoods = function (req, res, next) {
	var merChant_ID = req.session.username;

	var product = Object();
	var changeSuccess = '0';
	product.merchant_id = merChant_ID;
	product.product_description = req.body.describe;
	product.product_id = req.body.sid;
	product.product_price = req.body.price;
	product.image_path = 'xxx';
	con.query('insert into Product' + ' set ? ', product, function(err,resp){
		if(err){
			res.send(changeSuccess);
		}else{
			changeSuccess = '1';
			res.send(changeSuccess);
		}
	});	
}

/* 删除商品信息. */
exports.removeGoods = function (req, res, next) {
	var product_ID = req.body.sid;
	var sql = 'delete from Product where product_id = "' + product_ID + '";';

	var isDelete = '0';
	con.query(sql, function(err, resp){
		if(err){
			res.send(isDelete);
		}else{
			isDelete = '1';
			res.send(isDelete);
		}
	});
}