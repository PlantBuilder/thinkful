/* 
 *  jQuery Plugin - Wikipedia V1.0.0
 *  
 *  Autor: Marcel Grolms - www.suabo.de 2013
 */ 
$.fn.WikipediaWidget = function(wikipediaPage, options) {  
  //init defaults
  var showTitle = false;
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
    
  //check if pagetitle is set
  if(wikipediaPage == undefined) { console.log('No Wikipedia search titles ! started No query!');return; }
  //init given wikiContainer from the Selector init
    console.log(wikipediaPage)
  var wikiContainer = this;      
  wikiContainer.append('<div class="ajaxLoading"><img src="img/ajax-loader.gif"></div>');

  //get data.parse.images
  $.getJSON('http://en.wikipedia.org/w/api.php?action=parse&format=json&callback=?', {page:wikipediaPage, prop:'text|images', uselang:'en'}, function(parsedata) {
    //remove loading image
    wikiContainer.find('.ajaxLoading').remove();
    wikiContainer.find('.Collage').remove();
    //debug
    console.dir(parsedata);
    //drop text to div container
    var content = $(parsedata.parse.text["*"]).wrap('<div></div>').parent();
    var thumbcontent = content.find('img.thumbimage');
    console.dir(thumbcontent);
    //insert title
    if(showTitle) {
      wikiContainer.append('<div class="wikipediaTitle"></div>').find('.wikipediaTitle').html(parsedata.parse.title);
    }
    //get images of right side table
 //   var rightTableImages = content.find('table a.image img');
 //     console.dir(rightTableImages);
      //var Images = content.find('img');
      //var thumbcontent  = content.find('.thumbinner')
      //console.dir(thumbcontent);
   //   $.each(rightThumbnails, function(index, Thumbnail) {
          //add thumb with thumbMaxHeight and thumbMaxWidth
   //       if(index<=Images.length) wikiContainer.find('.wikipediaThumbGallery').append($(Images).removeAttr('srcset').removeAttr('height').removeAttr('width').css({'width': 'auto', 'height': 'auto', 'max-width': thumbMaxWidth, 'max-height': thumbMaxHeight}).wrap('<li class="wikipediaThumbnail"></li>').parent());
   //   });
      console.log('to here');
    //append first image to main container
 //    wikiContainer.append($(rightTableImages).first().removeAttr('srcset').removeAttr('height').removeAttr('width').wrap('<div class="wikipediaLogo"></div>').parent());
    //append description to main container
    //var description = content.find('p').first.text() $( ":nth-child(1)" ).next( "p" ).text()
 //     var descriptionArray = content.find('p');
 //     console.dir(descriptionArray);
 //     var description = descriptionArray[0].innerText + '<br>';
 //     description +=  descriptionArray[1].innerText;
   // wikiContainer.append('<div class="wikipediaDescription"></div>').find('.wikipediaDescription').append(description);
    //get thumbnail images

//    var rightThumbnails = content.find('.thumb a.image img');
    var rightThumbnails = content.find('img.thumbimage');
   // wikiContainer.append('<ul class="wikipediaThumbGallery"></ul>');
    wikiContainer.append('<div class="Collage effect-parent"></div>');
    //add maxThumbnails to main container
    $.each(rightThumbnails, function(index, Thumbnail) {
      if(index<maxThumbnails) wikiContainer.find('.Collage').append($(Thumbnail).removeAttr('srcset').removeClass('thumbimage').wrap("<div class='Image_Wrapper' data-caption = '" + this.alt + "'></div>").parent());    //  <a href = 'http://en.wikipedia.org/wiki/" + wikipediaPage + "' target='_blank'></a>
    });
    collage();
//    $('.Collage').collageCaption();
    //get right side table
//    var rightTable = content.find('table.infobox, table.float-right').first();
    //init new table
//   var newTable = $('<table class="wikipediaInfoTable"></table>');
    //parse new table from right side table with cutFirstInfoTable and maxInfoTableRows
//    $.each(rightTable.find('tr'), function(index, element) {
//      if(index>cutFirstInfoTableRows && index<(cutFirstInfoTableRows+maxInfoTableRows)) newTable.append(element);
//    });
    //append new table to main container
//    wikiContainer.append(newTable);
//    wikiContainer.append($('<div class="clear"></div>'));
  })
};

