// Debounce do Lodash
debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Scroll suave
$('#conteudoMenu a').click(function(e){
   e.preventDefault();
    var id = $(this).attr('href');
        targetOffset = $(id).offset().top;
   $('html, body').animate({
       scrollTop: targetOffset - 80
   }, 500);
});

$('#banner a').click(function(e){
   e.preventDefault();
    var id = $(this).attr('href');
        targetOffset = $(id).offset().top;
   $('html, body').animate({
       scrollTop: targetOffset - 100
   }, 500);
});

//Fechar menu responsivo depois de clicar
$(function(){ 
     var navMain = $("#conteudoMenu");
     navMain.on("click", "a", null, function () {
         navMain.collapse('hide');
     });
});

// Animar conforme scroll
(function() {
var $target = $('.anime'),
    animationClass = 'anime-start',
    offset = $(window).height() * 15/16;

function animeScroll() {
    var documentTop = $(document).scrollTop();
    
    $target.each(function(){
        var itemTop = $(this).offset().top;
        if(documentTop > itemTop - offset){
            $(this).addClass(animationClass);
        } else{
            $(this).removeClass(animationClass)
        }
    });
}
    
$("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
});

animeScroll();

$(document).scroll(debounce(function(){
    animeScroll();
}, 100));
}());