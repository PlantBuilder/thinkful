// Discus ways to refactor this with MarkM

$(window).load(function () {
    $(document).ready(function(){

        collage();
        $('.Collage').collageCaption();

        var $btn_search         = $( "#btn_search" );
        var $input              = $( "input[name='listInput']" );
        var $btn_toTxt          = $( "#btn_toTxt" );
        var $btn_toImg          = $( "#btn_toImg" );
        var $theCard            = $( "#theCard" );
        var $wikiImgContainer   = $( "#wikiImgContainer" );
        var $tooltip            = $( '[data-toggle="tooltip"]' );
        var $btn_cntnr          = $( '.btn_container a' );

        $btn_search.click(function () {
            if ($theCard.hasClass('hidden')) {
                $theCard.removeClass('hidden');
            }

            if ($theCard.hasClass('flip')) {
                $wikiImgContainer.find('div').remove();
                document.querySelector("#theCard").classList.toggle("flip");
                $btn_toImg.addClass('hidden')
            }

            $wikiImgContainer.css('width', '99%');
            if($input.val())  $wikiImgContainer.WikipediaWidget($input.val());
        });

        $input.on("keypress", function (event) {
            if (event.which == 13) {
                if(jQuery.trim($input.val()).length > 0) {
                    $btn_search.trigger('click');
                }
            }
        });

        $input.on('mouseup', function () {
            $(this).select();
        });

        $btn_toTxt.click(function () {
        $('div.Collage').hide();
        $btn_toImg.toggleClass("hidden");
        $btn_toTxt.toggleClass("hidden");
        $tooltip.hide();
        $btn_cntnr.attr('data-original-title', 'View Images');
        $tooltip.show();
            if (!($theCard.hasClass('flip'))) {
            document.querySelector("#theCard").classList.toggle("flip");
            }
        resizeTxtContainer();
        });

        $btn_toImg.click(function () {
            $('div.Collage').show();
//            $('.Collage').removeClass('hidden');
            $btn_toImg.toggleClass("hidden");
            $btn_toTxt.toggleClass("hidden");
            $tooltip.hide();
            $btn_cntnr.attr('data-original-title', 'View Text');
            $tooltip.show();
            if ($theCard.hasClass('flip')) {
            document.querySelector("#theCard").classList.toggle("flip");
            }
            collage();
        });
        $tooltip.tooltip({ 'animation': true});
    });
});


// Apply the actual CollagePlus plugin
function collage() {
    $('.Collage').removeWhitespace().collagePlus(
        {
            'fadeSpeed'     : 2000,
            'targetHeight'  : 400,
            'effect'        : "effect-5"
        }
    );
    $(' div.Collage' ).css("visibility", "visible");
    resizeFlipContainer();
}

// helpers to correctly size the bg div
function resizeFlipContainer() {
    var h = $( ".Collage" ).height();
    $( "#wikiImgContainer" ).css( 'height', (h + 120) + 'px');
    $( "#theCard" ).css( 'height', (h + 200) + 'px');
}

function resizeTxtContainer() {
    var $wD = $( ".wikipediaDescription" );
    var h =  $wD.height();
    $( "#wikiTxtContainer" ).css( 'height', (h + 174) + 'px');
    $( "#theCard" ).css( 'height', (h + 254) + 'px');

    $wD.on('click', 'a[href]', function(event) {
        var foo = $(this).attr('href').split('/');
        foo = foo[foo.length-1];
        $( "input[name='listInput']").val(foo);
        $("#btn_search").trigger('click');
        event.preventDefault()
    });
    $( "#wikiImgContainer" ).css( 'height', (h + 174) + 'px');
}

// When browser window is resized
var resizeTimer = null;
$(window).bind('resize', function() {
    if ($('.Collage').css('display') == 'block') {
    // hide all the images until resize
   $('div.Collage' ).css("visibility", "hidden");
    // set a timer to re-apply the plugin
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(collage, 200);
 } else {
    resizeTxtContainer()
    }
});
