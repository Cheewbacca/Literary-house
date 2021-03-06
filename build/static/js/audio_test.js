// document.addEventListener("DOMContentLoaded", function(){

//     function getBrowserName(){
//         var ua = navigator.userAgent;    
//         if (ua.search(/Chrome/) > 0) return 'Chrome';
//         if (ua.search(/Firefox/) > 0) return 'Firefox';
//         if (ua.search(/Opera/) > 0) return 'Opera';
//         if (ua.search(/Safari/) > 0) return 'Safari';
//         if (ua.search(/MSIE/) > 0) return 'IE';

//         return 'Не определен';
//     }
     
//     var browser = getBrowserName();

//     container = document.querySelectorAll('.player');
//     play = document.querySelectorAll('.play-pause-button');
//     seekBar = document.querySelectorAll('.seek-bar');

//     cur_time = document.querySelectorAll('.current-time');
//     duration = document.querySelectorAll('.track-length');

//     sArea = document.querySelectorAll('.s-area');

//     trackTime = document.querySelectorAll('.track-time');
//     tProgress = document.querySelectorAll('.current-time')
//     tTime = document.querySelectorAll('.track-length');

//     var seekBar = $('.seek-bar'), trackTime = $('.track-time'), tProgress = $('.current-time'), tTime = $('.track-length')

//     audio_list = [];

//     var seekLoc, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, nTime = 0; tFlag = false;

//     // Заполнение массива музыкой

//     let format = null

//     if(browser == "Chrome" || browser == "Safari" || browser == "IE"){
//         format = "?format=mp3"
//     }else{
//         format = "?format=ogg"
//     }

//     for(let i = 0; i < container.length; i++){
//         audio_list.push(container[i].dataset.src + format);
//         container[i].removeAttribute('data-src');
        
//         $(cur_time).text("00:00");
//         $(duration).text("00:00");
//     }

//     // Инициализация плеера

//     for(let i = 0; i < play.length; i++){
//         let audio = new Audio(audio_list.pop());

//         play[i].addEventListener("click", function(){
//             setTimeout(function()
//             {
//                 if(audio.paused)
//                 {
//                     $(play[i]).removeClass("fa-play");
//                     $(play[i]).addClass("fa-pause");
//                     audio.play();
//                 }
//                 else
//                 {
//                     $(play[i]).removeClass("fa-pause");
//                     $(play[i]).addClass("fa-play");
//                     audio.pause();
//                 }
//             },300);

//         })

//         // Прогресс проигрывания 

//         audio.addEventListener("timeupdate", updateCurrTime);

//         function updateCurrTime(){
//             nTime = new Date();
//             nTime = nTime.getTime();

//             if( !tFlag )
//             {
//                 tFlag = true;
//                 $(trackTime[i]).addClass('active');
//             }

//             curMinutes = Math.floor(audio.currentTime / 60);
//             curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
            
//             durMinutes = Math.floor(audio.duration / 60);
//             durSeconds = Math.floor(audio.duration - durMinutes * 60);
            
//             playProgress = (audio.currentTime / audio.duration) * 100;
            
//             if(curMinutes < 10)
//                 curMinutes = '0'+curMinutes;
//             if(curSeconds < 10)
//                 curSeconds = '0'+curSeconds;
            
//             if(durMinutes < 10)
//                 durMinutes = '0'+durMinutes;
//             if(durSeconds < 10)
//                 durSeconds = '0'+durSeconds;
            
//             if( isNaN(curMinutes) || isNaN(curSeconds) )
//                 $(tProgress[i]).text('00:00');
//             else
//                 $(tProgress[i]).text(curMinutes+':'+curSeconds);
            
//             if( isNaN(durMinutes) || isNaN(durSeconds) )
//                 $(tTime[i]).text('00:00');
//             else
//                 $(tTime[i]).text(durMinutes+':'+durSeconds);
            
//             if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
//                 $(trackTime[i]).removeClass('active');
//             else
//                 $(trackTime[i]).addClass('active');
            
//             $(seekBar[i]).width(playProgress+'%');
            
//             if( playProgress == 100 )
//             {
//                 $(seekBar[i]).width(0);
//                 $(tProgress[i]).text('00:00');
//                 clearInterval(buffInterval);
//             }
//         }

//         sArea[i].addEventListener("click", playFromClickedPos);

//         function playFromClickedPos(){
//             seekBarPos = $(sArea[i]).offset(); 
//             seekT = event.clientX - seekBarPos.left;
//             seekLoc = audio.duration * (seekT / $(sArea[i]).outerWidth());
//             audio.currentTime = seekLoc;
//             $(seekBar[i]).width(seekT);
//         }
//     }
// });


