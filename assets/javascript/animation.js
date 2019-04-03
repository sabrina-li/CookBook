var initposition = 0;
var scrollTop = 0;
var windowHeight = 0;
var windowWidth = 0;


$(document).ready(function(){
    scrollTop = $(window).scrollTop();
    initposition=$('#exp1')[0].getBoundingClientRect().top+scrollTop;
    windowHeight = $(".parallax").height();
    windowWidth = $(window).width();
    console.log("init",initposition);
    setCSS()
})


function isInViewport(node) {
        var rect = node.getBoundingClientRect()
        console.log(rect.top);
        return (
          (rect.height > 0 || rect.width > 0) &&
          rect.bottom >= 0 &&
          rect.right >= 0 &&
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        )
}
    
function easeInOutQuad(t, b, c, d) {
    //sinusoadial in and out
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};

function setCSS(){
    let ratio = scrollTop/initposition;
    $('.headline').css('opacity',Math.pow((1-ratio),0.7));
    $('.subHeadline').css('opacity',Math.pow((1-ratio),0.5));

    $('.subHeadline').css('transform',' translate3d('+ratio*0+'px, -'+ratio*100+'px, 0px)');
    $('#exp1').css('transform',' translate3d('+ratio*0+'px, -'+ratio*200+'px, 0px)');
    $('#exp2').css('transform',' translate3d('+ratio*25+'px, -'+ratio*200+'px, 0px)');
    $('#exp3').css('transform',' translate3d('+ratio*50+'px, -'+ratio*200+'px, 0px)');
    $('#exp4').css('transform',' translate3d('+ratio*75+'px, -'+ratio*200+'px, 0px)');
    $('#exp5').css('transform',' translate3d('+ratio*100+'px, -'+ratio*200+'px, 0px)');
    $('#exp6').css('transform',' translate3d('+ratio*125+'px, -'+ratio*200+'px, 0px)');
    $('#exp7').css('transform',' translate3d('+ratio*150+'px, -'+ratio*200+'px, 0px)');
    $('#exp8').css('transform',' translate3d('+ratio*175+'px, -'+ratio*200+'px, 0px)');
}
    
      $(window).scroll(function() {
        scrollTop = $(window).scrollTop();
        setCSS();
    })







// $(document).ready(function(){


