// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});



var result1Cmpr = [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
var result2Cmpr = [0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0];
var result3Cmpr = [1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0];
var result4Cmpr = [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];
var result5Cmpr = [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0];
var result6Cmpr = [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
var result7Cmpr = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
var result8Cmpr = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
var result9Cmpr = [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0];


var result1 = [0, 1, 1, 0, 0, 0, 0, 0, 0, -1, 0];
var result2 = [0, 1, 1, 0, 0, 0, 0, 0, 1, 0, -1];
var result3 = [1, 0, 1, 0, 0, 0, -1, 1, 1, 0, 0];
var result4 = [1, 0, 1, -1, 0, 0, 0, 0, 1, 0, 0];
var result5 = [0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0];
var result6 = [1, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0];
var result7 = [0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 1];
var result8 = [1, -1, 0, 0, 0, 1, 0, 0, 0, 0, 0];
var result9 = [1, 1, 0, 0, -1, 0, 1, 0, 0, 0, 0];




var timer;
var timeoutInterval = 60000; // 1000 = 1sec
var forceCloseQ = 5;
var forceTimer;
var forceTimeoutInterval = 15000; // 1000 = 1sec

var assmb = {};

/**
 * 자동 리셋
 */
assmb.autoReset = function() {
    timer = setTimeout(function(){
        setTimeout(function() {
            location.reload();
        }, 1000);
    },timeoutInterval);
};

/**
 * 강제 종료 버튼
 */
assmb.forceClose = function() {
    forceCloseQ = forceCloseQ - 1;
    // console.log(forceCloseQ);
    if(!forceCloseQ) {
        if(confirm("해당 미디어를 종료하시겠습니까?")) {

            // 강제 종료하는 스크립트
            window.open('', '_self', '');
            window.close();

            // $("input").focus();
        } else {
            forceCloseQ = 5;
        }
    }
};

/**
 * 15초동안 아무일이 없으면 강제 종료 타이머 초기화
 */
assmb.forceTimeout = function() {
    forceTimer = setTimeout(function(){
        forceCloseQ = 5;
    },forceTimeoutInterval);
};


$(document).bind('contextmenu', function(e) {
    e.preventDefault();
    return false;
});
$(document).bind("dragstart", function(e) {
    e.preventDefault();
    return false;
});
$(document).bind("click", function(e) {
    e.preventDefault();
    clearTimeout(timer);
    assmb.autoReset();

    assmb.forceTimeout();
});

$('html').bind("mousewheel DOMMouseScroll", function(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
    return false;
});

