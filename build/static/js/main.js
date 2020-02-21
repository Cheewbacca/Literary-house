$(".burger").on("click", function(){
    $(".nav-hidden").show()
	$(".burger").hide();
	$(".cross").show();
	$("nav h2").show();
	$("nav ul").show();
});

$(".cross").on("click", function(){
    $("nav h2").hide();
	$("nav ul").hide();
	$(".nav-hidden").hide();
	$(".cross").hide();
	$(".burger").show();
});