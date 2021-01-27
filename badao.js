// ==/UserScript==
window.onload = function() {
    $("h2").replaceWith('<center><h2 style="font-family: Ubuntu; font-size: 200%;">Edition by MiShjne</h2></center>');
    $("h1").replaceWith('<h1>EDITION BY CAOTUNG</h1>');
	$( "agario-profile-picture" ).replaceWith("<a href='https://www.facebook.com/shjnereal.url/' target='_BLANK'><img src='https://i.imgur.com/8jsMtve.png' style='width: 100%; height: 100%;'></img></a>");
    $( "#adbg" ).replaceWith("<a href='https://www.facebook.com/shjnereal.url/' target='_BLANK'><img src='https://i.imgur.com/8jsMtve.png' style='width: 100%; height: 100%;'></img></a>");
    $( "#container" ).replaceWith("<a href='https://www.facebook.com/shjnereal.url/' target='_BLANK'><img src='https://i.imgur.com/8jsMtve.png' style='width: 100%; height: 100%;'></img></a>");
    
};
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
var EjectDown = false;

var speed = 25; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 65) { //key A
        split();
        setTimeout(split, speed);
    }
    if (event.keyCode == 83) { //key S
      	var mEv = new MouseEvent('mousemove', { 'clientX': window.innerWidth / 2, 'clientY': window.innerHeight / 2 });
						canvas.dispatchEvent(mEv);
    }
}

function keyup(event) {
    if (event.keyCode == 87) { // key W
        EjectDown = false;
    }
}

function eject() {
    if (EjectDown) {
        window.onkeydown({keyCode: 87}); // key W
        window.onkeyup({keyCode: 87});
        setTimeout(eject, speed);
    }
}

function split() {
    $("body").trigger($.Event("keydown", { keyCode: 32})); //key space
    $("body").trigger($.Event("keyup", { keyCode: 32})); //jquery is required for split to work
}

// @name         ~~
// @version      0.03
// @description  ~~
// @author       c~~
// @license      MIT
// @match        !!
// @grant        none
// @run-at       document-end
// ==/UserScript==
(function() {
    var amount = 12;
    var duration = 1; //ms

    var overwriting = function(evt) {
        if (evt.keyCode === 69) { // KEY_E
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 87}); // KEY_W
                    window.onkeyup({keyCode: 87});
                }, i * duration);
            }
        }
    };

    window.addEventListener('keydown', overwriting);
})();
(function() {
    var amount = 20;
    var duration = 1; //ms

    var overwriting = function(evt) {
        if (evt.keyCode === 84) { // KEY_E
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 87}); // KEY_W
                    window.onkeyup({keyCode: 87});
                }, i * duration);
            }
        }
    };

    window.addEventListener('keydown', overwriting);
})();
(function() {
'use strict';
 
var soundEnabled = true;
 
var New_WhiteBackgroundColor = '#000000';
 
var old_fillRect = CanvasRenderingContext2D.prototype.fillRect;
CanvasRenderingContext2D.prototype.fillRect = function() {
    var x = arguments[0];
    var y = arguments[1];
    var w = arguments[2];
    var h = arguments[3];
 
    if (x==0 && y==0 && w==this.canvas.width && h==this.canvas.height) {
        if (this.fillStyle == '#f2fbff') { // agar.io white background color
            this.fillStyle = New_WhiteBackgroundColor;
        }
    }
 
    return old_fillRect.apply(this, arguments);
};
 
function calculateRemain(text) {
    if (text.endsWith('s')) {
        var match;
 
        match = / in:? (\d+)s$/.exec(text);
        if (match !== null) {
            return parseInt(match[1], 10);
        }
 
        match = /^((\d+)m)? ?(\d+)s$/.exec(text);
        if (match !== null) {
            return (parseInt(match[2], 10) || 0) * 60 + parseInt(match[3], 10); // "x || 0" is "0 if x undefined"
        }
    }
 
    return null;
}
 
var old_fillText = CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText = function() {
    if (arguments[0]=='Leaderboard') {
        arguments[0] = '    𝚆𝚞𝚕𝙲𝚃 ' ;
    }
    else if (window.location.href.indexOf('#') >= 0 || window.location.href.indexOf('#') >= 0) {
        var PREFIX;
        PREFIX = 'Players ';
        if (arguments[0].indexOf(PREFIX) == 0) {
            arguments[0] = new Date().toLocaleTimeString('en', {hour12: false, hour: 'numeric', minute: 'numeric'}) + ' ' + arguments[0].slice(PREFIX.length);
        }
        else if (soundEnabled) {
            var remain = calculateRemain(arguments[0]);
 
            if (remain !== null) {
                var minRemain, maxRemain;
 
                if (remain > 30 && remain % 30 == 0) { // every 30s: 2m (120s), 1m30s (90s), 1m (60s)
                    remain = remain/30 - 2;
                    maxRemain = 2; // 2m
                    minRemain = 0; // 1m
                    remainingBeep('sine', remain, minRemain, maxRemain, 1, 1, 400, 500, 0.2, 1, 'triangle');
                }
                else if (remain <= 30 && remain >= 10 && remain % 10 == 0) { // every 10s: 30s, 20s, 10s
                    remain = remain/10 - 1;
                    maxRemain = 2; // 30s
                    minRemain = 0; // 10s
                    remainingBeep('triangle', remain, minRemain, maxRemain, 1, 1, 500, 600, 0.2, 1, 'sawtooth');
                }
                else if (remain < 10) { // every 1s
                    maxRemain = 9;
                    minRemain = 0;
                    remainingBeep('sawtooth', remain, minRemain, maxRemain, 1, 1, 600, 900, 0.2, 1, 'square');
                }
            }
        }
    }
 
    return old_fillText.apply(this, arguments);
};
 
function remainingBeep(type, remain, minRemain, maxRemain, startVol, endVol, startFreq, endFreq, startDuration, endDuration, endingType) {
    var coef = (maxRemain-remain) / (maxRemain-minRemain); // increases from 0 (0%) to 1 (100%)
    if (coef == 1) {
        type = endingType;
    }
    scaledBeep(coef, startVol, endVol, startFreq, endFreq, startDuration, endDuration, type);
}
 
function scaledBeep(coef, startVol, endVol, startFreq, endFreq, startDuration, endDuration, type) {
    beep(scale(startVol, endVol, coef), scale(startFreq, endFreq, coef), scale(startDuration, endDuration, coef), type);
}
 
function scale(startValue, endValue, coef) {
  return startValue + (endValue-startValue)*coef;
}
 
var audioCtx = null;
 
function beep(vol, freq, duration, type) {
    if (soundEnabled) {
        doBeep(vol, freq, duration, type);
    }
}
 
function doBeep(vol, freq, duration, type) {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
 
    var gainNode = audioCtx.createGain();
    gainNode.connect(audioCtx.destination);
    gainNode.gain.value = vol;
 
    var osc = audioCtx.createOscillator();
    osc.connect(gainNode);
    osc.type = type;
    osc.frequency.value = freq; // hz
 
    osc.start();
 
    gainNode.gain.exponentialRampToValueAtTime(0.00001/*can't be 0*/, audioCtx.currentTime + duration);
    osc.stop(audioCtx.currentTime + duration);
}
 

 
})();
