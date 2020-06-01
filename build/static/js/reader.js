$(document).ready(function(){

    // select none
    function preventSelection(element){
        var preventSelection = false;

        function addHandler(element, event, handler){
            if (element.attachEvent) 
            element.attachEvent('on' + event, handler);
            else 
            if (element.addEventListener) 
                element.addEventListener(event, handler, false);
        }
        function removeSelection(){
            if (window.getSelection) { window.getSelection().removeAllRanges(); }
            else if (document.selection && document.selection.clear)
            document.selection.clear();
        }
        function killCtrlA(event){
            var event = event || window.event;
            var sender = event.target || event.srcElement;

            if (sender.tagName.match(/INPUT|TEXTAREA/i))
            return;

            var key = event.keyCode || event.which;
            if (event.ctrlKey && key == 'A'.charCodeAt(0))  // 'A'.charCodeAt(0) можно заменить на 65
            {
            removeSelection();

            if (event.preventDefault) 
                event.preventDefault();
            else
                event.returnValue = false;
            }
    }

    addHandler(element, 'mousemove', function(){
        if(preventSelection)
        removeSelection();
    });
    addHandler(element, 'mousedown', function(event){
        var event = event || window.event;
        var sender = event.target || event.srcElement;
        preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
    });

    addHandler(element, 'mouseup', function(){
        if (preventSelection)
        removeSelection();
        preventSelection = false;
    });

        addHandler(element, 'keydown', killCtrlA);
        addHandler(element, 'keyup', killCtrlA);
    }

    // block text select
    var text = $("#reader").children();

    preventSelection(text);

    $(function() {
        $(this).bind("contextmenu", function(e) {
            e.preventDefault();
        });
    }); 

    //get pages for book
    reader = document.getElementById('reader');

    reader.open = (function(){
    form = new FormData;
    form.append('_token', document.getElementById('xsrf-token').getAttribute('content'));
    action = reader.getAttribute('data-iteration-url');

    return function(direction){
        if(direction != 'prev' && direction != 'next'){
            reader = this;
            form.delete('open');
            form.set('position', direction);
    
            request = new XMLHttpRequest();
            request.addEventListener('load', function(event){
            if(this.status == 200)    reader.innerHTML = this.responseText;
            else if(this.status == 204)  alert('No content anymore');
            else            alert('Something went wrong');
            });
            request.open('post', action);
            request.send(form);
        }else{
            reader = this;
            form.delete('position');
            form.set('open', direction);
    
            request = new XMLHttpRequest();
            request.addEventListener('load', function(event){
            if(this.status == 200)    reader.innerHTML = this.responseText;
            else if(this.status == 204)  alert('No content anymore');
            else            alert('Something went wrong');
            });
            request.open('post', action);
            request.send(form);
        }
    }
    })();
    
     // pagination

    pagination = $(".pagination_top");
    pagination_bottom = $(".pagination_bot");

    pagination.slick({
        slidesToShow: Math.round( $(".pagination_top li").length / 2 ) >= 15 ? 15 : Math.round( $(".pagination_bot li").length / 2 ),
        infinite: true,
        swipeToSlide: true,
        swipe: true,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow:  Math.round( $(".pagination_top li").length / 2 ) >= 5 ? 5 : Math.round( $(".pagination_top li").length / 2 ),
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow:  Math.round( $(".pagination_top li").length / 2 ) >= 4 ? 4 : Math.round( $(".pagination_top li").length / 2 ),
            }
        },
        ],
    });

    pagination_bottom.slick({
        slidesToShow: Math.round( $(".pagination_bot li").length / 2 ) >= 15 ? 15 : Math.round( $(".pagination_bot li").length / 2 ),
        infinite: true,
        swipeToSlide: true,
        swipe: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow:  Math.round( $(".pagination_bot li").length / 2 ) >= 5 ? 5 : Math.round( $(".pagination_bot li").length / 2 ),
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow:  Math.round( $(".pagination_bot li").length / 2 ) >= 4 ? 4 : Math.round( $(".pagination_bot li").length / 2 ),
                }
            },
            ],
    });

     // prev & next btns
     var prev = $(".slick-prev");
     prev.text("<");

     var page = $("[data-pos]");
 
     var next = $(".slick-next");
     next.text(">");
 
     prev.on("click", function(e){
         e.preventDefault();
         var curPos = parseInt($(".slick-current").attr("data-pos"));
         reader.open(curPos);
        pagination.slick('slickGoTo', curPos - 2);
        pagination_bottom.slick('slickGoTo', curPos - 1);
     });
 
     next.on("click", function(e){
         e.preventDefault();
         var curPos = parseInt($(".slick-current").attr("data-pos"));
         reader.open(curPos);
        pagination.slick('slickGoTo', curPos);
        pagination_bottom.slick('slickGoTo', curPos - 1);
        $(window).animate().scrollTop({
            top: 0,
            behavior: "smooth"
        });
     });

    page.on("click", function(e){
        e.preventDefault();
        reader.open($(this).attr("data-pos"));
        var slideno = $(this).data('pos');
        pagination.slick('slickGoTo', slideno);
        pagination_bottom.slick('slickGoTo', slideno);
    });

});