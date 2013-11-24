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
  var thumbMaxWidth  = '180px'; 
  var thumbMaxHeight = '180px';
  
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
        
        case "thumbMaxHeight":
          thumbMaxHeight = value;
        break;
        
        case "thumbMaxWidth":
          thumbMaxWidth = value;
        break;        
      }
    });
  }
    console.dir();
  //check if pagetitle is set
  if(wikipediaPage == undefined) { console.log('No Wikipedia search titles ! started No query!');return; };
  // take care of the images first
//  var wikiImgContainer = this;
    $wikiImgContainer.append('<div class="ajaxLoading"><img src="img/ajax-loader.gif"></div>');

  //get data.parse.images
  $.getJSON('http://en.wikipedia.org/w/api.php?action=parse&format=json&callback=?', {page:wikipediaPage, prop:'text|images', uselang:'en'}, function(parsedata) {
    //remove loading image
    $wikiImgContainer.find('.ajaxLoading').remove();
    $wikiImgContainer.find('.Collage').remove();
    //debug
    console.dir(parsedata);

    //drop text to div container
    var content = $(parsedata.parse.text["*"]).wrap('<div></div>').parent();

      var rightThumbnails = content.find('img.thumbimage');
      $wikiImgContainer.append('<div class="Collage effect-parent"></div>');
      $.each(rightThumbnails, function(index, Thumbnail) {
          if(index<maxThumbnails) $wikiImgContainer.find('.Collage').append($(Thumbnail).removeAttr('srcset').removeClass('thumbimage').wrap("<div class='Image_Wrapper' data-caption = '" + this.alt + "'></div>").parent());    //  <a href = 'http://en.wikipedia.org/wiki/" + wikipediaPage + "' target='_blank'></a>
      });
      collage();
      $('.Collage').collageCaption();
      $wikiImgContainer.append($('<div class="clear"></div>'));
   //  resizeFlipContainer();
      // now on to the text
    // console.dir(thumbcontent);
    //insert title
    if(showTitle) {
      $wikiTxtContainer.append('<div class="wikipediaTitle"></div>').find('.wikipediaTitle').html(parsedata.parse.title);
    }

    //append description to hidden text jumbotron main container
    //var description = content.find('p').first.text() $( ":nth-child(1)" ).next( "p" ).text()
    var descriptionArray = content.find('p');
 //     console.dir(descriptionArray);
    var description = descriptionArray[0].innerText + '<br>';
    description +=  descriptionArray[1].innerText;
    $wikiTxtContainer.append('<div class="wikipediaDescription"></div>').find('.wikipediaDescription').append(description);
    //get thumbnail images

//    var rightThumbnails = content.find('.thumb a.image img');

    //get right side table
    var rightTable = content.find('table.infobox, table.float-right').first();
    //init new table
    var newTable = $('<table class="wikipediaInfoTable"></table>');
    //parse new table from right side table with cutFirstInfoTable and maxInfoTableRows
    $.each(rightTable.find('tr'), function(index, element) {
      if(index>cutFirstInfoTableRows && index<(cutFirstInfoTableRows+maxInfoTableRows)) newTable.append(element);
    });
      $('.wikipediaInfoTable a').remove();
    //append new table to main container
      $wikiTxtContainer.append(newTable);
      $wikiTxtContainer.append($('<div class="clear"></div>'));
  })
};

