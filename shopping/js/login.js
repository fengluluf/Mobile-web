$('#btn').click(function(){
	$.ajax({
		type:'get',
		url:'http://datainfo.duapp.com/shopdata/userinfo.php',
		data:{status:"login",userID:document.getElementById("user").value,password:document.getElementById("password").value},
		dataType:'json',
		success:function(data){
			var p=document.getElementById("xinxi");
			if(data==0){
				p.innerHTML="用户名不存在";
			}
			else if(data==2){
				p.innerHTML="用户名或密码错误";
			}
			else{
				localStorage.setItem("login",document.getElementById("user").value);
				if(localStorage.getItem('install'))window.location.href='index.html';
				else{
					window.location.href='start.html'
				}
			}

		 },
		error:function(){
			alert('error');
		}

	})
})