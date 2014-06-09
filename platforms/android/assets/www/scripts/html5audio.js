

var progressTimer;

var playButton;
var stopButton;
var activityIndicator;
var textPosition;

function onError(error)
{
    console.log(error.message);
}

function onConfirmRetry(button) {
    if (button == 1) {
        html5audio.play();
    }
}

function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

//var myaudioURL = 'http://stream.4zzzfm.org.au:789/;';
var myaudioURL = 'http://disneyargradio-lh.akamaihd.net/i/ARG_Disney_RADIO@102438/master.m3u8';
var myaudio = new Audio(myaudioURL);

var isPlaying = false;
var readyStateInterval = null;

var changeAudioURL = {
    argentina: function() {
        html5audio.stop();
        myaudioURL = 'http://disneyargradio-lh.akamaihd.net/i/ARG_Disney_RADIO@102438/master.m3u8';
        myaudio = new Audio(myaudioURL);
        

    },
    brasil: function() {
        html5audio.stop();
        myaudioURL = 'http://disneyradiohds-lh.akamaihd.net/i/LTM_Radio_Disney_HDS_1@92327/master.m3u8';
        myaudio = new Audio(myaudioURL);
        if (window.alert('Conectando a Brasil')) {
            onConfirmRetry();
        }

    },
    ecuador: function() {
        html5audio.stop();
        myaudioURL = 'http://playerservices.streamtheworld.com/pls/XHPOPFMAAC.pls/;';
        myaudio = new Audio(myaudioURL);

    },
    uruguay: function() {
        html5audio.stop();
        myaudioURL = 'http://199.217.118.9:7928/listen.pls/;';
        myaudio = new Audio(myaudioURL);

    }

}
var html5audio = {
    play: function()
    {
        isPlaying = true;
        myaudio.play();

        readyStateInterval = setInterval(function() {
            if (myaudio.readyState <= 2) {
                playButton.style.display = 'none';
                activityIndicator.style.display = 'block';
                textPosition.innerHTML = 'loading...';
            }
        }, 1000);
        myaudio.addEventListener("timeupdate", function() {
            var s = parseInt(myaudio.currentTime % 60);
            var m = parseInt((myaudio.currentTime / 60) % 60);
            var h = parseInt(((myaudio.currentTime / 60) / 60) % 60);
            if (isPlaying && myaudio.currentTime > 0) {
                textPosition.innerHTML = pad2(h) + ':' + pad2(m) + ':' + pad2(s);
            }
        }, false);
        myaudio.addEventListener("error", function() {
            console.log('myaudio ERROR');
        }, false);
        myaudio.addEventListener("canplay", function() {
            console.log('myaudio CAN PLAY');
        }, false);
        myaudio.addEventListener("waiting", function() {
            //console.log('myaudio WAITING');
            isPlaying = false;
            playButton.style.display = 'none';
            stopButton.style.display = 'none';
            activityIndicator.style.display = 'block';
        }, false);
        myaudio.addEventListener("playing", function() {
            isPlaying = true;
            playButton.style.display = 'none';
            activityIndicator.style.display = 'none';
            stopButton.style.display = 'block';
        }, false);
        myaudio.addEventListener("ended", function() {
            //console.log('myaudio ENDED');
            html5audio.stop();
            // navigator.notification.alert('Streaming failed. Possibly due to a network error.', null, 'Stream error', 'OK');
            // navigator.notification.confirm(
            //	'Streaming failed. Possibly due to a network error.', // message
            //	onConfirmRetry,	// callback to invoke with index of button pressed
            //	'Stream error',	// title
            //	'Retry,OK'		// buttonLabels
            // );
            if (window.confirm('Streaming failed. Possibly due to a network error. Retry?')) {
                onConfirmRetry();
            }
        }, false);
    },
    pause: function() {
        isPlaying = false;
        clearInterval(readyStateInterval);
        myaudio.pause();
        stopButton.style.display = 'none';
        activityIndicator.style.display = 'none';
        playButton.style.display = 'block';
    },
    stop: function() {
        isPlaying = false;
        clearInterval(readyStateInterval);
        myaudio.pause();
        stopButton.style.display = 'none';
        activityIndicator.style.display = 'none';
        playButton.style.display = 'block';
        myaudio = null;
        myaudio = new Audio(myaudioURL);
        textPosition.innerHTML = '';
    }
};
