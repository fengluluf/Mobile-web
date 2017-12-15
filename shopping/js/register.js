$('#btn').click(function(){
	var text1=document.getElementById("text1").value;
	var text2=document.getElementById("text2").value;
	var text3=document.getElementById("text3").value;
	var p=document.getElementById("xinxi");
	var pass=document.getElementById('pass');
	if(text2 == text3){
		$.ajax({
			type:'get',
			url:'  http://datainfo.duapp.com/shopdata/userinfo.php',
			data:{
				status:"register",
				userID:text1,
				password:text2
			},
			success:function(data){					
				if(data==0){
					p.innerHTML="用户名重名";
				}
				if(data==1){
					window.location.href='login.html'
				}
			},
			error:function(){
				alert('error');
			}
		})
	}else{
		pass.innerHTML="密码不一致";
		}
	})