// moved here 11/11/13

$(document).ready(function() {

    // creates the elements displayed in the question bar (spans and an input type=image).
    function buildQuestion(qNum) {
        var key, qData;
        qData = Q[qNum];   // qNum is the key to get data for current question from object ('keys' off the class; i.e. '.question1').
        for ( key in qData ) {
            if (qData[key].tagName == "<span/>") {
                createSpan(qData[key], qNum);
            } else if (qData[key].tagName == "<input/>") {
                createButton(qData[key], qNum);
            }
        }
    }
    // used in function above.
    function createSpan(data, qNum ) {
        $( data.tagName , {
            "class": data.class,
            text: data.text
        })
            .appendTo( qNum );
    }

    // used in buildQuestion above.
    function createButton(data, qNum ) {
        $( data.tagName , {
            "class": data.class,
            type: data.type,
            src: data.src,
            click: data.click
        })
            .appendTo( qNum );
    }


    // initial CLICK OF THE PLUS BUTTON
    function clickPlusBtn(currQ) {
        var gridQ, foo, Qarray;
        Qarray = onBtnClick(currQ);

        $(Qarray[0]).find('.attribution').hide();
        buildQuestion(Qarray[1]);
        $(Qarray[1]).addClass("dimmed");

        gridQ = createGrid(currQ);   // see line 69
        displayGrid(gridQ);
    }

   // called by the above function to determine the particular plus button that was clicked.
    function onBtnClick(e) {
        $('input.test').unbind('click');  // so plusBtn can't be clicked again and make more elements.
        var int = e.replace(/[^1-5]/gi, "");   // regex's out the parameter's number (see object for what is sent; e.g. 'question1').
        // if there is a created grid, get rid of it.
        if(Number(int) > 1) {
            var previousGrid = ".grid" + (Number(int)-1);
            $(previousGrid).empty();
            $(previousGrid).addClass('hidden')
        }
        // build identifiers for manipulating the current question bar and building tease for next question.
        var curr = '.question' + int;
        var nxt = Number(int) + 1;
        nxt =  '.question' + nxt;
        return [curr,nxt]    // send the appropriate classes back to function above; e.g. [.question3, .question4]
    }

    // the following 2 fn's manipulate the image grids. Creation called on line 47. Closed on line 56
    function createGrid (currQ) {
        // snag the int off currQ
        var int = currQ.replace(/[^1-5]/gi, "");
        currQ = "." + currQ;
        var gridQ = ".grid" + int;
        var imgClassArray = ["img_one","img_two","img_three","img_four"];   // to call corresponding keys in dataset
        var  i, $img, data;
        for(i = 0; i < imgClassArray.length; i++) {
            data = Q[currQ][imgClassArray[i]];           // grad the data for the element
            $img = createButton(data,gridQ);            // reusing createButton!!!  (line 27)  should be renamed createClickable.
        }                                               // could probably reuse createSpan for div's and p's; maybe createNonClickables.
        $( '.one, .two, .three, .four' ).wrap( "<div class='module' />" );    // sweet stuff here.
        $( '.module' ).wrap( "<div class='col-1-4' />"  );                    // jQuery is fairly miraculous.
        return gridQ;
    }

    function displayGrid(gridQ) {
        $( gridQ ).removeClass('hidden');
        $('<img>').animo('focus');
        $('.two').animo({animation: 'fadeInLeft', duration: 0.5, keep: false });
        $('.three').animo({animation: 'fadeInRight', duration: 0.5, keep: false });
        $('.one').animo({animation: 'fadeInLeft', duration: 1, keep: false });
        $('.four').animo({animation: 'fadeInRight', duration: 1, keep: false });
    }



    // initial CLICK OF AN IMAGE
    function clickImg(event) {
        var myClass = event.target.className;
        var int = myClass.replace(/[^1-5]/gi, "");   // regex's out the numeral

        var imgArray = onImgClick( int );            // calls function below
        var $currQ      =  $( imgArray[0] );         // to set up appropriate elements for actions.
        var $nextQ      =  $( imgArray[1] );
        var $currBtn    =  $( imgArray[2] );
        var $nextBtn    =  $( imgArray[3] );

        $currBtn .attr( 'src', setImage(myClass) );  // calls setImage (below) so the right graphic (green check or red delete) populates plusBtn.
        $( '.one, .two, .three, .four' ).unbind('click');   // this works a treat. So only one image choice can be made.
        $('.incorrect').animo('blur', {duration: 3, amount: 4});
        $currQ.find('.attribution').animate({color: '#505050'}, 1000);  // fades in the person's name.
        $currQ.find('.attribution').show();
        $currQ.addClass("dimmed");             // you are done with this question
        $nextQ.removeClass("dimmed");          // highlight the next... move along
        $nextBtn.toggleClass('hidden', 2000);
    }

   // called by the above function to determine particular image clicked.
    function onImgClick(int) {
        var curr = '.question' + int;
        var nxt = Number(int) + 1;             // and next one to be teased.
        var currBtn = 'input.test.' + int;
        var nextBtn = 'input.test.' + nxt;     // next questions button will be hidden (line 114)
        nxt =  '.question' + nxt;
        return [curr,nxt,currBtn,nextBtn];
    }

    // routine to get the appropriate right or wrong choice que.
    function setImage(myClass) {
        var result = (myClass.indexOf("incorrect") > -1 ) ? "images/redDelete.png" : "images/greenCheck.png";
        return result;
    }


    // data object
    var Q = {
        ".question1": {        // important named to className
            "category": {
                "tagName": "<span/>",      // what kind of element it is
                "class": "category",       // yah, look in the console and you can see
                "text": "Literature"       // how the elements turn out
            },
            "quote": {
                "tagName": "<span/>",
                "class": "quote",
                "text": "\"Only the ephemeral is of lasting value.\""
            },
            "attribution": {
                "tagName": "<span/>",
                "class": "attribution",
                "text": "-Ionesco"
            },
            "button": {
                "tagName": "<input/>",
                "type": "image",
                "class": "test 1 btn btn-default",    // the 1 in there is imp for when we are parsing out
                "src": "images/plus.png",             // the numeral
                "click": function () {
                    $(this).on('click', function () {
                        clickPlusBtn('question1')       // again the 1 is important.
                    })
                }
            },
            "img_one": {
                "tagName": "<img/>",
                "class": "incorrect one 1",             // correct incorrect sets up the blur, etc. 1 again for parsing,
                "type": "",                             // the 'one', two, etc. is used for animation, unbinding (line 84), and wrapping (line 122)
                "src": "./images/dickinson.png",
                "click": function () {
                    $(this).on('click', function () {   // so clicking the image does something.
                        clickImg(event)
                    })
                }
            },
            "img_two": {
                "tagName": "<img/>",
                "class": "correct two 1",
                "type": "",
                "src": "./images/ionesco.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            },
            "img_three": {
                "tagName": "<img/>",
                "class": "incorrect three 1",
                "type": "",
                "src": "./images/angelou.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            },
            "img_four": {
                "tagName": "<img/>",
                "class": "incorrect four 1",
                "type": "",
                "src": "./images/whitman.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            }
        },
        ".question2": {
            "category": {
                "tagName": "<span/>",
                "class": "category",
                "text": "Science"
            },
            "quote": {
                "tagName": "<span/>",
                "class": "quote",
                "text": "Imagination is more important than knowledge."
            },
            "attribution": {
                "tagName": "<span/>",
                "class": "attribution",
                "text": "-Einstein"
            },
            "button": {
                "type": "image",
                "tagName": "<input/>",
                "class": "test 2 btn btn-default hidden",
                "src": "images/plus.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickPlusBtn('question2')
                    })
                }
            },
            "img_one": {
                "tagName": "<img/>",
                "class": "correct one 2",
                "type": "",
                "src": "./images/einstein.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            },
            "img_two": {
                "tagName": "<img/>",
                "class": "incorrect two 2",
                "type": "",
                "src": "./images/hawking.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            },
            "img_three": {
                "tagName": "<img/>",
                "class": "incorrect three 2",
                "type": "",
                "src": "./images/curie.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            },
            "img_four": {
                "tagName": "<img/>",
                "class": "incorrect four 2",
                "type": "",
                "src": "./images/galileo.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            }
        },
        ".question3": {
            "category": {
                "tagName": "<span/>",
                "class": "category",
                "text": "Art"
            },
            "quote": {
                "tagName": "<span/>",
                "class": "quote",
                "text": "Good artists borrow, great artists steal."
            },
            "attribution": {
                "tagName": "<span/>",
                "class": "attribution",
                "text": "-Picasso"
            },
            "button": {
                "type": "image",
                "tagName": "<input/>",
                "class": "test 3 btn btn-default hidden",
                "src": "images/plus.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickPlusBtn('question3')
                    })
                }
            },
            "img_one": {
                "tagName": "<img/>",
                "class": "incorrect one 3",
                "type": "",
                "src": "./images/gauguin.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            },
            "img_two": {
                "tagName": "<img/>",
                "class": "incorrect two 3",
                "type": "",
                "src": "./images/vangogh.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            },
            "img_three": {
                "tagName": "<img/>",
                "class": "correct three 3",
                "type": "",
                "src": "./images/picasso.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            },
            "img_four": {
                "tagName": "<img/>",
                "class": "incorrect four 3",
                "type": "",
                "src": "./images/klimt.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            }
        },
        ".question4": {
            "category": {
                "tagName": "<span/>",
                "class": "category",
                "text": "Sport"
            },
            "quote": {
                "tagName": "<span/>",
                "class": "quote",
                "text": "I never said most of the things I said"
            },
            "attribution": {
                "tagName": "<span/>",
                "class": "attribution",
                "text": "-Yogi Berra"
            },
            "button": {
                "type": "image",
                "tagName": "<input/>",
                "class": "test 4 btn btn-default hidden",
                "src": "images/plus.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickPlusBtn('question4')
                    })
                }
            },
            "img_one": {
                "tagName": "<img/>",
                "class": "incorrect one 4",
                "type": "",
                "src": "./images/williams.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            },
            "img_two": {
                "tagName": "<img/>",
                "class": "incorrect two 4",
                "type": "",
                "src": "./images/gretzky.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            },
            "img_three": {
                "tagName": "<img/>",
                "class": "correct three 4",
                "type": "",
                "src": "./images/berra.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            },
            "img_four": {
                "tagName": "<img/>",
                "class": "incorrect four 4",
                "type": "",
                "src": "./images/pele.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            }
        },
        ".question5": {
            "category": {
                "tagName": "<span/>",
                "class": "category",
                "text": "Spirituality"
            },
            "quote": {
                "tagName": "<span/>",
                "class": "quote",
                "text": "Simplicity, patience, compassion..."
            },
            "attribution": {
                "tagName": "<span/>",
                "class": "attribution",
                "text": "-All"
            },
            "button": {
                "type": "image",
                "tagName": "<input/>",
                "class": "test 5 btn btn-default hidden",
                "src": "images/plus.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickPlusBtn('question5')
                    })
                }
            },
            "img_one": {
                "tagName": "<img/>",
                "class": "correct one 5",
                "type": "",
                "src": "./images/islam.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            },
            "img_two": {
                "tagName": "<img/>",
                "class": "correct two 5",
                "type": "",
                "src": "./images/judaism.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            },
            "img_three": {
                "tagName": "<img/>",
                "class": "correct three 5",
                "type": "",
                "src": "./images/taoism.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            },
            "img_four": {
                "tagName": "<img/>",
                "class": "correct four 5",
                "type": "",
                "src": "./images/christianity.png",
                "click": function () {
                    $(this).on('click', function () {
                        clickImg(event)
                    })
                }
            }
        }
    };
    //initial value
    buildQuestion('.question1');   // this is the init call
    $("input.test.1").animo({animation: 'tada', duration: 1, keep: false});  // wiggles the plus button to get folk's attention.
});