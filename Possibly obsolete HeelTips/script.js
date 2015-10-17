

  // VARIABLE DECLARATION
  var lockpadIsOpen = 1;
  var tempObject = 0;
  var sliderXPosition = new Number;
  var sliderDivPosition = new Number;
  var xPosStr = new String;
  var xPosNum = new Number;
  var svgSizeX = new Number; // 1.75px * magnification
  var svgSizeY = new Number; // for pixels: (sliderPos - 233)*3.46

    ////////////////////////////////////////////////////
  /////       $(document).ready(function(){      /////
  ////////////////////////////////////////////////////
  $(document).ready(function () { // for DOM interaction

    sliderDivPosition=$(".sliderDiv").position().left;
    
    $("#lockpadClosed").toggle(); // hide the open lock 
    makeDraggable(); // call function to start dragging object
    getXPos(); // retrieving the x position of the slider
    // setSliderStart(); // set slider to initial position
    calculateMagnification(); // start calculateMagnification


    // function setSliderStart() {
    //   $("#sliderButton").css({ "left": 38, "top:": -122, });
    // } // end setSliderStart
    
    
    function getXPos() {
        xPosStr = $("#sliderButton").css("left");
        return xPosStr.slice(0, -2);
    } // end getPosX
    
    
    function calculateMagnification() {
      sliderXPosition=$("#sliderButton").position().left; 
      svgSizeX = ( (sliderXPosition - sliderDivPosition) - 233) * 3.46;
      svgSizeY = ( (sliderXPosition - sliderDivPosition) - 233) * 25.9;
      
      resizeSVGs();
    } // end calculateMagnification

    
    function resizeSVGs() {
      $(".resizableObjectsClass").height(svgSizeY + "px");
      $(".resizableObjectsClass").width(svgSizeX + "px");
    } // end resizeSVGs


    function makeDraggable() {
    $("#sliderButton").draggable({ axis: "x", delay:0, cursorAt:{left:6}, containment:"#sliderButtonID", scroll:false,
        drag: function() { calculateMagnification(); },
        stop: function() { $( ".ui-draggable" ).disableSelection(); }
      }); // end drag function
    } // end makeDraggable()

    
    function makeUndraggable() {
      $("#sliderButton").draggable({ axis: "x", delay:10000, cursorAt:{left:6}, containment:"#sliderButtonID", scroll:false,
        stop: function() { $( ".ui-draggable" ).disableSelection(); }
      }); // end drag function
    } // end makeUndraggable()


    $("#lockpadBase").click(function() {
      $("#lockpadOpen").toggle();
      $("#lockpadClosed").toggle();

      if (lockpadIsOpen == 1) {lockpadIsOpen=0; makeUndraggable();}
      else { lockpadIsOpen=1; makeDraggable();}
    }); // end sliderButton.click
    
    
    $("#buttonPlus").click(function() {
      if (lockpadIsOpen == 1) {
        xPosNum = getXPos();
        
        if (xPosNum < 187) {
          xPosNum++; // new location of slider
          $("#sliderButton").css("left", xPosNum);
          calculateMagnification();
        } // end if()
      ;}
    }); // end buttonPlus.click
    
    
    $("#buttonMinus").click(function() {
      if (lockpadIsOpen == 1) {
        xPosNum = getXPos();
        
        if (xPosNum > 0) {
          xPosNum--; // new location of slider
          $("#sliderButton").css("left", xPosNum);
          calculateMagnification();
        } // end if()
      ;}
    }); // end buttonMinus.click

  }); // end jQuery

  ////////////////////////////////////////////////////
  /////     end $(document).ready(function(){    /////
  ////////////////////////////////////////////////////