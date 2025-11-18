$(document).ready(function() {
     var navoffeset=$(".banner-form-part").offset().top;
     var navoffeset2= $('.footer').offset().top;
     var body = document.body;
     var bodyoffsetheight = body.offsetHeight; 
      //alert(bodyoffsetheight);
     $(window).scroll(function(){
         //alert(navoffeset2);
        var scrollpos=$(window).scrollTop(); 
    //  alert(scrollpos);
        if(scrollpos >navoffeset && scrollpos<1350){
            $(".banner-box").addClass("banner-form-part");
        }
        else{
            $(".banner-box").removeClass("banner-form-part");
        }


     });

});

var bannerForm = document.getElementsByClassName("banner-form-part");
var footer = document.getElementsByClassName("footer");