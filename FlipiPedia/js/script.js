// Discus ways to refactor this with MarkM

$(window).load(function () {
    $(document).ready(function(){

        collage();
        $('.Collage').collageCaption();

        var $btn_search         = $( "#btn_search" );
        var $input              = $( "input[name='listInput']" );
        var $btn_toTxt          = $( "#btn_toTxt" );
        var $btn_toImg          = $( "#btn_toImg" );
        var $theCard            = $( '#theCard' );
        var $wikiImgContainer   = $( '#wikiImgContainer' );

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

        $btn_toTxt.click(function () {
        $btn_toImg.toggleClass("hidden");
        $btn_toTxt.toggleClass("hidden");
       $ ( '[data-toggle="tooltip"]').hide();
       $ ( ".btn_container a").attr('data-original-title', 'View Images');
       $ ( '[data-toggle="tooltip"]').show();
       document.querySelector("#theCard").classList.toggle("flip");
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

       $ ( '[data-toggle="tooltip"]' ).tooltip({ 'animation': true})
       $btn_toTxt.toggleClass("hidden");
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
    resizeFlipContainer();
}

// helpers to correctly size the bg div
function resizeFlipContainer() {
    var jumbotronSize = ($( '#wikiImgContainer' ).height() + 100) + 'px';
    $( '.flip-container' ).css( 'height', jumbotronSize);
}

function resizeTxtContainer() {
    var jumbotronSize = ($( '#wikiTxtContainer' ).height() + 100) + 'px';
    $( '.flip-container' ).css( 'height', jumbotronSize);
}

// When browser window is resized
var resizeTimer = null;
$(window).bind('resize', function() {
    // hide all the images until we resized
    $('.Collage .Image_Wrapper').css("opacity", 0);
    // set a timer to re-apply the plugin
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(collage, 200);
});