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
    var $cheatDisplay = $('#cheatDisplay');
    $cheatDisplay .text( "Please click \"Guess\"." );

    $("#newGame").click(function () {
        currRandomNumber.set();
        $cheatDisplay.empty();
        $cheatDisplay.text( "Please click \"Guess\"." );
       // TODO Comment out when finished. test stuff.
//       $( "p" ).empty();
//       $( "p" ).text( currRandomNumber.get() );
    });

    $("#guess").click(function () {
        var success, num, txt;
        var $hot = $('#hot');
        var $cold = $('#cold');
        var $cheatDisplay = $('#cheatDisplay');
        num =  +(currRandomNumber.get());
        success = +(prompt("Enter a number between 1 & 100:", "..."));
        $cheatDisplay.empty();
        $hot.removeClass();
        $cold.removeClass();
        if(isNaN(success)) {
            txt =  "NUMBER please.";
        } else if(success > 100 || success < 1) {
            txt = "Between 1 and 100 please.";
        } else if(success > num) {
            txt =  "Too High.";
            $hot.addClass("highlightHot");
        }  else {
            txt = "Too Low.";
            $cold.addClass("highlightCold");
        }
        if(success == num) {
            $cold.removeClass();
            $cheatDisplay.text( "Just Right. Again...? (Click New Game)" );
            alert( "YOU WON!!!" );
        } else {
            $cheatDisplay.text( txt );
        }
    });

    $("#cheat").click(function () {
        var $cheatDisplay = $('#cheatDisplay');
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
                $cheatDisplay.text(find(1, "1"));
            } else {
                $cheatDisplay.text("You are on your own.");
            }
    });

});