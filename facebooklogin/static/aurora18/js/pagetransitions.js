var PageTransitions = (function() {

	var $main = $( '#pt-main' ),
		$pages = $main.children( 'div.pt-page' ),
		$iterate = $( '#iterateEffects' ),
		animcursor = 1,
		pagesCount = $pages.length,
		current = 0,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;

	function init() {

		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		$pages.eq( current ).addClass( 'pt-page-current' );

		$( '#dl-menu' ).dlmenu( {
			animationClasses : { in : 'dl-animate-in-2', out : 'dl-animate-out-2' },
			onLinkClick : function( el, ev ) {
				ev.preventDefault();
				nextPage( el.data( 'animation' ) );
			}
		} );

		$(document).keydown(function (e) {
        if(e.which == 39){
            if(isAnimating){
				return false;
			}
			animcursor=13
			nextPage(animcursor);
        }
        if(e.which == 37){
            if(isAnimating){
				return false;
			}
			animcursor=14
			prevPage(animcursor);
        }

            });

		$('#nextIterrateEffect').on('click',function(){
			if(isAnimating){
				return false;
			}
			animcursor=13
			nextPage(animcursor);

		});
		$('#prevIterrateEffect').on('click',function(){
			if(isAnimating){
				return false;
			}
			animcursor=14
			prevPage(animcursor);

		});


	}

	function nextPage(options ) {
		var animation = (options.animation) ? options.animation : options;

		if( isAnimating ) {
			return false;
		}

		isAnimating = true;

		var $currPage = $pages.eq( current );

		if(options.showPage){
			if( options.showPage < pagesCount - 1 ) {
				current = options.showPage;
			}
			else {
				current = 0;
			}
		}
		else{
			if( current < pagesCount - 1 ) {
				++current;
			}
			else {
				current = 0;
			}
		}

		var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
			outClass = '', inClass = '';

		switch( animation ) {

			/*case 1:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 2:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 3:
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 4:
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 5:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 6:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 7:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 8:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 9:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 10:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 11:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 12:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-moveFromTopFade';
				break;*/
			case 13:
				outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
				inClass = 'pt-page-moveFromRight';
				break;
			case 14:
				outClass = 'pt-page-moveToRightEasing pt-page-ontop';
				inClass = 'pt-page-moveFromLeft';
				break;
			/*case 15:
				outClass = 'pt-page-moveToTopEasing pt-page-ontop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 16:
				outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
				inClass = 'pt-page-moveFromTop';
				break;
			case 17:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 18:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 19:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 20:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 21:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-scaleUpDown pt-page-delay300';
				break;
			case 22:
				outClass = 'pt-page-scaleDownUp';
				inClass = 'pt-page-scaleUp pt-page-delay300';
				break;
			case 23:
				outClass = 'pt-page-moveToLeft pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 24:
				outClass = 'pt-page-moveToRight pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 25:
				outClass = 'pt-page-moveToTop pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 26:
				outClass = 'pt-page-moveToBottom pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 27:
				outClass = 'pt-page-scaleDownCenter';
				inClass = 'pt-page-scaleUpCenter pt-page-delay400';
				break;
			case 28:
				outClass = 'pt-page-rotateRightSideFirst';
				inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
				break;
			case 29:
				outClass = 'pt-page-rotateLeftSideFirst';
				inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
				break;
			case 30:
				outClass = 'pt-page-rotateTopSideFirst';
				inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
				break;
			case 31:
				outClass = 'pt-page-rotateBottomSideFirst';
				inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
				break;
			case 32:
				outClass = 'pt-page-flipOutRight';
				inClass = 'pt-page-flipInLeft pt-page-delay500';
				break;
			case 33:
				outClass = 'pt-page-flipOutLeft';
				inClass = 'pt-page-flipInRight pt-page-delay500';
				break;
			case 34:
				outClass = 'pt-page-flipOutTop';
				inClass = 'pt-page-flipInBottom pt-page-delay500';
				break;
			case 35:
				outClass = 'pt-page-flipOutBottom';
				inClass = 'pt-page-flipInTop pt-page-delay500';
				break;
			case 36:
				outClass = 'pt-page-rotateFall pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 37:
				outClass = 'pt-page-rotateOutNewspaper';
				inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
				break;
			case 38:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 39:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 40:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 41:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 42:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-rotatePullRight pt-page-delay180';
				break;
			case 43:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-rotatePullLeft pt-page-delay180';
				break;
			case 44:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-rotatePullBottom pt-page-delay180';
				break;
			case 45:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-rotatePullTop pt-page-delay180';
				break;
			case 46:
				outClass = 'pt-page-rotateFoldLeft';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 47:
				outClass = 'pt-page-rotateFoldRight';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 48:
				outClass = 'pt-page-rotateFoldTop';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 49:
				outClass = 'pt-page-rotateFoldBottom';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 50:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-rotateUnfoldLeft';
				break;
			case 51:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-rotateUnfoldRight';
				break;
			case 52:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-rotateUnfoldTop';
				break;
			case 53:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-rotateUnfoldBottom';
				break;
			case 54:
				outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomLeftIn';
				break;
			case 55:
				outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomRightIn';
				break;
			case 56:
				outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomTopIn';
				break;
			case 57:
				outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomBottomIn';
				break;
			case 58:
				outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeLeftIn';
				break;
			case 59:
				outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeRightIn';
				break;
			case 60:
				outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeTopIn';
				break;
			case 61:
				outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeBottomIn';
				break;
			case 62:
				outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselLeftIn';
				break;
			case 63:
				outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselRightIn';
				break;
			case 64:
				outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselTopIn';
				break;
			case 65:
				outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselBottomIn';
				break;
			case 66:
				outClass = 'pt-page-rotateSidesOut';
				inClass = 'pt-page-rotateSidesIn pt-page-delay200';
				break;
			case 67:
				outClass = 'pt-page-rotateSlideOut';
				inClass = 'pt-page-rotateSlideIn';
				break;*/

		}

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function prevPage(options ) {
		var animation = (options.animation) ? options.animation : options;

		if( isAnimating ) {
			return false;
		}

		isAnimating = true;

		var $currPage = $pages.eq( current );

		if(options.showPage){
			if( options.showPage < pagesCount - 1 ) {
				current = options.showPage;
			}
			else {
				current = 0;
			}
		}
		else{
			if( current < pagesCount - 1 ) {
				current=current-1;
			}
			else {
				current = 0;
			}
		}

		var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
			outClass = '', inClass = '';

		switch( animation ) {

			/*case 1:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 2:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 3:
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 4:
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 5:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 6:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 7:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 8:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 9:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 10:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 11:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 12:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-moveFromTopFade';
				break;*/
			case 13:
				outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
				inClass = 'pt-page-moveFromRight';
				break;
			case 14:
				outClass = 'pt-page-moveToRightEasing pt-page-ontop';
				inClass = 'pt-page-moveFromLeft';
				break;
			/*case 15:
				outClass = 'pt-page-moveToTopEasing pt-page-ontop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 16:
				outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
				inClass = 'pt-page-moveFromTop';
				break;
			case 17:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 18:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 19:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 20:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 21:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-scaleUpDown pt-page-delay300';
				break;
			case 22:
				outClass = 'pt-page-scaleDownUp';
				inClass = 'pt-page-scaleUp pt-page-delay300';
				break;
			case 23:
				outClass = 'pt-page-moveToLeft pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 24:
				outClass = 'pt-page-moveToRight pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 25:
				outClass = 'pt-page-moveToTop pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 26:
				outClass = 'pt-page-moveToBottom pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 27:
				outClass = 'pt-page-scaleDownCenter';
				inClass = 'pt-page-scaleUpCenter pt-page-delay400';
				break;
			case 28:
				outClass = 'pt-page-rotateRightSideFirst';
				inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
				break;
			case 29:
				outClass = 'pt-page-rotateLeftSideFirst';
				inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
				break;
			case 30:
				outClass = 'pt-page-rotateTopSideFirst';
				inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
				break;
			case 31:
				outClass = 'pt-page-rotateBottomSideFirst';
				inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
				break;
			case 32:
				outClass = 'pt-page-flipOutRight';
				inClass = 'pt-page-flipInLeft pt-page-delay500';
				break;
			case 33:
				outClass = 'pt-page-flipOutLeft';
				inClass = 'pt-page-flipInRight pt-page-delay500';
				break;
			case 34:
				outClass = 'pt-page-flipOutTop';
				inClass = 'pt-page-flipInBottom pt-page-delay500';
				break;
			case 35:
				outClass = 'pt-page-flipOutBottom';
				inClass = 'pt-page-flipInTop pt-page-delay500';
				break;
			case 36:
				outClass = 'pt-page-rotateFall pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 37:
				outClass = 'pt-page-rotateOutNewspaper';
				inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
				break;
			case 38:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 39:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 40:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 41:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 42:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-rotatePullRight pt-page-delay180';
				break;
			case 43:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-rotatePullLeft pt-page-delay180';
				break;
			case 44:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-rotatePullBottom pt-page-delay180';
				break;
			case 45:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-rotatePullTop pt-page-delay180';
				break;
			case 46:
				outClass = 'pt-page-rotateFoldLeft';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 47:
				outClass = 'pt-page-rotateFoldRight';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 48:
				outClass = 'pt-page-rotateFoldTop';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 49:
				outClass = 'pt-page-rotateFoldBottom';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 50:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-rotateUnfoldLeft';
				break;
			case 51:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-rotateUnfoldRight';
				break;
			case 52:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-rotateUnfoldTop';
				break;
			case 53:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-rotateUnfoldBottom';
				break;
			case 54:
				outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomLeftIn';
				break;
			case 55:
				outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomRightIn';
				break;
			case 56:
				outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomTopIn';
				break;
			case 57:
				outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomBottomIn';
				break;
			case 58:
				outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeLeftIn';
				break;
			case 59:
				outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeRightIn';
				break;
			case 60:
				outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeTopIn';
				break;
			case 61:
				outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeBottomIn';
				break;
			case 62:
				outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselLeftIn';
				break;
			case 63:
				outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselRightIn';
				break;
			case 64:
				outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselTopIn';
				break;
			case 65:
				outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselBottomIn';
				break;
			case 66:
				outClass = 'pt-page-rotateSidesOut';
				inClass = 'pt-page-rotateSidesIn pt-page-delay200';
				break;
			case 67:
				outClass = 'pt-page-rotateSlideOut';
				inClass = 'pt-page-rotateSlideIn';
				break;*/

		}

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
	}

	init();

	return {
		init : init,
		nextPage : nextPage,
	};

})();
$(document).ready(function () {
    if ($(window).width() < 1000) {
        $('.pt-triggers').css({
            'top': '30%'
        });
        $('#eventmenu').css({
            'height': '300px',
            'display': 'grid',


        });
        $('#openmenu').css({
            'top': '2em'
            , 'width': '50%', 'margin-right': '10%'

        });

    $('.eventmenu').css({
        'top': $(window).height()
    });
    $('#eventmenu a').css({
        'font-size': '1.2em',
        'margin': '0',
        'padding': '0'
    });}

	$('#eventmenu > a:nth-child(2)').click(function () {

		$('#page1').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(3)').click(function () {

		$('#page2').addClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(4)').click(function () {

		$('#page3').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(5)').click(function () {
		$('#page4').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(6)').click(function () {
		$('#page5').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(7)').click(function () {
		$('#page6').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(8)').click(function () {
		$('#page7').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(9)').click(function () {
		$('#page8').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(10)').click(function () {
		$('#page9').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(11)').click(function () {
		$('#page10').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(12)').click(function () {
		$('#page11').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(13)').click(function () {
		$('#page12').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(14)').click(function () {
		$('#page13').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(15)').click(function () {
		$('#page14').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(16)').click(function () {
		$('#page15').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(17)').click(function () {
		$('#page16').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(18)').click(function () {
		$('#page17').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
		$('#page18').removeClass('pt-page-current');
    });
	$('#eventmenu > a:nth-child(19)').click(function () {
		$('#page18').addClass('pt-page-current');
		$('#page2').removeClass('pt-page-current');
		$('#page3').removeClass('pt-page-current');
		$('#page4').removeClass('pt-page-current');
		$('#page5').removeClass('pt-page-current');
		$('#page6').removeClass('pt-page-current');
		$('#page7').removeClass('pt-page-current');
		$('#page8').removeClass('pt-page-current');
		$('#page9').removeClass('pt-page-current');
		$('#page10').removeClass('pt-page-current');
		$('#page11').removeClass('pt-page-current');
		$('#page12').removeClass('pt-page-current');
		$('#page13').removeClass('pt-page-current');
		$('#page14').removeClass('pt-page-current');
		$('#page15').removeClass('pt-page-current');
		$('#page16').removeClass('pt-page-current');
		$('#page17').removeClass('pt-page-current');
		$('#page1').removeClass('pt-page-current');
    });


	console.log($('#eventmenu').css('bottom'));
	$('#openmenu').click(function () {
		console.log($('#eventmenu').css('bottom'));
		if($('#eventmenu').css('bottom')<'0px'){
			console.log("fuckl")
			$('#eventmenu').css({
				'bottom':'0%'
			});


		}
		else{
			$('#eventmenu').css({
				'bottom':'-50%'
			});
		}
        }

    );
});