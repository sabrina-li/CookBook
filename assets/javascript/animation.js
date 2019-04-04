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
    if(scrollTop<=90){
        $('.fixHeader').css('height',scrollTop/2);
    }else{
        $('.fixHeader').css('height','40px');
    }
    
    $('.subHeadline').css('opacity',Math.pow((1-ratio),0.7));
    $('.subHeadline').css('transform',' translate3d('+ratio*0+'px, -'+ratio*100+'px, 0px)');

    
    $('#exp8').css('transform','scale('+(1+ratio)+') translate3d('+ratio*210+'px, -'+ratio*200+'px, 0px)');
    $('#exp7').css('transform','scale('+(1+ratio)+') translate3d('+ratio*180+'px, -'+ratio*200+'px, 0px)');
    $('#exp6').css('transform','scale('+(1+ratio)+') translate3d('+ratio*150+'px, -'+ratio*200+'px, 0px)');
    $('#exp5').css('transform','scale('+(1+ratio)+') translate3d('+ratio*120+'px, -'+ratio*200+'px, 0px)');
    $('#exp4').css('transform','scale('+(1+ratio)+') translate3d('+ratio*90+'px, -'+ratio*200+'px, 0px)');
    $('#exp3').css('transform','scale('+(1+ratio)+') translate3d('+ratio*60+'px, -'+ratio*200+'px, 0px)');
    $('#exp2').css('transform','scale('+(1+ratio)+') translate3d('+ratio*30+'px, -'+ratio*200+'px, 0px)');
    $('#exp1').css('transform','scale('+(1+ratio)+') translate3d('+ratio*0+'px, -'+ratio*200+'px, 0px)');
    

}
    
      $(window).scroll(function() {
        scrollTop = $(window).scrollTop();
        if (scrollTop<initposition){
            setCSS();
        }
    })
