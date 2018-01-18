$(window).on('load', function() { // makes sure the whole site is loaded
  $('#status').fadeOut(); // will first fade out the loading animation
  $('#preloader').fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').css({'overflow-y':'visible'});
})
$(window).scroll(function(){
  var wScroll=$(this).scrollTop();
    console.log(wScroll);
    if(wScroll>=5000){

            $('#text > p:nth-child(1)').css({'opacity':1});
        }
        if(wScroll>=5500){

            $('#text > p:nth-child(2)').css({'opacity':1});
        }
        if(wScroll>=6000){

            $('#text > p:nth-child(3)').css({'opacity':1});
        }
        if(wScroll>=6500){

            $('#text > p:nth-child(4)').css({'opacity':1});
        }
        if(wScroll>=7000){

            $('#text > p:nth-child(5)').css({'opacity':1});
        }
        if(wScroll>=7500){

            $('#text > p:nth-child(6)').css({'opacity':1});
        }
        if(wScroll>=8000){

            $('#text > p:nth-child(7)').css({'opacity':1});
        }
        if(wScroll>=10000){

            $('#textLast > p:nth-child(1)').css({'opacity':1});
        }
        if(wScroll>=10500){

            $('#textLast > p:nth-child(2)').css({'opacity':1});
        }
        if(wScroll>=11000){

            $('#textLast > p:nth-child(3)').css({'opacity':1});
        }
        if(wScroll>=11500){

            $('#textLast > p:nth-child(4)').css({'opacity':1});
        }
        if(wScroll>=12000){

            $('#textLast > p:nth-child(5)').css({'opacity':1});
        }
        if(wScroll>=12500){

            $('#textLast > p:nth-child(6)').css({'opacity':1});
        }
        if(wScroll>=13000){

            $('#textLast > p:nth-child(7)').css({'opacity':1});
        }


    if (wScroll<=5000){
             $('#maintitle').css({
       'top':530-(wScroll/15)+'px',
        'transform':' scale('+(1+wScroll/20000) +') ',
        'opacity':wScroll/5000
    });
    $('#background').css({
    'transform':'translate(0px, '+ (wScroll/1.005) +'px) scale('+(1+wScroll/80000) +')'
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
    if (wScroll<=4000){
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
    else if (wScroll>4000 && wScroll<9000){
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
        var temp=wScroll-4000;
        $('#manImage').css({
    'transform':'scale('+(0.8+temp/60000) +') '
  });


        $('#manShadow').css({
    'transform':'scale('+(0.8+temp/160000) +') '
  });
    }
    else if (wScroll>9000 && wScroll<13000){
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
        var temp=wScroll-9000;
    $('#solarsystem').css({
    'transform':'scale('+(1+temp/160000) +') '
  });
    $('#stars').css({
    'transform':'scale('+(1+temp/40000) +') '
  });
    $('#spaceman').css({
    'transform':'scale('+(0.6+temp/20000) +') rotate('+temp/1000+'deg)'
  });
    $('#spacemanoutline').css({
    'transform':'scale('+(0.6+temp/30000) +') rotate('+temp/1000+'deg) '
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

