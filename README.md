# This is an Express project, with mysql and multiparty.
# Install nodejs and redis, open redis-server.
# Enter this project and find package.json, run cnpm install in bash.
# Run npm start in bash, and type localhost:3000 in your broswer to visit the site.

三个数据表： 商家、用户、管理员（事先生成）、商品表

1: 注册（仅限用户）
	传参： 用户名、密码、usertype  －>写表
2: 登陆
	传参： 同上   ->查表
3: 商家
	展示所有商品（点击进入商品详情）、商家信息
	添加、删除、修改商品信息按钮、修改商家信息
4: 用户
	首页：商家展示、进入商家查看商品、加入购物车下订单
	修改用户信息、订单查询
5: 管理员
	看、改


