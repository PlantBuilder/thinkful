/**
 * Created by jim on 10/13/13.
 */

$(document).ready(function() {

        var myRandomNumber = (function () {

        var instance,
            myProperty = Math.floor((Math.random()*100)+1);

        function getProperty () {
            return myProperty;
        }

        function setProperty () {
            myProperty = Math.floor((Math.random()*100)+1);
        }

        function initialize () {
            return {
                get: getProperty,
                set: setProperty
            };
        }

        return {
            getInstance: function () {

                if ( !instance ) {
                    instance = initialize();
                }

                return instance;
            }
        };

    })();


  var currRandomNumber = myRandomNumber.getInstance();

    $( "#test" ).text( currRandomNumber.get() );

    $( "#cheatDisplay" ).text( "Please click \"Guess\"." );

    $("#newGame").click(function () {
        currRandomNumber.set();
        $('#cheatDisplay').empty();
        $( "#cheatDisplay" ).text( "Please click \"Guess\"." );
        $('li').remove();
       // TODO Comment out when finished. test stuff.
//       $( "p" ).empty();
//       $( "p" ).text( currRandomNumber.get() );
    });

    $("#guess").click(function () {
        var success, num, txt;
        num =  +(currRandomNumber.get());
        success = +(prompt("Enter a number between 1 & 100:", "..."));
        $('#cheatDisplay').empty();
        $('#hot').removeClass();
        $('#cold').removeClass();
        if(isNaN(success)) {
            $( "#cheatDisplay" ).text( "NUMBER please." );
        } else if(success > 100 || success < 1) {
            $( "#cheatDisplay" ).text( "Between 1 and 100 please." );
        } else if(success > num) {
            $( "#cheatDisplay" ).text( "Too High." );
            $('#hot').addClass("highlightHot");
        }  else if (success < num){
            txt =  "Too Low."
            $( "#cheatDisplay" ).text( txt );
            $('#cold').addClass("highlightCold");
        } else {
            $( "#cheatDisplay" ).text( "Just Right. Again...? (Click New Game)" );
            alert( "YOU WON!!!" );
        }
        var count = $("ul li").length +1;
        $('.ul_current').append('<li> Guess ' + count + ': ' + success + ' (' + txt + ')');
    });

    $("#cheat").click(function () {
        var goal = currRandomNumber.get();
        function find(start, history) {
            if (start == goal)
                return history;
            else if (start > goal)
                return null;
            else
                return find(start + 5, "(" + history + " + 5)") ||
                    find(start * 3, "(" + history + " * 3)");
        }
            if(find(1, "1")) {
                $('#cheatDisplay').text(find(1, "1"));
            } else {
                $('#cheatDisplay').text("You are on your own.");
            }
    });

});