// All images need to be loaded for this plugin to work so
// we end up waiting for the whole window to load in this example
$(window).load(function () {
    $(document).ready(function(){

        collage();
        $('.Collage').collageCaption();

        var $btn_search         = $( "#btn_search" );
        var $input              = $( "input[name='listInput']" );
        var $btn_toTxt          = $( "#btn_toTxt" );
        var $btn_toImg          = $( "#btn_toImg" );
        var $flipContainer      = $( '.flip-container' );
        var $wikiImgContainer   = $( '#wikiImgContainer' );

        $btn_search.click(function () {
            var success, num, txt, count;
            // grab the random number
            $wikiImgContainer.css('width', '99%');
            if($input.val())  $wikiImgContainer.WikipediaWidget($input.val());
        });

        $btn_toTxt.click(function () {
        $btn_toImg.toggleClass("hidden");
        $btn_toTxt.toggleClass("hidden");
       $ ( '[data-toggle="tooltip"]').hide();
       $ ( ".btn_container a").attr('data-original-title', 'View Images');
       $ ( '[data-toggle="tooltip"]').show();
       document.querySelector("#theCard").classList.toggle("flip")
       resizeTxtContainer()
        });

        $btn_toImg.click(function () {
            $btn_toImg.toggleClass("hidden");
            $btn_toTxt.toggleClass("hidden");
            $ ( '[data-toggle="tooltip"]').hide();
            $ ( ".btn_container a").attr('data-original-title', 'View Text');
            $ ( '[data-toggle="tooltip"]').show();
            document.querySelector("#theCard").classList.toggle("flip");
            collage();
        });

       $ ( '[data-toggle="tooltip"]').tooltip({'placement': 'top', 'animation': true})
       $btn_toTxt.toggleClass("hidden");
    });
});


// Here we apply the actual CollagePlus plugin
function collage() {
    $('.Collage').removeWhitespace().collagePlus(
        {
            'fadeSpeed'     : 2000,
            'targetHeight'  : 400,
            'effect'        : "effect-5"
        }
    );

    resizeFlipContainer();
}

function resizeFlipContainer() {
    var jumbotronSize = ($( '#wikiImgContainer' ).height() + 100) + 'px';
 //   console.log(jumbotronSize)
    $( '.flip-container' ).css( 'height', jumbotronSize);
}

function resizeTxtContainer() {
    var jumbotronSize = ($( '#wikiTxtContainer' ).height() + 100) + 'px';
    //   console.log(jumbotronSize)
    $( '.flip-container' ).css( 'height', jumbotronSize);
}

// This is just for the case that the browser window is resized
var resizeTimer = null;
$(window).bind('resize', function() {
    // hide all the images until we resize them
    $('.Collage .Image_Wrapper').css("opacity", 0);
    // set a timer to re-apply the plugin
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(collage, 200);
});
 /*
    var $btn_search =  $( "#btn_search" );
    var $input        = $( "input[name='listInput']" );

    $btn_search.click(function () {
        var success, num, txt, count;
        // grab the random number
       if($input.val())  $('#demo1').WikipediaWidget($input.val());
          //console.log($inp.val());
      //  console.log(success);
        /*
        // is this the first guess?
        count = $("li").length;
        $info.hide();
        $sub.empty();
        $sub.show();
        if (success > 100 || success < 1) {
            txt =  "Between 1 and 100.";
        } else {
            txt = responseTxt((success - num), count);
        }
        count = count+1;
        if(success == num) {
            $sub.text( "YOU WON! Play again?" );
            $ul_current.prepend( '<li class="winner"> #' + count + ': ' + success + ' YOU WON!' );
            // que player to choose New Game...
            $btn_guess.animate({color: '#BBBBBB'}, 1000);
            $btn_newGame.animate({color: '#F5F5F5'}, 1000);
            // changed the look to make it more visible.

        } else {
            $sub.text( txt );
            // Descending Order: I changed to 'prepend' as it is easier to read 'li' when current one is on top
            $ul_current.prepend( '<li> #' + count + ': ' + success + ' (' + txt + ')' );
        }

    });
//    $('#demo1').WikipediaWidget('Stuttgart');
//      $('#demo1').WikipediaWidget('Albert Einstein', { 'showTitle' : true, 'maxThumbnails' : 6 });
});
*/