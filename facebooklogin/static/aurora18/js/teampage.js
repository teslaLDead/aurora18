$(window).scroll(function(){
  var wScroll=$(this).scrollTop();
    console.log(wScroll);
        $('#teamcaption').css({
    'transform':'translate(0px, '+ (wScroll/30) +'px) scale('+(1+wScroll/10000) +')'

  });
  $('#teammem').css({
    'transform':'translate(0px, '+ (wScroll/50) +'px) scale('+(1+wScroll/30000) +')'
  });
  $('#topcap').css({
    'transform':'translate(0px, '+ (wScroll/35) +'px) scale('+(1+wScroll/10000) +')'
  });
  $('#bottomcap').css({
    'transform':'translate(0px, '+ (wScroll/40) +'px) scale('+(1+wScroll/35000) +')'
  });
  var scale=$('#topbackground').css('tranform')
  $('#topbackground').css({
    'transform':'scale()'
  });

  if(wScroll>500){
      $('#topbackground').fadeOut(800);
  }
  else{

      $('#topbackground').fadeIn("slow");
  }




});
$( document ).ready(function() {
    console.log( "ready!" );

    $('.teamImage').hover(function () {
        var elements1=jQuery(this).find('.blackfill')
        var elements2=jQuery(this).find('.memberInfo')
        $(elements1).css({
            'opacity':'0.5'
        });
        $(elements2).css({
            'opacity':'1'
        });
    },function () {
        var elements=jQuery(this).find('div')
        $(elements).css({
            'opacity':'0'
        });
    });
    $('.memberInfo').hover(function () {
        $(this).css({
           'font-size':'1.7em'
        });
    },function () {
        $(this).css({
           'font-size':'1.5em'
        });
    });


});

