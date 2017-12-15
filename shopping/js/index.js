$(function(){
	$('.owrapper').navbarscroll();
	$.ajax({
		type:'get',
		url:'http://datainfo.duapp.com/shopdata/getclass.php',
		dataType:'JSON',
		success:function(data){
			console.log(data);
			for(var i=0;i<data.length-6;i++){
				$('#wrapli').after('<li classId="'+data[i].classID+'">'+data[i].className+'</li>');
			}
			$('#wrapul>li').on('click',function(){
				var classId =this.getAttribute('classId');				
				$.ajax({
					type:'get',
					url:'http://datainfo.duapp.com/shopdata/getGoods.php',
					data:{classID:classId},
					dataType:'JSONP',
					success:function(data){
						console.log(data);
						if(data){
							$('#lists').html(null);
							for(var i=0;i<data.length;i++){
								$('#lists').html($('#lists').html()+'<li class="goodList" goodId='
								+data[i].goodsID+'><img src="'+data[i][3]
								+'" alt="" class="goodImg"><p style="display:block;">'
								+data[i][2].slice(0,5)+'...'+'</p></li>');						
							}
							$('#lists>li').on('click',function(){
								window.location.href = 'detail.html#'+this.getAttribute('goodId');					
							})
						}
						else{
							$('#lists').html('无相关商品');
						}					
		 			},
					error:function(){
						alert('getGoods');
					}
				})					
			})
		}
	})
})
//点击首页
$('#wrapli').click(function(){
	$.ajax({
		type:'get',
		url:'http://datainfo.duapp.com/shopdata/getGoods.php',
		dataType:'jsonp',
		success:function(data){
			console.log(data);
			for(var i=0;i<data.length;i++){
				$('#lists').html($('#lists').html()+'<li class="goodList" goodId='+data[i].goodsID
				+'><img src="'+data[i][3]
				+'" alt="" class="goodImg"><p style="display:block;">'
				+data[i][2].slice(0,5)+'...'+'</p></li>');						
			}
			$('#lists>li').on('click',function(){
				window.location.href = 'detail.html#'+this.getAttribute('goodId');					
			})
		 },
		error:function(){
			alert('点击首页');
		}
})
})
//搜索请求
$('#serbtn').click(function(){
	$.ajax({
		type:'get',
		url:' http://datainfo.duapp.com/shopdata/selectGoodes.php',
		data:{selectText:encodeURI($("#search").val())},
		dataType:'JSONP',
		success:function(data){
			console.log(data);
			if(data){
				$('#lists').html(null);
				for(var i=0;i<data.length;i++){
					$('#lists').html($('#lists').html()+'<li class="goodList" goodId='
					+data[i].goodsID+'><img src="'+data[i][3]
					+'" alt="" class="goodImg"><p style="display:block;">'
					+data[i][2].slice(0,5)+'...'+'</p></li>');						
				}
				$('#lists>li').on('click',function(){
					window.location.href = 'detail.html#'+this.getAttribute('goodId');					
				})
			}	
			else{
				$('#lists').html('无相关商品');
			}
		},
		error:function(){
			alert('搜索请求');
		}
	})
})
//轮播图
var curIndex=0;
var arr=new Array();
arr[0]="1.png";
arr[1]="2.png";
arr[2]="3.png";
setInterval(changeImg,1200);
function changeImg(){
	var obj=document.getElementById("showpic");
	if(curIndex==arr.length-1){
		curIndex=0;
	}
	else{
		curIndex+=1;
	}
	obj.src="images/"+arr[curIndex];
}

//热销商品请求
$.ajax({
		type:'get',
		url:'http://datainfo.duapp.com/shopdata/getGoods.php',
		dataType:'jsonp',
		success:function(data){
			console.log(data);
			for(var i=0;i<data.length;i++){
				$('#lists').html($('#lists').html()+'<li class="goodList" goodId='
				+data[i].goodsID+'><img src="'+data[i][3]
				+'" alt="" class="goodImg"><p style="display:block;">'
				+data[i][2].slice(0,5)+'...'+'</p></li>');						
			}
			$('#lists>li').on('click',function(){
				window.location.href = 'detail.html#'+this.getAttribute('goodId');					
			})
		 },
		error:function(){
			alert('热销商品请求');
		}
})	

//购物车全选
var a = document.getElementsByName("group");
function checkall(o){
	$(this).attr('checked',true);
	for (var i=0;i<a.length;i++){
		a[i].checked = o.checked;
	}
}
function ch(o){
	$('#all').removeAttr('checked');
	$(this).attr('checked',true);
	var b=0;
	for(var i=0;i<a.length;i++){
		if(a[i].checked) b++;
	}
	if(b==a.length){
		document.getElementById('all').checked=o.checked;
	}
}

//查看购物车
var userId=localStorage.getItem('login');
if(!userId){
	$('.deng').click(function(){
		window.location.href='login.html';
	})
}
$.ajax({
	url:'http://datainfo.duapp.com/shopdata/getCar.php',
	data:{userID:userId},
	dataType:'JSONP',
	success:function(data){
		console.log(data);
		for(var i=0;i<data.length;i++){
			$('#checkul').html($('#checkul').html()+'<li id="'+data[i].goodsID+
			'"><input type="checkbox" name="group" onclick="ch(this)"/><div class="checkimg" style="margin-left:2em"><img src="'
			+data[i][3]+'" class="good"></div><div class="checkname"><p>'+data[i][2]+'</p></div><div class="checkprice"><span>￥'
		    +data[i][4]+'</span><span style="float:right"><a href="" data-role="button" data-icon="de"  data-iconpos="notext" class="delete" goodsId='
		    +data[i].goodsID+'></a></span><span id="num">X'
		    +data[i].number+'</span> </div> </li>');
		}
		//删除购物车中对应商品		
		$('.delete').on('click',function(){
			var goodsId =this.getAttribute('goodsId');
			$.ajax({
				type:'get',
				url:'http://datainfo.duapp.com/shopdata/updatecar.php',
				data:{userID:userId,goodsID:goodsId,number:0},
				success:function(data){
					console.log(data);
					$('#'+goodsId).remove();
		 		},
				error:function(){
					alert('删除购物车中对应商品');
				}
			})
		})
		//购物车价钱
		var group = document.getElementsByName("group");
		$('#checkul input[type="checkbox"]').change(function(){
			var count=0;
			var priceall=document.getElementById('priceall');
			priceall.innerHTML = 0;
			for (var i=0;i<data.length;i++){
				if(group[i].checked){
					var price=data[i].price*data[i].number;
					count += price;					
					priceall.innerHTML=count;
				}
			}
		})
	},
	error:function(){
		alert('error');
	}
})
//用户信息获取
$.ajax({
		type:'get',
		url:'http://datainfo.duapp.com/shopdata/getuser.php',
		data:{userID:userId},
		dataType:'jsonp',
		success:function(data){
			console.log(data);
			$('#uname').html(data[0][0]);
		},
})	
//退出登录
$('#back').click(function(){
	localStorage.removeItem('login');
})