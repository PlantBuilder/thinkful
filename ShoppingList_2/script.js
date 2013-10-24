/**
 * Created by jim on 10/21/13.
 */

$(document).ready(function () {
    $(function  () {
        $("ul.sortable").sortable()
    })
    // delete parent icon
    $(document).on('click', '.icon-remove', function () {
        $minusOne.trigger('click') //$minusOne.click();
        $(this).parent(1).remove();
    });
    // change the look of the done items.
    $(document).on('click', "input:checkbox", function () {
        if($(this).prop('checked') == true) {
        $(this).parent().addClass('checked');
        } else {
            $("li").removeClass('checked');
        }
    });
    // create the li. too much going on here. separate the li creation into its own function.
    $("#listEntry").on("keypress", function (event) {
        // allow user to use 'Enter Key' to trigger guess
        var which = event.which;
        if (which == 13) {
            var inp = $("#listEntry").val();
            if(jQuery.trim(inp).length > 0) {
            $plusOne.trigger('click');
            // too much going on here. Should be tucked away into a function to be called.
            $('.sortable').append('<li>  <input type="checkbox" id="c1" name="cc" /><label for c1>'  + inp + '</label><div class="icon-remove"></div></li>');
            document.getElementById("listEntry").value = '';
            return false;
            }
        }
    });
    // try out badges
    var badge = 0;
    var favicon = new Favico({
        animation : 'popFade'
    });

    var $plusOne = $('#plusOne').on('click',(function() {
        badge = badge + 1;
        favicon.badge(badge);
    }));
    var $minusOne = $('#minusOne').on('click', (function() {
        badge = (badge-1 < 0) ? 0 : (badge - 1);
        favicon.badge(badge);
    }));
    var $reset = $('#reset').click(function() {
        favicon.reset();
    });
    //intial value
    favicon.badge(badge);
});