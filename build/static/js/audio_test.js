document.addEventListener("DOMContentLoaded", function(){
    container = document.querySelectorAll('.player');
    play = document.querySelectorAll('.play-pause-button');
    seekBar = document.querySelectorAll('.seek-bar');

    cur_time = document.querySelectorAll('.current-time');
    duration = document.querySelectorAll('.track-length');

    trackTime = document.querySelectorAll('.track-time');
    tProgress = document.querySelectorAll('.current-time')
    tTime = document.querySelectorAll('.track-length');
    
    audio_list = [];

    var curMinutes, curSeconds, durMinutes, durSeconds, playProgress, nTime = 0; tFlag = false;

    // Заполнение массива музыкой

    for(let i = 0; i < container.length; i++){
        audio_list.push(container[i].dataset.src);

        $(cur_time).text("00:00");
        $(duration).text("00:00");
    }

    // Прогресс проигрывания 

    function updateCurrTime(audio, trackTime, tProgress, tTime, seekBar)
        {
            nTime = new Date();
            nTime = nTime.getTime();

            if( !tFlag )
            {
                tFlag = true;
                $(trackTime).addClass('active');
            }

            curMinutes = Math.floor(audio.currentTime / 60);
            curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
            
            durMinutes = Math.floor(audio.duration / 60);
            durSeconds = Math.floor(audio.duration - durMinutes * 60);
            
            playProgress = (audio.currentTime / audio.duration) * 100;
            
            if(curMinutes < 10)
                curMinutes = '0'+curMinutes;
            if(curSeconds < 10)
                curSeconds = '0'+curSeconds;
            
            if(durMinutes < 10)
                durMinutes = '0'+durMinutes;
            if(durSeconds < 10)
                durSeconds = '0'+durSeconds;
            
            if( isNaN(curMinutes) || isNaN(curSeconds) )
                $(tProgress).text('00:00');
            else
                $(tProgress).text(curMinutes+':'+curSeconds);
            
            if( isNaN(durMinutes) || isNaN(durSeconds) )
                $(tTime).text('00:00');
            else
                $(tTime).text(durMinutes+':'+durSeconds);
            
            if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
                $(trackTime).removeClass('active');
            else
                $(trackTime).addClass('active');
            
            $(seekBar).width(playProgress+'%');
            
            if( playProgress == 100 )
            {
                $(seekBar).width(0);
                $(tProgress).text('00:00');
                clearInterval(buffInterval);
            }
        }

    // Инициализация плеера

    for(let i = 0; i < play.length; i++){
        let audio = new Audio(audio_list.pop());

        play[i].addEventListener("click", function(){
            setTimeout(function()
            {
                if(audio.paused)
                {
                    $(play[i]).removeClass("fa-play");
                    $(play[i]).addClass("fa-pause");
                    audio.play();
                }
                else
                {
                    $(play[i]).removeClass("fa-pause");
                    $(play[i]).addClass("fa-play");
                    audio.pause();
                }
            },300);

            $(audio).on('timeupdate',updateCurrTime(audio, trackTime[i], tProgress[i], tTime[i], seekBar[i]));
        })

    }

});