/* 新增一个用户或者商家或者商品. */
exports.add = function (req, res, next) {
	//接收：type + 各种相关信息，判断session是否正确
}

/* 查询一个用户或者商户或者商品信息. */
exports.search = function (req, res, next) {
	//接收：type + ID，判断session是否正确
}

/* 修改一个用户或者商品的信息. */
exports.change = function (req, res, next) {
	//接收： type + 所有相关信息，判断session是否正确
}

/* 删除一个用户或者商品. */
exports.remove = function (req, res, next) {
	//接收： type + ID，判断session是否正确
}

/* 主页：商户展示页面. */
exports.stores = function (req, res, next) {
	//获取所有商户信息，判断session是否正确
	var a = req.session.userId;
	console.info(a);
	res.render('stores', { stores: 'stores'});
}

/* 用户信息展示页面. */
exports.users = function (req, res, next) {
	//获取所有用户信息，判断session是否正确
	res.render('users', { users: users});
}

/* 商品信息展示页面 */
exports.goods = function (req, res, next) {
	//获取所有商品信息，判断session是否正确
	res.render('goods', { goods: goods});
}