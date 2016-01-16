//进入页面插入数据
window.onload = getAllStores();
function getAllStores() {
	$.post("/admin/getAllStores",
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
	            	var tableChild = '<tr><td><input type="text" value="' + data[i].merchant_id + '" placeholder=" ' + data[i].merchant_id + '" disabled/></td><td><input type="text" placeholder="' + data[i].merchant_password + '" disabled/></td><td><input type="text" placeholder="' + data[i].merchant_phone + '" disabled/></td><td><input type="text" placeholder="' + data[i].merchant_description + 
	            	 '" disabled/></td><td>' + '<a class="btn btn-warning" href="javascript:void(0)" onclick="changeInfo(event)" style="display:inline-block;">修改' + '<a class="btn btn-info"  href="javascript:void(0)" onclick="submitInfo(event)" style="display:none;">提交</td></tr>';
	            	$('table').append(tableChild);
	            }
	        }
    });
	// $('input').attr('disabled', 'disabled');
}

//修改商户信息
function changeInfo(event) {
	var target = event.target;
	$(target).css('display', 'none');
	$(target).siblings('a').css('display', 'inline-block');
	//使输入框可用
	var parent = $(target).parent().parent();
	var brothers = $(parent).children();
	for(i=1; i<brothers.length; i++) {
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
	
	var merchant_id = $(brothers[0]).children('input').val();
	var merchant_password = $(brothers[1]).children('input').val();
	var merchant_phone = $(brothers[2]).children('input').val();
	var merchant_description = $(brothers[3]).children('input').val();
	if (!merchant_password) {
		alert('请输入新的商家密码！');
	} else if (!merchant_phone) {
		alert('请输入新的商家客服号码！');
	} else if (!merchant_description) {
		alert('请输入新的商家描述！');
	} else {
		$.post("/admin/change",
	        { type: 'store', merchant_id: merchant_id, merchant_password: merchant_password, merchant_phone: merchant_phone, merchant_description: merchant_description},
	        function(data){
	            console.info(data);
	            //使输入框不可用
				var parent = $(target).parent().parent();
				var brothers = $(parent).children();
				for(i=1; i<brothers.length; i++) {
					$(brothers[i]).children('input').attr('disabled', '');
				}
	        }
    	);
	}

}
