var initposition = 0;
var scrollTop = 0;
var windowHeight = 0;
var windowWidth = 0;


$(document).ready(function(){
    scrollTop = $(window).scrollTop();
    initposition=$('#exp1')[0].getBoundingClientRect().top+scrollTop;
    windowHeight = $(".parallax").height();
    windowWidth = $(window).width();
    setCSS(); 
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
    if(ratio<=1){
        $('.fixHeader').css('height',scrollTop/2);
    
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
    }else{
        $('.fixHeader').css('height','40px');
    }
}
    
$(window).scroll(function() {
    scrollTop = $(window).scrollTop();
    setCSS();

    $('.recipe-img').each( function(index){
        console.log("get images");
        console.log($(this));
        // halfway through the image
        const slideInAt = (window.scrollY + window.innerHeight) - this.height / 2;
        // bottom of the image
        const imageBottom = this.offsetTop + this.height;
        const isHalfShown = slideInAt > this.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        console.log("slideInAt",slideInAt);
        console.log("offsetTop",this.offsetTop);
        console.log("scrolly",window.scrollY);
        if (isHalfShown && isNotScrolledPast) {
            console.log("adding active")
            this.classList.add('active');
        } else {
            this.classList.remove('active');
        }
    
        
    });
})


