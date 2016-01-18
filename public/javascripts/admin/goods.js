//进入页面插入数据
window.onload = getAllStores();
function getAllStores() {
	$.post("/admin/goods/getAllGoods",
        { },
        function(data){
            // 插入数据
            var length = data.length;
            // var length = 0;
            if (length == 0) {
            	var notice = '<h3 style="text-align:center;">暂无商品数据。</h3>';
            	$('.container').append(notice);
            } else { 
	            for (i=0; i<length; i++) {
	            	var tableChild = '<tr><td><input type="text" value="' + data[i].product_id + '" placeholder=" ' + data[i].procuct_id + '" disabled/></td><td><input type="text" value="' + data[i].merchant_id + '"placeholder="' + data[i].merchant_id + '" disabled/></td><td><input type="text" placeholder="' + data[i].product_price + '" disabled/></td><td><input type="text" placeholder="' + data[i].product_description + 
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

//提交修改信息
function submitInfo(event) {
	//隐藏修改按钮，显示提交按钮
	var target = event.target;
	$(target).css('display', 'none');
	$(target).siblings('a').css('display', 'inline-block');
	var target = event.target;
	$(target).css('display', 'none');
	$(target).siblings('a').css('display', 'inline-block');
	var parent = $(target).parent().parent();
	var brothers = $(parent).children();

	var merchant_id = $(brothers[0]).children('input').val();
	var merchant_password = $(brothers[1]).children('input').val();
	var merchant_phone = $(brothers[2]).children('input').val();
	var merchant_description = $(brothers[3]).children('input').val();
	if (!merchant_phone) {
		alert('请输入新的商品价格！');
	} else if (!merchant_description) {
		alert('请输入新的商品简介！');
	} else {
		console.info(merchant_id);
		console.info(merchant_password);
		console.info(merchant_phone);
		console.info(merchant_description);
		$.post("/admin/change",
	        { stype: 'good', sid: merchant_id, password: merchant_password, phone: merchant_phone, descriptions: merchant_description},
	        function(data){
	        	console.info(data);
	            if (data.updateSuccess == 1) {
	            	alert('修改成功！');
	            	location.reload();
	            	for(i=1; i<brothers.length; i++) {
						$(brothers[i]).children('input').attr('disabled', '');
					}
	            }
				
	        }
    	);
	}
}

//新增商家
function addStore() {
	var newId = $('.newId').val();
	var newPwd = $('.newPwd').val();
	var newPhone = $('.newPhone').val();
	var newInfo = $('.newIntro').val();
	if (!newId) {
		alert('ID不能为空！');
	} else if (!newPwd) {
		alert('密码不能为空！');
	} else if (!newPhone) {
		alert('号码不能为空！');
	} else if (!newInfo) {
		alert('地址不能为空！');
	} else {
		$.post("/admin/add",
	        { stype: 'good', sid: newId, password: newPwd, phone: newPhone, descriptions: newInfo},
	        function(data){
	            if (data.addSuccess == 1) {
	            	alert('新增成功！');
	            	location.reload();
	            } else if (data.usernameExist == 1) {
	            	alert('商品已经存在，请更换商品ID！');
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
		$.post("/admin/remove",
	        { stype: 'good', sid: deleteId},
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
		$.post("/admin/search",
	        { stype: 'good', sid: searchId},
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