//       /*  Globals
//       -------------------------------------------------- */
//       var PROPERTIES =               ['translateX', 'translateY', 'opacity', 'rotate', 'scale'],
//           $window =                  $(window),
//           $body =                    $('body'),
//           wrappers =                 [],
//           currentWrapper =           null,
//           scrollTimeoutID =          0,
//           bodyHeight =               0,
//           prevKeyframesDurations =   0,
//           relativeScrollTop =        0,
//           currentKeyframe =          0,
//           keyframes = [
//             {
//               'wrapper' : '#explosion',
//               'duration' : '150%',
//               'animations' :  [
//                 {
//                   'selector'    : '.dei-1',
//                   'translateY'  : '-25%',
//                   'translateX'  : '-20%',
//                   'opacity'     : [1, 0],
//                   'scale'       : 2,
//                 } , {
//                   'selector'    : '.dei-2',
//                   'translateY'  : '-5%',
//                   'translateX'  : '-4%',
//                   'opacity'     : [1, 0] // hack to decelrate opacity speed
//                 } , {
//                   'selector'    : '.dei-3',
//                   'translateY'  : '-9%',
//                   'translateX'  : '2%',
//                   'opacity'     : [1, 0], // hack to accelrate opacity speed
//                   'scale'       : 1.2,
//                 } , {
//                   'selector'    : '.dei-4',
//                   'translateY'  : '-17%',
//                   'translateX'  : '8%',
//                   'opacity'     : [1, 0], // hack to accelrate opacity speed
//                   'scale'       : 1.5,
//                 } , {
//                   'selector'    : '.dei-5',
//                   'translateY'  : '-2%',
//                   'translateX'  : '-15%',
//                   'opacity'     : [1, 0],
//                   'scale'       : 2,
//                 } , {
//                   'selector'    : '.dei-6',
//                   'translateY'  : '-1%',
//                   'translateX'  : '-7%',
//                   'opacity'     : [1, 0], // hack to decelrate opacity speed
//                   'scale'       : 1.2,
//                 } , {
//                   'selector'    : '.dei-7',
//                   'translateY'  : '-4%',
//                   'translateX'  : '2%',
//                   'opacity'     : [1, 0], // hack to accelrate opacity speed
//                   'scale'       : 1.1,
//                 } , {
//                   'selector'    : '.dei-8',
//                   'translateY'  : '-3%',
//                   'translateX'  : '12%',
//                   'opacity'     : [1, 0], // hack to accelrate opacity speed
//                   'scale'       : 1.8,
//                 } , {
//                   'selector'    : '.dei-9',
//                   'translateY'  : '3%',
//                   'translateX'  : '-12%',
//                   'opacity'     : [1, 0],
//                   'scale'       : 1.5,
//                 } , {
//                   'selector'    : '.dei-10',
//                   'translateY'  : '5%',
//                   'translateX'  : '-4%',
//                   'opacity'     : [1, 0] // hack to decelrate opacity speed
//                 } , {
//                   'selector'    : '.dei-11',
//                   'translateY'  : '8%',
//                   'translateX'  : '6%',
//                   'opacity'     : [1, 0], // hack to accelrate opacity speed
//                   'scale'       : 1.4,
//                 } , {
//                   'selector'    : '.dei-12',
//                   'translateY'  : '1%',
//                   'translateX'  : '20%',
//                   'opacity'     : [1, 0], // hack to accelrate opacity speed
//                   'scale'       : 1.9,
//                 } , {
//                   'selector'    : '.dei-13',
//                   'translateY'  : '8%',
//                   'translateX'  : '-12%',
//                   'opacity'     : [1, 0],
//                   'scale'       : 1.8,
//                 } , {
//                   'selector'    : '.dei-14',
//                   'translateY'  : '4%',
//                   'translateX'  : '-3%',
//                   'opacity'     : [1, 0], // hack to decelrate opacity speed
//                   'scale'       : 1.3,
//                 } , {
//                   'selector'    : '.dei-15',
//                   'translateY'  : '14%',
//                   'translateX'  : '5%',
//                   'opacity'     : [1, 0], // hack to accelrate opacity speed
//                   'scale'       : 1.7,
//                 } , {
//                   'selector'    : '.dei-16',
//                   'translateY'  : '6%',
//                   'translateX'  : '9%',
//                   'opacity'     : [1, 0], // hack to accelrate opacity speed
//                   'scale'       : 2,
//                 }
//               ]
//             } 
//           ]
  

//     $(function() {
//         var scrollTop = $window.scrollTop();
//         var windowHeight = $("#explosion").height();
//         var windowWidth = $window.width();


//         var i, j, k;
//         for(i=0;i<keyframes.length;i++) { // loop keyframes
//           keyframes[i].duration = convertPercentToPx(keyframes[i].duration, 'y');
//           for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
//             Object.keys(keyframes[i].animations[j]).forEach(function(key) { // loop properties
//               value = keyframes[i].animations[j][key];
//               if(key !== 'selector') {
//                 if(value instanceof Array) { // if its an array
//                   for(k=0;k<value.length;k++) { // if value in array is %
//                     if(typeof value[k] === "string") {
//                       if(key === 'translateY') {
//                         value[k] = convertPercentToPx(value[k], 'y');
//                       } else {
//                         value[k] = convertPercentToPx(value[k], 'x');
//                       }
//                     }
//                   } 
//                 } else {
//                   if(typeof value === "string") { // if single value is a %
//                     if(key === 'translateY') {
//                       value = convertPercentToPx(value, 'y');
//                     } else {
//                       value = convertPercentToPx(value, 'x');
//                     }
//                   }
//                 }
//                 keyframes[i].animations[j][key] = value;
//               }
//             });
//           }
//         }


//       /*  Construction
//       -------------------------------------------------- */
//       init = function() {
//         setupValues();
//         scrollIntervalID = setInterval(updatePage, 10);
        
//         // $window.resize(throwError)
//         // if(isTouchDevice) {
//         //   $window.resize(throwError)
//         // }
//       }
  
//       setupValues = function() {
        
        
//         convertAllPropsToPx();
//         buildPage();
//       }
  
