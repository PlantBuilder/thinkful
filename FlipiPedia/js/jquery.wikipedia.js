/* 
 *  jQuery Plugin - Wikipedia V1.0.0
 *  
 *  Autor: Marcel Grolms - www.suabo.de 2013
 */ 
$.fn.WikipediaWidget = function(wikipediaPage, options) {
  var $wikiImgContainer = $( '#wikiImgContainer' );
  var $wikiTxtContainer = $( '#wikiTxtContainer' );
  //init defaults
  var showTitle = true;
  var maxThumbnails = 24;

  //check if pagetitle is set
  if(wikipediaPage == undefined) { console.log('No Wikipedia search titles ! started No query!');return; };
  // tlet them know we are going out to get data
    $wikiImgContainer.append('<div class="ajaxLoading"><img src="img/ajax-loader.gif"></div>');
    resizeFlipContainer();

  //get data.parse.images
  $.getJSON('http://en.wikipedia.org/w/api.php?action=parse&format=json&callback=?', {page:wikipediaPage, prop:'text|images', uselang:'en'}, function(parsedata) {
    //clean any previous data
    $wikiImgContainer.find('.ajaxLoading').remove();
    $wikiImgContainer.find('div').remove();
    $wikiTxtContainer.find('div').remove();
    resizeFlipContainer();

    // catch and deal with errors
    if( typeof parsedata.error != 'undefined') {
        // user typed in gibberish
        var eImage = $("<img />").attr('src', './img/sisyphus.png').load();
        eImage.attr({width:'681px', height:'337px'})
        var eMessage = parsedata.error.info;
        $wikiImgContainer.append('<div class="Collage effect-parent"></div>');
        $wikiImgContainer.find('.Collage').append($(eImage).wrap("<div class='Image_Wrapper'></div>").parent());
        collage();
        $wikiImgContainer.append('<div class="wikipediaError"></div>').find('.wikipediaError').html(eMessage);
        $("#btn_toTxt").addClass('hidden');
        event.preventDefault();
    }
    //there is data.
    if(parsedata.parse) {
    // deal with text.
    var content = $(parsedata.parse.text["*"]).wrap('<div></div>').parent();

    // tricky-captions and images are in two different objects.
    var Captions = content.find('.thumbinner');
    var Thumbnails = content.find('img.thumbimage');
    $wikiImgContainer.append('<div class="Collage effect-parent"></div>');
      $.each(Thumbnails, function(index, Thumbnail) {
          var caption = Captions[index].innerText;
          if(index<maxThumbnails) $wikiImgContainer.find('.Collage').append($(Thumbnail).removeAttr('srcset').removeClass('thumbimage').wrap("<div class='Image_Wrapper' data-caption = '" + caption + "'></div>").parent());    //  <a href = 'http://en.wikipedia.org/wiki/" + wikipediaPage + "' target='_blank'></a>
      });
      // call the display routine that I found on the intertubes
      collage();
      $('.Collage').collageCaption();
      $wikiImgContainer.append($('<div class="clear"></div>'));
      $("#btn_toTxt").removeClass('hidden');

    // Back to the text insert title
    $wikiTxtContainer.append('<div class="wikipediaTitle"></div>').find('.wikipediaTitle').html(parsedata.parse.title);
    // grab/append the first couple paragraphs
    var descriptionArray = content.find('p');
    if(descriptionArray.length > 0) {
    var description = descriptionArray[0].innerText + '<br>';
    description +=  descriptionArray[1].innerText + '<br>';
    description +=  descriptionArray[2].innerText;
    } else {
     description = content;
    }
    $wikiTxtContainer.append('<div class="wikipediaDescription"></div>').find('.wikipediaDescription').append(description);

     // create a link to Wikipedia article, open in another tab to preserve this page
      var wLink = '<a href = "http://en.wikipedia.org/wiki/' + wikipediaPage + '\" target="_blank">Read Wikipedia Article</a>';
      $wikiTxtContainer.append($('<div class="clear"></div>'));
      $wikiTxtContainer.append('<div class="wikipediaLink"></div>').find('.wikipediaLink').append(wLink);

      $wikiTxtContainer.append($('<div class="clear"></div>'));

        // sometimes there the disambugation page shows up. No images...
        if(Thumbnails.length < 1) {
            $("#btn_toTxt").trigger('click');
            $("#btn_toImg").addClass('hidden');
            resizeTxtContainer();
        }
    }
  })
};

