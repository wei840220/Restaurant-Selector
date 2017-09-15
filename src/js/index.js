;(function($){
  'use strict';

  // global
  var dataList = [];
  var isFirstLoad = true;
  var time = undefined;
  var $htmlString = "<li id={id}> <name>{name}</name><button class='del' id={id}>×</button></li>";

  var _init = function(){
    _initLoad();
    _initEventListeners();
  };

  var _initLoad = function(){
    var dataurl = "data.json";

    $.ajax({
      url: dataurl,
      dataType: "json",
      error: function(){
        console.log("error");
      },
      success: function(res){
        console.log("success");
        dataList = res;
        _update();
      }
    });
  }

  var _update = function (){
    $("ul").html("");
    for (var i = 0; i < dataList.length; i++){
      var current_$htmlString = 
          $htmlString.replace(/{id}/g, i) 
                   .replace("{name}", dataList[i].name);
      if (!isFirstLoad)
        $("ul").append(current_$htmlString);  
      else
        $(current_$htmlString).hide().appendTo("ul").delay( i*100 ).fadeIn(1000);
    }
    isFirstLoad = false;
    
    $("button.del").click( function(){
      dataList.splice(this.id,1);
      _update();
    });
  }

  var _initEventListeners = function(){
    $(".add_btn").click( function(){
      if ( $("input").val()=="" ){
        alert("Invalid input. Please enter again.");
      }
      else {
        dataList.push({ name:$("input").val() });
        $("input").val("");
        _update();
      }
    });
    
    var open = false;
    $(".pick_btn").click( function(){
        if (!open){
          $(".fill_stock").addClass("fill_stock_open");
          open = true;
        }
       
        if (dataList.length == 0)  {
          $("h2").html("");
          $("h2").append("<i class='fa fa-cutlery' aria-hidden='true'></i><h4>Oops! Haven't add any restaurants?</h4>");
        }
        else  {
          countdown();
        }
    });
  };
  
  var pick = function(){
    $("h2").html("");
    var num = Math.floor( Math.random()*(dataList.length) );
    $("h2").append(dataList[num].name);
  };
  
  var countdown = function(){
    time = 15;
    var intervalID = window.setInterval( function(){
      if (time>0){
        time--;
        pick();
      }
      else {
        clearInterval(intervalID);
      }
    }, 100);
  }  

  $(document).ready(function(){
    _init();
});

})(jQuery);