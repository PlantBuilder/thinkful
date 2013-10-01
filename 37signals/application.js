$(document).ready(function(){

        var day = new Date();         //Date.now();
        day = day.getDay();
        var d_name = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        $('#greeting').html('Happy ' + d_name[day]);


    $(".module#one").mouseenter(function(){
        var offset = $(".module#one img").offset();
        var foo = parseFloat((offset.left)+110)-(parseFloat(offset.left)*.19) + 'px';
        $("#overlay").css({'display':'block','background':'url("images/arrow-left.png")',
         'marginLeft': foo}); //, 'marginTop': '-10px'
//        $("div#overlay").html( "left: " + Math.floor(offset.left) + ", top: " + Math.floor(offset.top) );

          $("div.hero").html('<span>Basecamp</span> is the project management tool you <br>wish you had on your last project.');
          $("div.hero").css({'fontSize':'28pt', 'marginTop': '18px','marginBottom':'25px'});
          $("div.subtext").html('Are you still managing projects with email? Are you still using excel for your to-do lists? It\'s time to upgrade to<br>' +
          'Basecamp. Manage projects and collaborate with your team and clients the modern way.');
          $("div.subtext").css({'fontFamily':'arial','fontWeight':'500','fontSize':'11pt', 'marginTop': '15px','marginBottom':'15px'});
    });
    $(".module#two").mouseenter(function(){
        var offset = $(".module#two img").offset();
        var foo = parseFloat((offset.left)+145)-(parseFloat(offset.left)*.18) + 'px';
        $("#overlay").css({'display':'block','background':'url("images/arrow-left.png")',
            'marginLeft': foo, 'marginTop': '-10px'});
            $("div.hero").html('<span>Highrise</span> remembers the important things <br>about people you\'d normally forget.');
            $("div.hero").css({'fontSize':'28pt', 'marginTop': '18px','marginBottom':'25px'});
            $("div.subtext").html('Keep a permanent record of people you do business with. Know who you talked to, when you talked to them, <br>' +
            'what was said, and when to follow up next. Over 20,000,000 contacts are tracked using Highrise');
            $("div.subtext").css({'fontFamily':'arial','fontWeight':'500','fontSize':'11pt', 'marginTop': '15px','marginBottom':'15px'});
    });
    $(".module#three").mouseenter(function(){
        var offset = $(".module#three img").offset();
        var foo = parseFloat((offset.left-17))-(parseFloat(offset.left)*.15) + 'px';
        $("#overlay").css({'display':'block','background':'url("images/arrow-right.png")',
            'marginLeft': foo, 'marginTop': '-10px'});
        $("div.hero").html('From near or far, <span>Campfire</span> helps teams work <br>together over the web in real-time.');
        $("div.hero").css({'fontSize':'28pt', 'marginTop': '18px','marginBottom':'25px'});
        $("div.subtext").html('Share ideas, discussions, concepts, images, code samples, videos, mockups, and documents in a real-time <br>' +
            'private chat room. It\'s game changing. We couldn\'t run our own business without Campfire');
        $("div.subtext").css({'fontFamily':'arial','fontWeight':'500','fontSize':'11pt', 'marginTop': '15px','marginBottom':'15px'});
    });
    $(".module").mouseleave(function(){
        $("div.hero").html('Making collaboration productive and <br>' +
            'enjoyable for people everyday.');
        $("div.hero").css({'fontSize':'40pt', 'fontWeight': '600', marginTop: '0px','marginBottom':'0px'});
        $("div.subtext").html('Frustration-free web-based apps for collaboration, sharing information, and making decisions.');
        $("div.subtext").css({'fontFamily':'Times New Roman','fontWeight':'600','fontSize':'14pt', marginTop: '25px','marginBottom':'10px'});
        $("#overlay").css({'display':'none'});
        // $(".gridpad").css({marginTop: '10px'});
    });
});