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
  var cutFirstInfoTableRows = 5;
  var maxInfoTableRows = 10;
  
  //option handling
  if(options != undefined) {
    //we got more options
    $.each(options, function(option, value) {
      switch(option) {
        case "showTitle":
          showTitle = value;
        break;
        
        case "maxThumbnails":
          maxThumbnails = value;
        break;
        
        case "maxInfoTableRows":
          maxInfoTableRows = value;
        break;
        
        case "cutFirstInfoTableRows":
          cutFirstInfoTableRows = value;
        break;
      }
    });
  }
    console.dir();
  //check if pagetitle is set
  if(wikipediaPage == undefined) { console.log('No Wikipedia search titles ! started No query!');return; };
  // take care of the images first
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
        var eImage = $("<img />").attr('src', './img/sisyphus.png').load();
        eImage.attr({width:'681px', height:'337px'})
        var eMessage = parsedata.error.info;
        $wikiImgContainer.append('<div class="Collage effect-parent"></div>');
        $wikiImgContainer.find('.Collage').append($(eImage).wrap("<div class='Image_Wrapper'></div>").parent());
        collage();
        $wikiImgContainer.append('<div class="wikipediaError"></div>').find('.wikipediaError').html(eMessage);
        $("#btn_toTxt").addClass('hidden');
    return;
    }
    //wrap the returned data in
    if(parsedata.parse) {
    var content = $(parsedata.parse.text["*"]).wrap('<div></div>').parent();
    var rightThumbnails = content.find('img.thumbimage');
    $wikiImgContainer.append('<div class="Collage effect-parent"></div>');
      $.each(rightThumbnails, function(index, Thumbnail) {
          if(index<maxThumbnails) $wikiImgContainer.find('.Collage').append($(Thumbnail).removeAttr('srcset').removeClass('thumbimage').wrap("<div class='Image_Wrapper' data-caption = '" + this.alt + "'></div>").parent());    //  <a href = 'http://en.wikipedia.org/wiki/" + wikipediaPage + "' target='_blank'></a>
      });
      collage();
      $('.Collage').collageCaption();
      $wikiImgContainer.append($('<div class="clear"></div>'));
      $("#btn_toTxt").removeClass('hidden');

    //insert title
    $wikiTxtContainer.append('<div class="wikipediaTitle"></div>').find('.wikipediaTitle').html(parsedata.parse.title);
    // grab/append the first couple paragraphs
    var descriptionArray = content.find('p');
    var description = descriptionArray[0].innerText + '<br>';
    description +=  descriptionArray[1].innerText + '<br>';
    description +=  descriptionArray[2].innerText;
    $wikiTxtContainer.append('<div class="wikipediaDescription"></div>').find('.wikipediaDescription').append(description);

     // create a link to Wikipedia article, open in another tab to preserve this page
      var wLink = '<a href = "http://en.wikipedia.org/wiki/' + wikipediaPage + '\" target="_blank">Full Wikipedia Article</a>';
      $wikiTxtContainer.append($('<div class="clear"></div>'));
      $wikiTxtContainer.append('<div class="wikipediaLink"></div>').find('.wikipediaLink').append(wLink);

      $wikiTxtContainer.append($('<div class="clear"></div>'));
        if(rightThumbnails.length < 1) {
            $("#btn_toTxt").trigger('click');
            $("#btn_toImg").addClass('hidden');
            resizeTxtContainer();
        }
    }
  })
};

