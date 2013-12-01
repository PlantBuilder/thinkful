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

        $btn_toTxt.click(function () {
        $('div.Collage').hide();
//        $('.Collage').addClass('hidden');
        $btn_toImg.toggleClass("hidden");
        $btn_toTxt.toggleClass("hidden");
        $tooltip.hide();
        $btn_cntnr.attr('data-original-title', 'View Images');
        $tooltip.show();
        document.querySelector("#theCard").classList.toggle("flip");
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
            document.querySelector("#theCard").classList.toggle("flip");
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
    $("a[href^='/wiki/']").prop('href', function() { return this.href.replace("\/wiki\/", "http://en.wikipedia.org/wiki/"); })

    $wD.on('click', 'a[href]', function(event) {
        var foo = $(this).attr('href').split('http://');
        console.log(foo);
        $(this.currentTarget).attr('href', foo[0]+foo[2]);
        console.log(event);
    });
    $( "#wikiImgContainer" ).css( 'height', (h + 174) + 'px');
}

// When browser window is resized
var resizeTimer = null;
$(window).bind('resize', function() {
    if ($('#btn_toImg').hasClass('hidden')) {
    // hide all the images until resize
   $('div.Collage' ).css("visibility", "hidden");//({"opacity": 0, "color": "white"});
    // set a timer to re-apply the plugin
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(collage, 200);
 } else {
    resizeTxtContainer()
    }
});
