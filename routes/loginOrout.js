/* 数据库应用封装模块请求. */
var db = require('mysql');
var con = db.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'helloworld'
});
con.connect();
var DBName = 'WebDevelopment';
con.query('use ' + DBName + ';');

/* 定义全局变量，分别表示用户名存在、密码正确与否；1表示存在/正确，0表示错误.  */
var usernameExist, passwordCorrect;

exports.homepage = function (req, res, next) {
	res.render('index');
}
/* 用户登录. */
exports.login = function (req, res, next) {
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
	con.query('select * from ' + table + ' where ' + id + '="' + username + '";', function(err, rows) {
		if(err) throw err;
		if (rows.length !== 0) {
			usernameExist = 1;
			console.info(rows[0]);
			if ((userType == 'admin' && rows[0].admin_password == password) || 
				(userType == 'user' && rows[0].customer_password == password) ||
				(userType == 'store' && rows[0].merchant_password == password)){
				passwordCorrect = 1;

				//用户名和密码存入session，便于后面路由获取。
				req.session.userType = userType;
				req.session.username = username;
				req.session.password = password;
			} else {
				passwordCorrect = 0;
			}
		} else {
			usernameExist = 0;
			passwordCorrect = 0;
		}
		var return_info = Object();
		return_info.usernameExist = usernameExist;
		return_info.passwordCorrect = passwordCorrect;
		return_info.userType = req.session.userType;
		res.send(return_info);
	});
}

exports.logout = function (req, res, next) {
	//清除session，跳到登录页面
	req.session = null;
	res.render('index');
	
}