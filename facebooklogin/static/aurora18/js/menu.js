$(window).resize(function () {
    var widthSize=$('body').css('width');
    $('.container-div').css({
       'width':widthSize
    });


});
$(window).ready(function () {
    var widthSize=$('body').width()
    $('.container-div').css({
       'width':widthSize
    });
    console.log(widthSize*2)

});

$(window).scroll(function () {
    var widthSize=$('body').width();

    var wScroll=$(this).scrollTop();
    console.log(wScroll)
    if(wScroll>=1000 && wScroll<2000 ){
        $('#mainBack').css({
        'transform':'translate('+'-'+widthSize+'px, 0px)'
    });
    }


    else if(wScroll>=2000 && wScroll<3000){
        $('#mainBack').css({
        'transform':'translate('+'-'+widthSize*2+'px, 0px)'
    });
    }

    else{
         $('#mainBack').css({
        'transform':'translate(0px, 0px)'
    });
    }

});