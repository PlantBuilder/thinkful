/**
 * Created by jim on 10/21/13.
 */
$(document).ready(function () {
    // delete parent icon
    $(document).on('click', '.icon-remove', function () {
        $(this).parent().remove();
    });
    // change the look of done items.
    $(document).on('click', "input:checkbox", function () {
        if($(this).prop('checked') == true) {
            $(this).parent().addClass('checked');
        } else {
            $("li").removeClass('checked');
        }
    });
    // build the li
    $("#listEntry").on("keypress", function (event) {
        // allow user to use 'Enter Key' to trigger guess
        var which = event.which;
        if (which == 13) {
            var inp = $("#listEntry").val();
            // too much going on here. Should be tucked away into a function to be called.
            $('.ul_current').append('<li>  <input type="checkbox" id="c1" name="cc" /><label for c1>'  + inp + '</label><div class="icon-remove"></div></li>');
            document.getElementById("listEntry").value = '';
            return false;
        }
    });
});