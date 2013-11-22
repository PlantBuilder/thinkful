// All images need to be loaded for this plugin to work so
// we end up waiting for the whole window to load in this example
$(window).load(function () {
    $(document).ready(function(){

        collage();
        $('.Collage').collageCaption();

        var $btn_search =  $( "#btn_search" );
        var $input        = $( "input[name='listInput']" );
        $btn_search.click(function () {
            var success, num, txt, count;
            // grab the random number
            if($input.val())  $('#demo2').WikipediaWidget($input.val());
        });
    });
});


// Here we apply the actual CollagePlus plugin
function collage() {
    $('.Collage').removeWhitespace().collagePlus(
        {
            'fadeSpeed'     : 2000,
            'targetHeight'  : 200,
            'effect'        : "effect-5"
        }
    );
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