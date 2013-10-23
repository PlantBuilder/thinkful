/**
 * Created by jim on 10/21/13.
 */

$(function  () {
    $("ul.sortable").sortable()
})

$(document).ready(function () {
    // delete parent icon
    $(document).on('click', '.icon-remove', function () {
        $(this).parent().remove();
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
            // too much going on here. Should be tucked away into a function to be called.
            $('.sortable').append('<li>  <input type="checkbox" id="c1" name="cc" /><label for c1>'  + inp + '</label><div class="icon-remove"></div></li>');
            document.getElementById("listEntry").value = '';
            return false;
            }
        }
    });
});