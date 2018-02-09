 var count=0;
    $(document).mousewheel(function (e, delta) {
        $('.scroll-down.svg svg ').css({
            'width':'25px',
            'opacity':'0.5',
            'right':'10px'
        });
        $('#home-scroll-down').css({
            'left':'95%'
        })
        $('.tab-icons svg').css({
            'opacity':1
        });

        if(delta>0){
            if(count>0)
                count--;
        }
        else{
            if (count<=3)
                count++;
        }
        switch (count){
            case 0:
                $('#mang,#cult,#tech').fadeOut("fast");
                 $('#info').fadeIn("fast");
                 $('#tech-img,#mang-img,#cult-img').css({
                     'opacity':0
                 });
                 $('#info-img').css({
                     'opacity':1
                 });
                 $('#svg2,#svg3,#svg1').css({
                     'opacity':0

                 });


            break;
            case 1:
                 $('#mang,#cult,#info').fadeOut("fast");
                 $('#tech').fadeIn("fast");
                 $('#info-img,#mang-img,#cult-img').css({
                     'opacity':0
                 });
                 $('#tech-img').css({
                     'opacity':1
                 });
                 $('#svg1').css({
                     'width':'50px',
                     'height':'50px',
                     'margin-left':'2em'

                 });
                 $('#svg2,#svg3').css({
                     'width':'40px',
                     'height':'40px',
                     'margin-left':'0em'

                 });
                 /*$('#tab-nav').css({
                     'margin-top':'-35px'
                 });*/

            break;
            case 2:
                $('#mang,#tech,#info').fadeOut("fast");
            $('#cult').fadeIn("fast");
            $('#info-img,#mang-img,#tech-img').css({
                     'opacity':0
                 });
                 $('#cult-img').css({
                     'opacity':1
                 });
                 $('#svg2').css({
                     'width':'50px',
                     'height':'50px',
                     'margin-left':'2em'
                 });
                 $('#svg1,#svg3').css({
                     'width':'40px',
                     'height':'40px',
                     'margin-left':'0em'
                 });
                 /*$('#tab-nav').css({
                     'margin-top':'-125px'
                 });*/
            break;
            case 3:
                $('#tech,#cult,#info').fadeOut("fast");
            $('#mang').fadeIn("fast");
            $('#info-img,#cult-img,#tech-img').css({
                     'opacity':0
                 });
                 $('#mang-img').css({
                     'opacity':1
                 });
                 $('#svg3').css({
                     'width':'50px',
                     'height':'50px',
                     'margin-left':'2em'
                 });
                 $('#svg2,#svg1').css({
                     'width':'40px',
                     'height':'40px',
                     'margin-left':'0em'
                 });
                 /*$('#tab-nav').css({
                     'margin-top':'-215px'
                 });*/
            break;

        }
    });
    $(document).ready(function () {
        $('#svg1').click(function () {
            $('#mang,#cult,#info').fadeOut("fast");
                 $('#tech').fadeIn("fast");
                 $('#info-img,#mang-img,#cult-img').css({
                     'opacity':0
                 });
                 $('#tech-img').css({
                     'opacity':1
                 });
                 $('#svg1').css({
                     'width':'50px',
                     'height':'50px',
                     'margin-left':'2em'
                 });
                 $('#svg2,#svg3').css({
                     'width':'40px',
                     'height':'40px',
                     'margin-left':'0em'
                 });
                 /*$('#tab-nav').css({
                     'margin-top':'-35px'
                 });*/
        });
        $('#svg2').click(function () {
            $('#mang,#tech,#info').fadeOut("fast");
            $('#cult').fadeIn("fast");
            $('#info-img,#mang-img,#tech-img').css({
                     'opacity':0
                 });
                 $('#cult-img').css({
                     'opacity':1
                 });
                 $('#svg2').css({
                     'width':'50px',
                     'height':'50px',
                     'margin-left':'2em'
                 });
                 $('#svg1,#svg3').css({
                     'width':'40px',
                     'height':'40px',
                     'margin-left':'0em'
                 });
                 /*$('#tab-nav').css({
                     'margin-top':'-125px'
                 });*/
        });
        $('#svg3').click(function () {
             $('#tech,#cult,#info').fadeOut("fast");
            $('#mang').fadeIn("fast");
            $('#info-img,#cult-img,#tech-img').css({
                     'opacity':0
                 });
                 $('#mang-img').css({
                     'opacity':1
                 });
                 $('#svg3').css({
                     'width':'50px',
                     'height':'50px',
                     'margin-left':'2em'
                 });
                 $('#svg2,#svg1').css({
                     'width':'40px',
                     'height':'40px',
                     'margin-left':'0em'
                 });
                  /*$('#tab-nav').css({
                     'margin-top':'-215px'
                 });*/
        });


        $('#tech-click').click(function () {
            $('#mang,#cult,#info').fadeOut("fast");
            $('#tech').fadeIn("slow");
            $(this).css({
                'font-size':'18em',
                'bottom':'0px',
                'color':'rgba(255, 255, 255, 0.05)'
            });
            $('#mang-click,#cult-click').css({
                'font-size':'3em',

                'color':'#0009'
            });

        });
         $('#cult-click').click(function () {
            $('#mang,#tech,#info').fadeOut("fast");
            $('#cult').fadeIn("slow");
            $(this).css({
                'font-size':'6em',

                'color':'#2a2a2a',

            });
            $('#mang-click,#tech-click').css({
                'font-size':'3em',

                 'color':'#0009'
            });

        });
          $('#mang-click').click(function () {
            $('#tech,#cult,#info').fadeOut("fast");
            $('#mang').fadeIn("slow");
            $(this).css({
                'font-size':'6em',

                'color':'#2a2a2a'
            });
            $('#tech-click,#cult-click').css({
                'font-size':'3em',

                 'color':'#0009'
            });
        });



    });
    var widthSize=$('body').width();

    var swipes=0;