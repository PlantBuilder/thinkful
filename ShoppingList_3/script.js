/**
 * Created by jim on 10/29/13.
 */
    /*
// Example 1: http://tomicloud.com/2013/01/js-jquery-boilerplates
// mymodule.js - a naive example module with 2 public functions,
// 1 private function and 1 private variable
var MYMODULE = (function () {

    // variables and functions private unless attached to API below
    // 'this' refers to global window

    // private array
    var array = [];

    // add a number into array
    function add(a) {
        log("add "+a);
        array.push(a);
    }

    // return copy of the array
    function get_array() {
        log("copy_array");
        return array.slice();
    }

    // a private debug function
    function log(msg) {
        console.debug(msg);
    }

    // define the public API
    var API = {};
    API.add = add;
    API.get_array = get_array;

    return API;
}());



// Example 2main.js  the actual script used in demo
var MAIN = (function($) {

    // variables and functions private unless attached to API below
    // 'this' refers to global window

    // private array
    var array = [];


    // initialize this module
    function init() {
        $("#a1").click(function() {
            // add random number to array and print array
            add(rand(100));
            var a = get_array();
            log("Array: " + a.join(", "));
            return false;
        });

    }

    // a private debug function
    function log(msg) {
        console.debug(msg);
        $("#debug").append("<p>" + msg + "</p>");
    }

    // PRIVATE functions below

    // add a number into array
    function add(a) {
        array.push(a);
    }

    // return copy of the array
    function get_array() {
        return array.slice();
    }

    // return random integer between 0-maxnum
    function rand(maxnum) {
        return parseInt(Math.random() * maxnum);
    }


    // define the public API
    var API = {};
    API.init = init;
    API.log = log;

    return API;
}(jQuery));
*/
// Example from jQuery site: http://learn.jquery.com/code-organization/concepts/
$( document ).ready(function() {

    var feature = (function() {

        var $items = $( "#myFeature li" );
        var $container = $( "<div class='container'></div>" );
        var $currentItem = null;
        var urlBase = "/foo.php?item=";

        var createContainer = function() {
                var $i = $( this );
                var $c = $container.clone().appendTo( $i );
                $i.data( "container", $c );
            },

            buildUrl = function() {
                return urlBase + $currentItem.attr( "id" );
            },

            showItem = function() {
                $currentItem = $( this );
                getContent( showContent );
            },

            showItemByIndex = function( idx ) {
                $.proxy( showItem, $items.get( idx ) );
            },

            getContent = function( callback ) {
                $currentItem.data( "container" ).load( buildUrl(), callback );
            },

            showContent = function() {
                $currentItem.data( "container" ).show();
                hideContent();
            },

            hideContent = function() {
                $currentItem.siblings().each(function() {
                    $( this ).data( "container" ).hide();
                });
            };

        $items.each( createContainer ).click( showItem );

        return {
            showItemByIndex: showItemByIndex
        };

    })();

    feature.showItemByIndex( 0 );

});

/*

$(document).ready(function () {
    var $document   = $(document);
    var $listEntry  = $("#listEntry");
    var $sortable = $("ul.sortable").sortable();


    // delete parent icon
    $sortable.on('click', '.icon-remove', function () {
        $(this).parent(1).remove();
    });

    // change the look of the done items.
    $sortable.on('click', "input:checkbox", function () {
        if($(this).prop('checked') == true) $(this).parent(1).addClass('checked');
        else
            $(this).parent(1).removeClass('checked');
    });
    // create the li. too much going on here. separate the li creation into its own function.
    $listEntry.on("keypress", function (event) {
        // allow user to use 'Enter Key' to trigger guess
        var which = event.which;
        if (which == 13) {
            var inp = $listEntry.val();
            if(jQuery.trim(inp).length > 0) {
                // too much going on here. Should be tucked away into a function to be called.
                $('.sortable').append('<li>  <input type="checkbox" id="c1" name="cc" /><label for c1>'  + inp + '</label><div class="icon-remove"></div></li>');
                $listEntry.val('');
                return false;
            }
        }
    });
       */