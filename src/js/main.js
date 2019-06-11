import $ from "jquery"; // importing jQuery, you can delete if not needed
import Flickity from "flickity";
require("./lib/social"); // Twitter intent JS
const d3 = require("d3");

var s = skrollr.init({forceHeight:false});



var flky = new Flickity( '.carousel', {});


var timer;


$(window).on('load', function() {
  s.refresh();
});

$(window).on("resize", function() {

    clearTimeout(timer);

    timer = window.setTimeout(function() {
        $('.juxtapose').attr('src', function(i, val) { return val; });
    }, 300);

});


d3.svg("assets/graphics.svg").then(function(data){


  var chart = d3.select(data);

  d3.select("#band-graphic").node().insertBefore(chart.select("svg").node(), null);

  var placedChart = d3.select("#band-graphic svg");

  placedChart
    .style("margin-left", "20vh")
    .style("margin-right", "20vh");

  var tooltip = placedChart.append("g")
    .attr("transform", "translate(0,0)")
    .style("opacity", 0);

  tooltip.append("rect")
    .attr("width", 85)
    .attr("height", 75)
    .attr("x", 20)
    .attr("y", 20)
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("fill", "white")
    .style("fill-opacity", 0.7)
    .style("pointer-events", "none");

  var tooltipTextTitle = tooltip.append("text")
      .style("font-size", "12px")
      .style("font-family", "sans-serif")
      .style("font-weight", "bold")
      .attr("x", 30)
      .attr("y", 40);

  var tooltipTextStartYear = tooltip.append("text")
      .style("font-size", "12px")
      .attr("x", 30)
      .attr("y", 75);

  var tooltipTextEndYear = tooltip.append("text")
      .style("font-size", "12px")
      .attr("x", 30)
      .attr("y", 60);

      var tooltipTextStartData = tooltip.append("text")
          .style("font-size", "12px")
          .attr("x", 65)
          .attr("y", 75);

      var tooltipTextEndData = tooltip.append("text")
          .style("font-size", "12px")
          .attr("x", 65)
          .attr("y", 60);


  placedChart.selectAll("[data-chart]")
    .on("mouseover", function(){
      d3.select(this).style("fill-opacity", 0.5);
      var popupInfo = d3.select(this).attr("data-chart").split(":");
      var title = popupInfo[0].substring(0, popupInfo[0].length - 5);
      var yearStart = popupInfo[0].substr(-4);
      var dataStart = popupInfo[1].split(" ")[0];
      var yearEnd = popupInfo[1].split(" ")[1];
      var dataEnd = popupInfo[2];

      tooltip.style("opacity", 1);

      tooltipTextTitle.text(title);
      tooltipTextStartYear.text(yearStart + ":");
      tooltipTextEndYear.text(yearEnd + ":");
      tooltipTextStartData.text(dataStart);
      tooltipTextEndData.text(dataEnd)

    })

    .on("mouseout", function(){
      d3.select(this).style("fill-opacity", 1)
      tooltip.style("opacity",0);
    })

    .on("mousemove", function(){
      let mx = (d3.mouse(this)[0] - 100);
      let my = (d3.mouse(this)[1] - 150);


      if(mx < -19){
        mx = mx + 40;
      }
      if(my < -19){
        my = my + 40 + 75;
      }

      tooltip.attr("transform", "translate(" + mx + "," + my + ")");
    })

})


$(document).scroll(function() {

  //var imgReveal = $('#top-quote').offset().top;

  var scroll = $(document).scrollTop();






  // console.log("TEST", d3);
  //
  // console.log("test");
  //
  // if (scroll > 300) {
  //
  // 	$(".bg-img").css({"-webkit-filter": "blur(5px)","filter": "blur(5px)" })
  //
  // } else {
  //
  // 	$(".bg-img").css({"-webkit-filter": "blur(10px)","filter": "blur(10px)" })
  //
  // }
  //
  // if (scroll > imgReveal){
  //
  // 	$(".bg-img").css({"-webkit-filter": "blur(0px)","filter": "blur(0px)" })
  //
  // }


});




$('#play-video').click(function(){
  $('.fullvideo').css('display','block');
  $('header').css('display','none');
});

$('.close').click(function() {
  $('.fullvideo').css('display','none');
  $('header').css('display','flex');

})


$( document ).ready(function() {

  $( ".hamburger" ).click(function() {
    $( ".menu" ).slideToggle( "slow", function() {
      $( ".hamburger" ).hide();
      $( ".cross" ).show();
    });
  });

  $( ".cross" ).click(function() {
    $( ".menu" ).slideToggle( "slow", function() {
      $( ".cross" ).hide();
      $( ".hamburger" ).show();
    });
  });

  $( ".menu ul" ).click(function() {
    $( ".menu" ).slideToggle( "slow", function() {
      $( ".cross" ).hide();
      $( ".hamburger" ).show();
    });
  });

});
