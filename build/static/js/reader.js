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
    
    // prev & next btns
    var prev = $('.reader-btn-prev');

    var page = $("[data-pos]");

    var next = $('.reader-btn-next');

    prev.on("click", function(e){
        e.preventDefault();
        reader.open('prev');
        var curPos = parseInt($(".active").attr("data-pos"));
        if(curPos > 0){
            curPos--;
            page.removeClass("active");
            $("[data-pos= " + curPos + "]").addClass("active");
        }
        if($(".active").attr("data-pos") == 0){
            prev.css("opacity", "0");
        }else{
            prev.css("opacity", "1");
        } 
        if ($('.pagination li:last-child').hasClass("active")){
            next.css("opacity", "0");
        }else{
            next.css("opacity", "1");
        }  
    });

    if($(".active").attr("data-pos") == 0){
        prev.hide();
    }

    next.on("click", function(e){
        e.preventDefault();
        reader.open('next');
        var curPos = parseInt($(".active").attr("data-pos"));
        curPos++;
        page.removeClass("active");
        $("[data-pos= " + curPos + "]").addClass("active");
        if($(".active").attr("data-pos") == 0){
            prev.css("opacity", "0");
        }else{
            prev.css("opacity", "1");
        }
        if ($('.pagination li:last-child').hasClass("active")){
            next.css("opacity", "0");
        }else{
            next.css("opacity", "1");
        }
    });

    // pagination

    page.on("click", function(e){
        e.preventDefault();
        page.removeClass("active");
        reader.open($(this).attr("data-pos"));
        $(this).addClass("active");
        $("[data-pos= " + $(this).attr("data-pos") + "]").addClass("active");
        if($(".active").attr("data-pos") == 0){
            prev.css("opacity", "0");
        }else{
            prev.css("opacity", "1");
        }
        if ($('.pagination li:last-child').hasClass("active")){
            next.css("opacity", "0");
        }else{
            next.css("opacity", "1");
        }
    });


    if ($(window).width() < 768) {
        prev.text("<");
        next.text(">");
    } 
});