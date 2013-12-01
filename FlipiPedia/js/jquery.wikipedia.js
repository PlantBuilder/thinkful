/* 
 *  jQuery Plugin - Wikipedia V1.0.0
 *  
 *  Author: Marcel Grolms - www.suabo.de 2013
 */ 
$.fn.WikipediaWidget = function(wikipediaPage, options) {
  var description, descriptionArray, content, eImage, eMessage, Captions, caption, Thumbnails, i;
  var $wikiImgContainer = $( '#wikiImgContainer' );
  var $wikiTxtContainer = $( '#wikiTxtContainer' );
  //init default
  var maxThumbnails = 24;

  //check if pagetitle is set
  if(wikipediaPage == undefined) { console.log('No Wikipedia search titles ! started No query!');return; };
  // let them know we are going out to get data
    $wikiImgContainer.prepend('<div class="ajaxLoading"><img src="img/ajax-loader.gif"></div>');

  //get data.parse.images
  $.getJSON('http://en.wikipedia.org/w/api.php?action=parse&format=json&callback=?', {page:wikipediaPage, prop:'text|images', uselang:'en'}, function(parsedata) {
    //clean any previous data
    $wikiImgContainer.find('.ajaxLoading').remove();
    $wikiTxtContainer.find('.ajaxLoading').remove();
    $wikiImgContainer.find('div').remove();
    $wikiTxtContainer.find('div').remove();
//    $(parsedata.parse.text["a[href^='/wiki/']"]).prop('href', function() { return this.href.replace("\/wiki\/", "http://en.wikipedia.org/wiki/"); })
    console.dir(parsedata)

    // catch and deal with errors
    if( typeof parsedata.error != 'undefined') {
        // user typed in gibberish
        eImage = $("<img />").attr('src', './img/sisyphus.png').load();
        eImage.attr({width:'681px', height:'337px'})
        eMessage = parsedata.error.info;
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
    content = $(parsedata.parse.text["*"]).wrap('<div></div>').parent();
    console.dir(content)
    // tricky-captions and images are in two different objects.
    Captions = content.find('.thumbinner');
    if(Captions.length > 1) {
        Thumbnails = content.find('img.thumbimage');
        $wikiImgContainer.append('<div class="Collage effect-parent"></div>');
        $.each(Thumbnails, function(index, Thumbnail) {
          caption = Captions[index].innerText;
          if(index<maxThumbnails) $wikiImgContainer.find('.Collage').append($(Thumbnail).removeAttr('srcset').removeClass('thumbimage').wrap("<div class='Image_Wrapper' data-caption = '" + caption + "'></div>").parent());    //  <a href = 'http://en.wikipedia.org/wiki/" + wikipediaPage + "' target='_blank'></a>
        });
      // call the display routine that I found on the intertubes
      collage();
      $('.Collage').collageCaption();
      $wikiImgContainer.append($('<div class="clear"></div>'));
      $("#btn_toTxt").removeClass('hidden');
    }

    // Back to the text insert title
    $wikiTxtContainer.append('<div class="wikipediaTitle"></div>').find('.wikipediaTitle').html(parsedata.parse.title);
    // grab/append the first couple paragraphs

    descriptionArray = content.find('p');
    if( descriptionArray.length > 2 ) {
        console.dir(descriptionArray)
        description = '';
        for(i=0; i<3; i++) {
        description += descriptionArray[i].innerText + '<br>';
        }
    } else {
    description = content;
//    console.dir(description)
    }
    $wikiTxtContainer.append('<div class="wikipediaDescription"></div>').find('.wikipediaDescription').append(description);
    $wikiTxtContainer.css({"font-size": "16px", "float": "right"})

     // create a link to Wikipedia article, open in another tab to preserve this page
      var wLink = '<a href = "http://en.wikipedia.org/wiki/' + wikipediaPage + '\" target="_blank">Read Wikipedia Article</a>' + '&nbsp; &nbsp;';
      $wikiTxtContainer.append($('<div class="clear"></div>'));
      $wikiTxtContainer.append('<div class="wikipediaLink"></div>').find('.wikipediaLink').append(wLink);
      $wikiTxtContainer.append($('<div class="clear"></div>'));

        if(Captions.length == 0) {
            $("#btn_toTxt").trigger('click');
            $("#btn_toImg").addClass('hidden');
            $wikiTxtContainer.css({"font-size": "12px", "float": "left"})
            resizeTxtContainer();
        }
    }
  })
};
