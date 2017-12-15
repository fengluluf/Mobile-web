console.log(localStorage.getItem('login'));
//if(localStorage.getItem('login')){$('.swiper-container').hide()}
$('#btn').click(function(){
	localStorage.setItem('install',true)
})
var swiper = new Swiper('.swiper-container', {
	autoplay : 1500,
	autoplayStopOnLast:true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    pagination: '.swiper-pagination',
});