"use strict";

document.addEventListener("DOMContentLoaded", function () {
  function getBrowserName() {
    var ua = navigator.userAgent;
    if (ua.search(/Chrome/) > 0) return 'Chrome';
    if (ua.search(/Firefox/) > 0) return 'Firefox';
    if (ua.search(/Opera/) > 0) return 'Opera';
    if (ua.search(/Safari/) > 0) return 'Safari';
    if (ua.search(/MSIE/) > 0) return 'IE';
    return 'Не определен';
  }

  var browser = getBrowserName();
  var container = document.querySelectorAll('.player');
  var play = document.querySelectorAll('.play-pause-button');
 var  seekBar = document.querySelectorAll('.seek-bar');
 var cur_time = document.querySelectorAll('.current-time');
  var duration = document.querySelectorAll('.track-length');
  var sArea = document.querySelectorAll('.s-area');
  var trackTime = document.querySelectorAll('.track-time');
  var tProgress = document.querySelectorAll('.current-time');
  var tTime = document.querySelectorAll('.track-length');
  var seekBar = $('.seek-bar'),
      trackTime = $('.track-time'),
      tProgress = $('.current-time'),
      tTime = $('.track-length');
 var audio_list = [];
  var seekLoc,
      curMinutes,
      curSeconds,
      durMinutes,
      durSeconds,
      playProgress,
      nTime = 0;
  var tFlag = false; // Заполнение массива музыкой

  var format = null;

  if (browser == "Chrome" || browser == "Safari" || browser == "IE") {
    format = "?format=mp3";
  } else {
    format = "?format=ogg";
  }

  for (var i = 0; i < container.length; i++) {
    audio_list.push(container[i].dataset.src + format);
    container[i].removeAttribute('data-src');
    $(cur_time).text("00:00");
    $(duration).text("00:00");
  } // Инициализация плеера


  var _loop = function _loop(_i) {
    var audio = new Audio(audio_list.pop());

    play[_i].addEventListener("click", function () {
      setTimeout(function () {
        if (audio.paused) {
          $(play[_i]).removeClass("fa-play");
          $(play[_i]).addClass("fa-pause");
          audio.play();
        } else {
          $(play[_i]).removeClass("fa-pause");
          $(play[_i]).addClass("fa-play");
          audio.pause();
        }
      }, 300);
    }); // Прогресс проигрывания 


    audio.addEventListener("timeupdate", updateCurrTime);

    function updateCurrTime() {
      nTime = new Date();
      nTime = nTime.getTime();

      if (!tFlag) {
        tFlag = true;
        $(trackTime[_i]).addClass('active');
      }

      curMinutes = Math.floor(audio.currentTime / 60);
      curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
      durMinutes = Math.floor(audio.duration / 60);
      durSeconds = Math.floor(audio.duration - durMinutes * 60);
      playProgress = audio.currentTime / audio.duration * 100;
      if (curMinutes < 10) curMinutes = '0' + curMinutes;
      if (curSeconds < 10) curSeconds = '0' + curSeconds;
      if (durMinutes < 10) durMinutes = '0' + durMinutes;
      if (durSeconds < 10) durSeconds = '0' + durSeconds;
      if (isNaN(curMinutes) || isNaN(curSeconds)) $(tProgress[_i]).text('00:00');else $(tProgress[_i]).text(curMinutes + ':' + curSeconds);
      if (isNaN(durMinutes) || isNaN(durSeconds)) $(tTime[_i]).text('00:00');else $(tTime[_i]).text(durMinutes + ':' + durSeconds);
      if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds)) $(trackTime[_i]).removeClass('active');else $(trackTime[_i]).addClass('active');
      $(seekBar[_i]).width(playProgress + '%');

      if (playProgress == 100) {
        $(seekBar[_i]).width(0);
        $(tProgress[_i]).text('00:00');
        clearInterval(buffInterval);
      }
    }

    sArea[_i].addEventListener("click", playFromClickedPos);

    function playFromClickedPos() {
      var seekBarPos = $(sArea[_i]).offset();
      var seekT = event.clientX - seekBarPos.left;
      var seekLoc = audio.duration * (seekT / $(sArea[_i]).outerWidth());
      audio.currentTime = seekLoc;
      $(seekBar[_i]).width(seekT);
    }
  };

  for (var _i = 0; _i < play.length; _i++) {
    _loop(_i);
  }
});