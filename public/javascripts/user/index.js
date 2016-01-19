//进入页面插入数据
window.onload = getStoreInfo();
window.onload = getAllStores();
window.onload = getOrders();

//获取该用户基本信息
function getStoreInfo() {
	$.post("/users/userInfo",
        { },
        function(data){
            // 插入数据
            var length = data.length;
            // var length = 0;
            if (length == 0) {
            	var notice = '<h3 style="text-align:center;">暂无商家数据。</h3>';
            	$('.container').append(notice);
            } else { 
	            for (i=0; i<length; i++) {
	            	var tableChild = '<tr><td><input type="text" value="' + data[i].customer_id + '" placeholder=" ' + data[i].customer_id + '" disabled/></td><td><input type="text" value=' + '保密' + ' placeholder="' + '保密' + '" disabled/></td><td><input type="text" placeholder="' + data[i].customer_phone + '" disabled/></td><td><input type="text" placeholder="' + data[i].customer_address + 
	            	 '" disabled/></td><td>' + '<a class="btn btn-warning" href="javascript:void(0)" onclick="changeInfo(event)" style="display:inline-block;">修改' + '<a class="btn btn-info"  href="javascript:void(0)" onclick="submitStoreInfo(event)" style="display:none;">提交</td></tr>';
	            	$('table.info').append(tableChild);
	            }
	        }
    });
}

//修改用户信息按钮
function changeInfo(event) {
	var target = event.target;
	$(target).css('display', 'none');
	$(target).siblings('a').css('display', 'inline-block');
	//使输入框可用
	var parent = $(target).parent().parent();
	var brothers = $(parent).children();
	for(i=2; i<brothers.length; i++) {
		$(brothers[i]).children('input').removeAttr('disabled');
	}
}

/* 提交用户修改信息. */
function submitStoreInfo(event) {
	var target = event.target;
	$(target).css('display', 'none');
	$(target).siblings('a').css('display', 'inline-block');
	var parent = $(target).parent().parent();
	var brothers = $(parent).children();

	var product_price = $(brothers[2]).children('input').val();
	var product_description = $(brothers[3]).children('input').val();
	if (!product_price) {
		alert('请输入新的用户联系电话！');
	} else if (!product_description) {
		alert('请输入新的用户收货地址！');
	} else {
		$.post("/users/changeInfo",
	        { phone: product_price, address: product_description},
	        function(data){
	        	console.info(data);
	            if (data == 1) {
	            	alert('修改成功！');
	            	location.reload();
	            	for(i=2; i<brothers.length; i++) {
						$(brothers[i]).children('input').attr('disabled', '');
					}
	            } else {
	            	alert('出现内部错误，请联系开发人员。');
	            }
	        }
    	);
	}
}

//获取商家所有商品信息
function getAllStores() {
	$.post("/store/all",
        { },
        function(data){
            // 插入数据
            var length = data.length;
            // var length = 0;
            if (length == 0) {
            	var notice = '<h3 style="text-align:center;">该商家暂无商品数据。</h3>';
            	$('.container').append(notice);
            } else { 
	            for (i=0; i<length; i++) {
	            	var tableChild = '<tr><td><input type="text" value="' + data[i].product_id + '" placeholder=" ' + data[i].product_id + '" disabled/></td><td><input type="text" value=' + data[i].merchant_id + ' placeholder="' + data[i].merchant_id + '" disabled/></td><td><input type="text" placeholder="' + data[i].product_price + '" disabled/></td><td><input type="text" placeholder="' + data[i].product_description + 
	            	 '" disabled/></td><td>' + '<a class="btn btn-warning" href="javascript:void(0)" onclick="addGoods(event)" style="display:inline-block;">添加到购物车' + '<a class="btn btn-info"  href="javascript:void(0)" style="display:none;">已添加</td></tr>';
	            	$('table.stores').append(tableChild);
	            }
	        }
    });
}

//得到我的所有订单
function getOrders(){
	$.post("/users/allOrders",
		{ },
		function(data) {
			var length = data.length;
			for (i=0; i<length; i++) {
				var j = i + 1;
				var tableChild = '<tr><td><input type="text" placeholder=" ' + j + '" disabled/></td><td><input type="text" placeholder="' + data[i].order_id + '" disabled/></td><td><input type="text" placeholder="' + data[i].order_time + '" disabled/></td>' +
	            + '</tr>';
	            $('table.all').append(tableChild);
			}

		}
	);
}

//定义全局变量来作为购物车
var order_extend = '';

//添加到购物车
function addGoods(event) {
	var target = event.target;
	$(target).css('display', 'none');
	$(target).siblings('a').css('display', 'inline-block');
	var parent = $(target).parent().parent();
	var brothers = $(parent).children();
	var product_id = $(brothers[0]).children('input').val();
	order_extend = order_extend + product_id + '&';
	console.info(order_extend);
}

//下单
function confirmOrder() {
	if(order_extend == '') {
		alert('请选择商品加入购物车！');
	} else {
		$.post("/users/addOrder",
			{ products_id: order_extend},
			function(data) {
				if(data == 1) {
					alert('下单成功！');
					order_extend = '';
					location.reload();
				} else {
					alert('下单失败，请联系客服！');
				}
			}
		);
	}
}
