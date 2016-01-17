var express = require('express');
var router = express.Router();

/* 请求同目录下的四个路由控制模块 *.js，从而集中处理路由，便于维护. */
var loginOrout = require('./loginOrout');
var admin = require('./admin');
var users = require('./users');
var store = require('./store');


/* 主页登录页面. */
router.get('/', loginOrout.homepage);
/* 用户登录. */
router.post('/login', loginOrout.login);
/* 用户退出. */
router.get('/logout', loginOrout.logout);

/* 管理员相关路由及控制模块. */
router.get('/admin', admin.stores);
router.post('/admin/getAllStores', admin.getAllStores);
router.get('/admin/users', admin.users);
router.get('/admin/users/getAllUsers', admin.getAllUsers);
router.get('/admin/goods', admin.goods);
router.get('/admin/goods/getAllGoods', admin.getAllGoods);
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
router.get('/users', users.homepage);
router.post('/users/userInfo', users.userInfo);
router.get('/users/orderDetail', users.orderDetail);
router.get('/users/orderEvaluation', users.orderEvaluation);

module.exports = router;
