var goodsId = window.location.hash.slice(1);
var userId=localStorage.getItem('login');
var num=document.getElementById('text');
$('#sub').click(function(){
	if(num.value>0)num.value--;
})
$('#add').click(function(){
	if(num.value>=0)num.value++;
})
//商品详情请求
$.ajax({
	type:'get',
	url:'http://datainfo.duapp.com/shopdata/getGoods.php',
	data:{goodsID:goodsId},
	dataType:'JSONP',
	success:function(data){
		console.log(localStorage.getItem('login'));
		console.log(data);
		document.getElementsByTagName('img')[0].src = data[0][3];
		document.getElementById('name').innerHTML = data[0].goodsName;
		document.getElementById('price').innerHTML = '￥'+data[0].price;
		document.getElementById('buynumber').innerHTML = '销量：'+data[0].buynumber;
		document.getElementById('detail').innerHTML = data[0].detail;
	 },
	error:function(){
		alert('error');
	}
})		
//加入购物车		
$('#btn').click(function(){
	$.ajax({
	type:'get',
	url:'http://datainfo.duapp.com/shopdata/updatecar.php',
	data:{userID:userId,goodsID:goodsId,number:num.value},
	success:function(data){
		console.log(data);	
		if(data==1){
			if(num.value==0){
				alert('添加数量');
			}
			else{alert('加入成功');}
			
		}
		else if(!userId){
			alert('请先登录');
		}
		else if(num.value==0){
				alert('添加数量');
			}
	 },
	error:function(){
		alert('error');
	}
})
})