//       buildPage = function() {
//         var i, j, k;
//         for(i=0;i<keyframes.length;i++) { // loop keyframes
//             bodyHeight += keyframes[i].duration;
//             if($.inArray(keyframes[i].wrapper, wrappers) == -1) {
//               wrappers.push(keyframes[i].wrapper);
//             }
//             for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
//               Object.keys(keyframes[i].animations[j]).forEach(function(key) { // loop properties
//                 value = keyframes[i].animations[j][key];
//                 if(key !== 'selector' && value instanceof Array === false) {
//                   var valueSet = [];
//                   valueSet.push(getDefaultPropertyValue(key), value);
//                   value = valueSet;
//                 }
//                 keyframes[i].animations[j][key] = value;
//               });
//             }
//         }
//         $body.height(bodyHeight);
//         $window.scroll(0);
//         currentWrapper = wrappers[0];
//         $(currentWrapper).show();
//       }
  

  
//       getDefaultPropertyValue = function(property) {
//         switch (property) {
//           case 'translateX':
//             return 0;
//           case 'translateY':
//             return 0;
//           case 'scale':
//             return 1;
//           case 'rotate':
//             return 0;
//           case 'opacity':
//             return 1;
//           default:
//             return null;
//         }
//       }
  
//       /*  Animation/Scrolling
//       -------------------------------------------------- */
//       updatePage = function() {
//         window.requestAnimationFrame(function() {
//           setScrollTops();
//           if(scrollTop > 0 && scrollTop <= (bodyHeight - windowHeight)) {
//             animateElements();
//             setKeyframe();
//           }
//         });
//       }
  
//       setScrollTops = function() {
//         scrollTop = $window.scrollTop();
//         relativeScrollTop = scrollTop - prevKeyframesDurations;
//       }
  
//       animateElements = function() {
//         var animation, translateY, translateX, scale, rotate, opacity;
//         for(var i=0;i<keyframes[currentKeyframe].animations.length;i++) {
//           animation   = keyframes[currentKeyframe].animations[i];
//           translateY  = calcPropValue(animation, 'translateY');
//           translateX  = calcPropValue(animation, 'translateX');
//           scale       = calcPropValue(animation, 'scale');
//           rotate      = calcPropValue(animation, 'rotate');
//           opacity     = calcPropValue(animation, 'opacity');
  
//           $(animation.selector).css({
//             'transform':    'translate3d(' + translateX +'px, ' + translateY + 'px, 0) scale('+ scale +') rotate('+ rotate +'deg)',
//             'opacity' : opacity
//           })
//         }
//       }
  
//       calcPropValue = function(animation, property) {
//         var value = animation[property];
//         if(value) {
//           value = easeInOutQuad(relativeScrollTop, value[0], (value[1]-value[0]), keyframes[currentKeyframe].duration);
//         } else {
//           value = getDefaultPropertyValue(property);
//         }
//         // value = +value.toFixed(2) 
//         // TEMPORARILY REMOVED CAUSE SCALE DOESN'T WORK WITHA AGRESSIVE ROUNDING LIKE THIS
//         return value;
//       }
  
//       easeInOutQuad = function (t, b, c, d) {
//         //sinusoadial in and out
//         return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
//       };
  
//       setKeyframe = function() {
//         if(scrollTop > (keyframes[currentKeyframe].duration + prevKeyframesDurations)) {
//             prevKeyframesDurations += keyframes[currentKeyframe].duration;
//             currentKeyframe++;
//             showCurrentWrappers();
//         } else if(scrollTop < prevKeyframesDurations) {
//             currentKeyframe--;
//             prevKeyframesDurations -= keyframes[currentKeyframe].duration;
//             showCurrentWrappers();
//         }
//       }
  
//       showCurrentWrappers = function() {
//         var i;
//         if(keyframes[currentKeyframe].wrapper != currentWrapper) {
//           $(currentWrapper).hide();
//           $(keyframes[currentKeyframe].wrapper).show();
//           currentWrapper = keyframes[currentKeyframe].wrapper;
//         }
//       }
  
//       /*  Helpers
//       -------------------------------------------------- */
  
//       convertPercentToPx = function(value, axis) {
//         if(typeof value === "string" && value.match(/%/g)) {
//           if(axis === 'y') value = (parseFloat(value) / 100) * windowHeight;
//           if(axis === 'x') value = (parseFloat(value) / 100) * windowWidth;
//         }
//         return value;
//       }
  
//       throwError = function() {
//         $body.addClass('page-error')
//       }
  
//       isTouchDevice = function() {
//         return 'ontouchstart' in window // works on most browsers 
//         || 'onmsgesturechange' in window; // works on ie10
//       }
  
//       init();
  
//     })
//   })