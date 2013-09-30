$(document).ready(function(){
    $(".module#one").mouseenter(function(){

        $("#overlay").addClass('overlay_one');
        $("div.hero").replaceWith("<div class='hero'>Foo <br>enjoyable for people every day.</div>");
        $(".subtext").css({color:'#FFF'});
    })
    $(".module#two").mouseenter(function(){

        $("#overlay").addClass('overlay_two')
    })
    $(".module#three").mouseenter(function(){

        $("#overlay").addClass('overlay_three')
    })
    $(".module").mouseleave(function(){
        $("#overlay").removeClass()
    })
});