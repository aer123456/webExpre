//进入页面插入数据
window.onload = getStoreInfo();
window.onload = getAllStores();

//获取该商家基本信息
function getStoreInfo() {
	$.post("/store/getStore",
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
	            	var tableChild = '<tr><td><input type="text" value="' + data[i].merchant_id + '" placeholder=" ' + data[i].merchant_id + '" disabled/></td><td><input type="text" value=' + '保密' + ' placeholder="' + '保密' + '" disabled/></td><td><input type="text" placeholder="' + data[i].merchant_phone + '" disabled/></td><td><input type="text" placeholder="' + data[i].merchant_description + 
	            	 '" disabled/></td><td>' + '<a class="btn btn-warning" href="javascript:void(0)" onclick="changeInfo(event)" style="display:inline-block;">修改' + '<a class="btn btn-info"  href="javascript:void(0)" onclick="submitStoreInfo(event)" style="display:none;">提交</td></tr>';
	            	$('table.info').append(tableChild);
	            }
	        }
    });
}

//获取该商家所有商品信息
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
	            	 '" disabled/></td><td>' + '<a class="btn btn-warning" href="javascript:void(0)" onclick="changeInfo(event)" style="display:inline-block;">修改' + '<a class="btn btn-info"  href="javascript:void(0)" onclick="submitInfo(event)" style="display:none;">提交</td></tr>';
	            	$('table.stores').append(tableChild);
	            }
	        }
    });
}

//修改商品信息
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

/* 提交商家修改信息. */
function submitStoreInfo(event) {
	var target = event.target;
	$(target).css('display', 'none');
	$(target).siblings('a').css('display', 'inline-block');
	var parent = $(target).parent().parent();
	var brothers = $(parent).children();

	// var product_id = $(brothers[0]).children('input').val();
	var product_price = $(brothers[2]).children('input').val();
	var product_description = $(brothers[3]).children('input').val();
	if (!product_price) {
		alert('请输入新的商家客服电话！');
	} else if (!product_description) {
		alert('请输入新的商家简介！');
	} else {
		$.post("/store/changePhone",
	        { phone: product_price, describe: product_description},
	        function(data){
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

//提交商品修改信息
function submitInfo(event) {
	//隐藏修改按钮，显示提交按钮
	
	var target = event.target;
	$(target).css('display', 'none');
	$(target).siblings('a').css('display', 'inline-block');
	var parent = $(target).parent().parent();
	var brothers = $(parent).children();

	var product_id = $(brothers[0]).children('input').val();
	var product_price = $(brothers[2]).children('input').val();
	var product_description = $(brothers[3]).children('input').val();
	if (!product_price) {
		alert('请输入新的商品价格！');
	} else if (!product_description) {
		alert('请输入新的商品描述！');
	} else {
		$.post("/store/changeGoodsInfo",
	        { sid: product_id, price: product_price, msg: product_description},
	        function(data){
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

//新增商品
function addStore() {
	var newId = $('.newId').val();
	var newPrice = $('.newPrice').val();
	var newDesc = $('.newDesc').val();
	if (!newId) {
		alert('ID不能为空！');
	} else if (!newPrice) {
		alert('商品价格不能为空！');
	} else if (!newDesc) {
		alert('简介不能为空！');
	} else {
		$.post("/store/addGoods",
	        { sid: newId, price: newPrice, describe: newDesc},
	        function(data){
	            if (data == 1) {
	            	alert('新增成功！');
	            	location.reload();
	            } else {
	            	alert('出现内部错误，请联系开发人员。');
	            }	
	        }
    	);
	}
}

//删除商家
function deleteStore() {
	var deleteId = $('.deleteId').val();
	if (!deleteId) {
		alert('ID不能为空！');
	} else {
		$.post("/store/removeGoods",
	        {sid: deleteId},
	        function(data){
	            if (data.length == 0) {
	            	alert('出现内部错误，请联系开发人员。');
	            } else {
	            	alert('删除成功！');
	            	location.reload();
	            }
	        }
    	);
	}
}

//搜索商家
function searchStore() {
	var searchId = $('.searchId').val();
	if (!searchId) {
		alert('ID不能为空！');
	} else {
		$.post("/store/searchGoods",
	        {sid: searchId},
	        function(data){
	            if (data.length == 0) {
	            	alert('出现内部错误，请联系开发人员。');
	            } else {
	            	$('.child').remove();
	            	var tableChild = '<tr class="child"><td><input type="text" value="' + data[0].product_id + '" placeholder=" ' + data[0].product_id + '" disabled/></td><td><input type="text" placeholder="' + data[0].merchant_id + '" disabled/></td><td><input type="text" placeholder="' + data[0].product_price + '" disabled/></td><td><input type="text" placeholder="' + data[0].product_description + 
	            	 '" disabled/></td><td>' + '</tr>';
	            	$('table.search').append(tableChild);
	            }
	        }
    	);
	}
}
