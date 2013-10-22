/**
 * Created by jim on 10/21/13.
 */

$(document).ready(function () {
    /*
     var tooltips = $('#listEntry').qtip({
     prerender: true,
     id: 'sampletooltip',
     content: {
     text: 'Hi. I am a sample tooltip!',
     title: 'WTF'
     },
     hide: {
     event: 'mouseover'
     },
     show: {
     event: 'focus'
     }
     });
     //   var api = $('#qtip-sampletooltip').qtip('api');
     //   api.toggle(false); // Hide
     //   $('#qtip-sampletooltip').qtip('disable');
     //   $('#listEntry').qtip('disable');
     */
    // delete parent icon
    $(document).on('click', '.icon-remove', function () {
     //   console.log("I've been clicked");
        $(this).parent().remove();
    });

    $(document).on('click', "input:checkbox", function () {
        if($(this).prop('checked') == true) {
        // console.log('This is checked');
        $(this).parent().addClass('checked');
        } else {
            $("li").removeClass('checked');
        }
    });
     /*
    $('#listEntry').on("submit", function(event) {
        console.log('This was submitted');
    });
     */


    $("#listEntry").on("keypress", function (event) {
        // prevent non numerals from being entered
        var which = event.which;
        if(which != 13 || (which == 13 && document.getElementById("listEntry").value == '' )) {
            return true;
        }
        // allow user to use 'Enter Key' to trigger guess

        if (which == 13) {
            var inp = $("#listEntry").val();
            if(jQuery.trim(inp).length > 0) {
            $('.ul_current').append('<li>  <input type="checkbox" id="c1" name="cc" /><label for c1>'  + inp + '</label><div class="icon-remove"></div></li>');
            document.getElementById("listEntry").value = '';
            return false;
            } else {
            event.preventBubble();
            }
        }
    });
});