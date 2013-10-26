/**
 * Created by jim on 10/13/13.
 */

$(document).ready(function() {
        // singleton design pattern
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

        function setArray () {
            myArray = [['Freezing','Cold','Cool','Warm','Hot','Boiling'],[]];
        }

        function initialize () {
            return {
                get: getArray,
                set: setArray
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
    var response = currResponseArray.get();
    var $sub            =  $( "#sub-header" );
    var $info           =  $( "#info");
    var $btn_guess      =  $( "#btn_guess" );
    var $btn_newGame    =  $( "#btn_newGame" );
    var $ul_current     =  $( '.ul_current' );
    $sub.text( "Enter a number between 1 and 100. Then click \"Guess\"." );

    $btn_newGame.click(function () {
        // create a new random number
        currRandomNumber.set();
        //clean out the previous game's data
        response[1]=[];
        $sub.empty();
        document.getElementById("guessEntry").value = '';
        $ul_current.empty();
        // reset the color on buttons
        $btn_guess.animate({color: '#F5F5F5'}, 1000);
        $btn_newGame.animate({color: '#BBBBBB'}, 1000);
        // and set the text to begin game.
        $sub.text( "Enter a number between 1 and 100. Then click \"Guess\"." );
    });

    // ICONS: get some info on the game.
    $(".icon-circle-question-mark").click(function () {
        $sub.hide();
        $info.show();
    });
    // ICONS: put the info away.
    $(".icon-remove").click(function () {
        $info.hide();
        $sub.show();

    });

    $btn_guess.click(function () {
        var success, num, txt, count;
        // grab the random number
        num =  +(currRandomNumber.get());
        //grab the entered value
        success = +(document.getElementById("guessEntry").value);
        // is this the first guess?
        count = $("li").length;
        $info.hide();
        $sub.empty();
        $sub.show();
        if (success > 100 || success < 1) {
            txt =  "Between 1 and 100.";
        } else {
            txt = responseTxt((success - num), count);
        }
        count = count+1;
        if(success == num) {
            $sub.text( "YOU WON! Play again?" );
            $ul_current.prepend( '<li class="winner"> #' + count + ': ' + success + ' YOU WON!' );
            // que player to choose New Game...
            $btn_guess.animate({color: '#BBBBBB'}, 1000);
            $btn_newGame.animate({color: '#F5F5F5'}, 1000);
            // changed the look to make it more visible.

        } else {
            $sub.text( txt );
            // Descending Order: I changed to 'prepend' as it is easier to read 'li' when current one is on top
            $ul_current.prepend( '<li> #' + count + ': ' + success + ' (' + txt + ')' );
        }
    });

    $("#btn_cheat").click(function () {
        // stolen from Eloquent Javascript exercises
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
        if(find(1, "1"))
            $sub.text(find(1, "1"));
        else
            $sub.text("You are on your own.");
    });

    $("#guessEntry").on( "keypress", function (event) {
        // prevent non numerals from being entered
        var which = event.which;
        if(which < 48 || which > 57) event.preventDefault();
        // allow user to use 'Enter Key' to trigger guess
        if(which == 13 && document.getElementById("guessEntry").value) $btn_guess.click();
    });

    function responseTxt(diff, count){
        var ary;
        if(diff < 0){
            diff = diff*-1
        }
        // couldn't get a switch to work here
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
            // if it the first guess just the category.
            response[1][0] = diff;
            return response[0][ary];
        } else {
            // let them know they are moving in the right/wrong direction.
            response[1].push(diff);
            if (response[1][count] < response[1][count-1]) {
                return response[0][ary] + ' - getting warmer.'
            } else {
                return response[0][ary] + ' - getting cooler.';
            }
        }
    }
});