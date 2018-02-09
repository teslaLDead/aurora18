$(window).on('load', function() { // makes sure the whole site is loaded
  $('#status').fadeOut(); // will first fade out the loading animation
  $('#preloader').fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').css({'overflow-y':'visible'});
})
$(window).scroll(function(){
  var wScroll=$(this).scrollTop();
    console.log(wScroll);
    $('#home-scroll-down').css({'opacity':0});
    if(wScroll>=1500){

            $('#text > p:nth-child(1)').css({'opacity':1});
        }
        if(wScroll>=1700){

            $('#text > p:nth-child(2)').css({'opacity':1});
        }
        if(wScroll>=1900){

            $('#text > p:nth-child(3)').css({'opacity':1});
        }
        if(wScroll>=2100){

            $('#text > p:nth-child(4)').css({'opacity':1});
        }
        if(wScroll>=2300){

            $('#text > p:nth-child(5)').css({'opacity':1});
        }
        if(wScroll>=2500){

            $('#text > p:nth-child(6)').css({'opacity':1});
        }
        if(wScroll>=2700){

            $('#text > p:nth-child(7)').css({'opacity':1});
        }
        if(wScroll>=3200){

            $('#textLast > p:nth-child(1)').css({'opacity':1});
        }
        if(wScroll>=3400){

            $('#textLast > p:nth-child(2)').css({'opacity':1});
        }
        if(wScroll>=3600){

            $('#textLast > p:nth-child(3)').css({'opacity':1});
        }
        if(wScroll>=3800){

            $('#textLast > p:nth-child(4)').css({'opacity':1});
        }
        if(wScroll>=3800){

            $('#textLast > p:nth-child(5)').css({'opacity':1});
        }
        if(wScroll>=4000){

            $('#textLast > p:nth-child(6)').css({'opacity':1});
        }
        if(wScroll>=4200){

            $('#textLast > p:nth-child(7)').css({'opacity':1});
        }


    if (wScroll<=1300){
             $('#maintitle').css({
       'top':530-(wScroll/5)+'px',
        'transform':' scale('+(1+wScroll/20000) +') ',
        'opacity':wScroll/2000
    });
    $('#background').css({
    'transform':' scale('+(1+wScroll/10000) +')'
  });
  $('#mountain0').css({
    'transform':' scale('+(1+wScroll/150000) +')'
  });
  $('#mountain1').css({
    'transform':'translate(0px, '+ wScroll/1.008 +'px)'
  });


   $('#mountain3-reflection').css({
    'transform':'translate(0px, '+ ''+wScroll/1.003 +'px)'
  });

    }
    if (wScroll<=1300){
        $('#logo').css({
            'opacity':1
        });
        $('#mountainScene1').css({
            'opacity':1
        });
        $('#mountainScene2').css({
            'opacity':0
        });
        $('#scene3').css({
            'opacity':0
        });

    }
    else if (wScroll>1300 && wScroll<2800){
        $('#logo').css({
            'opacity':0
        });
         $('#mountainScene1').css({
            'opacity':0
        });
        $('#mountainScene2').css({
            'opacity':1
        });
        $('#scene3').css({
            'opacity':0
        });
        var temp=wScroll-1300;
        $('#manImage').css({
    'transform':'scale('+(0.8+temp/10000) +') '
  });


        $('#manShadow').css({
    'transform':'scale('+(0.8+temp/14000) +') '
  });
    }
    else if (wScroll>2900 && wScroll<13000){
        $('#logo').css({
            'opacity':0
        });
         $('#mountainScene1').css({
            'opacity':0
        });
        $('#mountainScene2').css({
            'opacity':0
        });
        $('#scene3').css({
            'opacity':1
        });
        var temp=wScroll-2900;
    $('#solarsystem').css({
    'transform':'scale('+(1+temp/160000) +') '
  });
    $('#stars').css({
    'transform':'scale('+(1+temp/40000) +') '
  });
    $('#spaceman').css({
    'transform':'scale('+(0.6+temp/5000) +') rotate('+temp/100+'deg)'
  });
    $('#spacemanoutline').css({
    'transform':'scale('+(0.6+temp/8000) +') rotate('+temp/150+'deg) '
  });
    }

});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
$(document).ready(function(){

    console.log("widht is"+$(window).width());
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');

		if ($(this).hasClass('open')){
		    if($(window).width()<1000){
		        $('#mySidenav').css({
            'width':'100%'
        },
                );
            }
            else{
		    $('#mySidenav').css({
            'width':'20%'
        },
                );}
		    $('#nav-icon4.open >span:nth-child(1),#nav-icon4.open>span:nth-child(3)').css({
                'background':'#505050'
            });
        }
        else{
		    $('#mySidenav').css({
            'width':'0px'
        });
		    $('#nav-icon4>span:nth-child(1),#nav-icon4>span:nth-child(3)').css({
                'background':'white'
            })
        }
	});

});

