var dataurl = "data.json";

var rlist = [];
var list_html = "<li id={id}> <name>{name}</name><button class='del' id={id}>×</button></li>";

$.ajax({
  url: dataurl,
  error: function(){
    console.log("error");
  },
  success: function(res){
    console.log("success");
    rlist = res;
    update();
  }
});

var first_load = true;
function update(){
  $("ul").html("");
  for (var i=0; i<rlist.length; i++){
    // use g glag to replace globally
    var current_list_html = 
        list_html.replace(/{id}/g, i) 
                 .replace("{name}", rlist[i].name);
    if (!first_load){
      $("ul").append(current_list_html);  
    }
    else{
      $(current_list_html).hide().appendTo("ul").delay( i*100 ).fadeIn(1000);
    }
  }
  first_load = false;
  
  $("button.del").click( function(){
    rlist.splice(this.id,1);
    update();
  });
}

$(".add_btn").click( function(){
  if ( $("input").val()=="" ){
    alert("Invalid input. Please enter again.");
  }
  else {
    rlist.push({ name:$("input").val() });
    $("input").val("");
    update();
  }
});

var open = false;
$(".pick_btn").click( function(){
    if (!open){
      $(".fill_stock").addClass("fill_stock_open");
      open = true;
    }
   
    if (rlist.length == 0)  {
      $("h2").html("");
      $("h2").append("<i class='fa fa-cutlery' aria-hidden='true'></i><h4>Oops! Haven't add any restaurants?</h4>");
    }
    else  {
      countdown();
    }
});

function pick(){
  $("h2").html("");
  var num = Math.floor( Math.random()*(rlist.length) );
  $("h2").append(rlist[num].name);
}

var time;
function countdown(){
  time = 15;
  intervalID = window.setInterval( function(){
    if (time>0){
      time--;
      pick();
    }
    else {
      clearInterval(intervalID);
    }
  }, 100);
}
