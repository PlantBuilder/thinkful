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

    var responseArray = (function () {

        var instance,
            myArray = [['Freezing','Cold','Cool','Warm','Hot','Boiling'],[]];

        function getArray () {
            return myArray;
        }

        function initialize () {
            return {
                get: getArray
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
    var currResponseArray = responseArray.getInstance();
    var response = currResponseArray.get()
    var $cheatDisplay =  $( "#cheatDisplay" );
    $cheatDisplay.text( "Enter a number between 1 and 100. Then click \"Guess\"." );

    $("#btn_newGame").click(function () {
        var $cheatDisplay =  $( "#cheatDisplay" );
        currRandomNumber.set();
        $cheatDisplay.empty();
        document.getElementById("guessEntry").value = '';
        $cheatDisplay.text( "Enter a number between 1 and 100. Then click \"Guess\"." );
        $('li').remove();
    });
    // get some info on the game.
    $(".icon-circle-question-mark").click(function () {
        var $cheatDisplay =  $( "#cheatDisplay" );
        $cheatDisplay.hide();
        $( "#infoDisplay").show();
    });
    // put the info away.
    $(".icon-remove").click(function () {
        var $cheatDisplay =  $( "#cheatDisplay" );
        $( "#infoDisplay").hide();
        $cheatDisplay.show();

    });

    $("#btn_guess").click(function () {
        var success, num, txt, count;
        var $hot = $('#hot');
        var $cold = $('#cold');
        var $cheatDisplay = $('#cheatDisplay');
        num =  +(currRandomNumber.get());
        success = +(document.getElementById("guessEntry").value);
        count = $("ul li").length;
        $('#infoDisplay').hide();
        $cheatDisplay.empty();
        $cheatDisplay.show();
        if(isNaN(success)) {
            txt =  "NUMBER please.";
        } else if(success > 100 || success < 1) {
            txt = "Between 1 and 100 please.";
       // if its the first time through (count == 0) Just give the appropriate
       // response from response[0]
        }  else {
            txt =  responseTxt((success-num), count)
        }
        if(success == num) {
            $cheatDisplay.text( "YOU WON! Play again? (Click \"New Game\")" );
        } else {
            $cheatDisplay.text( txt );
        }
        count = count+1;
        $('.ul_current').append('<li> #' + count + ': ' + success + ' (' + txt + ')');
    });

    $("#btn_cheat").click(function () {
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

    function responseTxt(diff, count){
        var ary
        if(diff < 0){
            diff = diff*-1
        }

        if (diff <= 10) {
            ary = 5;
        } else if (diff <= 25) {
            ary = 4;
        } else if (diff <= 40) {
            ary = 3;
        } else if (diff <= 55) {
            ary = 3;
        } else if (diff <= 70) {
            ary = 2;
        } else if (diff <= 85) {
            ary = 1;
        } else {
            ary = 0
        }

    if(!(response[1].length)) {
        // if it the first guess
        response[1][0] = diff;
        return response[0][ary];
    } else {
        // let them know they are moving in the right direction.
        response[1][count] = diff;
        $( "#test2" ).text( response[1][count-1] );
        if (diff < response[1][count-1]) {
         return response[0][ary] + ' - getting warmer.'
        } else {
            return response[0][ary] + ' - getting cooler.';
            }

        }
    }
});