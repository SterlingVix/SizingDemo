var SizingChart = function () {
    /**
     * DOM Elements
     *
     *   Horizontal Slider Measuring Container
     *     Horizontal Measuring Slider
     *     Horizontal Measuring Slider Value
     *   Horizontal Slider Calibration Container
     *     Horizontal Calibration Slider
     *     Horizontal Calibration Slider Value
     *   Vertical Slider
     *
     *   Left & Right Arrows
     *   Tip Size Text
     *   Wide sliding Background
     *
     *   Vertical Slider Container
     *   Shape Selector Thumbnail Container
     *     Shape Buttons
     *
     *
     *   Resizable Elements
     *     Calibration Elements & Number (length)
     *     Measuring Elements & Number (length)
     *
     *
     **/    
    this.horizontalSliderMeasureContainer = document.getElementById('slider-horizontal-container-measure');
    this.horizontalSliderMeasure = document.getElementById('slider-horizontal-measure');
    this.horizontalSliderMeasureValue = this.horizontalSliderMeasure.value;

    this.horizontalSliderCalibrateContainer = document.getElementById('slider-horizontal-container-calibrate');
    this.horizontalSliderCalibrate = document.getElementById('slider-horizontal-calibrate');
    this.horizontalSliderCalibrateValue = this.horizontalSliderMeasure.value;

    this.verticalSlider = document.getElementById('slider-vertical');
    this.verticalSliderValue = this.verticalSlider.value;
    this.verticalSliderTextOutput = document.getElementById('text-vertical-slider');

    this.verticalScaleWrappers = document.getElementsByClassName('vertical-scale-wrapper');
    this.NumberOfVerticalScaleElements = this.verticalScaleWrappers.length;


    this.arrows = document.getElementsByClassName('clickable');
//    this.leftArrow = document.getElementById('svg-left-arrow');
    this.leftArrow = document.getElementById('left-arrow-position-container');
//    this.rightArrow = document.getElementById('svg-right-arrow');
    this.rightArrow = document.getElementById('right-arrow-position-container');

    this.sizeNumbersDisplayed = document.getElementsByClassName('text-ht-size');
    this.sizeUShapedNumberDisplayed = document.getElementById('text-ht-size-u');
    this.sizeRoundNumberDisplayed = document.getElementById('text-ht-size-round');

    this.wideBackground = document.getElementsByClassName('sizing-chart-wide-background')[0];
    this.tipsView = document.getElementById('tips-view');
    //    this.wideBackgroundLength = (this.wideBackground.getBoundingClientRect()).width;
    //    this.wideBackgroundLength = parseInt(this.wideBackgroundLength / 2) + 1;



    this.verticalSliderContainer = document.getElementById('slider-vertical-container');
    this.shapeSelectorThumbnailContainer = document.getElementById('shape-selector-thumbnail-container');

    this.shapeButtons = {};
    this.shapeButtons.u = document.getElementById('thumbnail-u');
    this.shapeButtons.round = document.getElementById('thumbnail-round');
    this.shapeButtons.ellipse = document.getElementById('thumbnail-ellipse');
    this.shapeButtons.rectangle = document.getElementById('thumbnail-rectangle');

    this.instructions1 = document.getElementById('instructions-1');
    this.instructions2 = document.getElementById('instructions-2');

    /**
     * Views on vertical sliding #tips-view :
     *   current-view-u
     *   current-view-round
     *   current-view-ellipse
     *   current-view-rectangle
     **/
    this.shapeViews = {};
    this.shapeViews.u = document.getElementById('current-view-u');
    this.shapeViews.round = document.getElementById('current-view-round');
    this.shapeViews.ellipse = document.getElementById('current-view-ellipse');
    this.shapeViews.rectangle = document.getElementById('current-view-rectangle');



    this.resizableElements = document.getElementsByClassName('resizable-element');
    this.numberOfResizableElements = this.resizableElements.length;
    this.calibrationElements = document.getElementsByClassName('calibration-element');
    this.numberOfCalibrationElements = this.calibrationElements.length;
    this.measuringElements = document.getElementsByClassName('measuring-element');
    this.numberOfMeasuringElements = this.measuringElements.length;

    this.measurableUShapedTip = document.getElementById('svg-u-shaped-tip');
    this.measurableRoundTip = document.getElementById('svg-round-tip');
    /**
     * Data Control
     *   chartState
     *   firstTimeClickingArrow
     *   heelTipShape
     *
     *   scaleX &  scaleY
     *
     *   selectionValueX & selectionValueY
     *
     **/
    this.chartState = 'calibrate'; // 'calibrate' || 'measure'
    this.firstTimeClickingArrow = true;
    this.currentMeasureView = 'current-view-u'; // 'current-view-u', 'current-view-round', 'current-view-rectangle', 'current-view-ellipse'
    this.verticalTransformText;
    this.calibrationTransformText;
    this.measuringTransformText;

    this.scaleX;
    this.scaleY;
    this.selectionValueX;
    this.selectionValueY;

    /**
     * Function Invocations
     *   bindMeasuringSlider(sliderElement, elementAffected)
     *   bindArrows()
     *   bindMeasurementSlider(sliderElement) ???????
     *   calibrateVertical(sliderElement)
     *
     *
     *
     **/
    this.bindArrows();
    this.bindCalibrationSlider(this.horizontalSliderCalibrate, this.verticalSliderTextOutput);
    this.bindVerticalSlider(this.verticalSlider, this.verticalSliderTextOutput);
//    this.bindMeasuringSlider(this.horizontalSliderMeasure, this.sizeNumbersDisplayed);
    this.bindMeasuringSlider(this.horizontalSliderMeasure);
    

    this.bindButtons();

    console.log(this);
}; // end SizingChart();

SizingChart.prototype.bindVerticalSlider = function (verticalSliderElement, sliderValueText) {
    var _this = this;

    verticalSliderElement.oninput = function () {
        // Updates text output
        _this.verticalTransformText = "scaleY(" + (this.value / 100) + ")";

//        for (var i = 0; i < sliderValueText.length; i++) {
//            sliderValueText[i].innerHTML = Math.round(this.value);
            sliderValueText.textContent = this.value;
//        }

        for (var i = 0; i < _this.NumberOfVerticalScaleElements; i++) {
            _this.verticalScaleWrappers[i].style['transform'] = _this.verticalTransformText;
            _this.verticalScaleWrappers[i].style['-webkit-transform'] = _this.verticalTransformText;
            _this.verticalScaleWrappers[i].style['webkitTransform'] = _this.verticalTransformText;
            _this.verticalScaleWrappers[i].style['WebkitTransform'] = _this.verticalTransformText;
        } // end for(each measuring element)
    }; // end verticalSliderElement.oninput()
} // end bindVerticalSlider

/**
 * Calibration Slider is the global resizing slider
 **/
SizingChart.prototype.bindCalibrationSlider = function (calibrationSliderElement, sliderValueText) {
    var _this = this;
    
    /*
    _this.horizontalSliderCalibrateContainer; // document.getElementById('slider-horizontal-container-calibrate');
    _this.horizontalSliderCalibrate; // document.getElementById('slider-horizontal-calibrate');
    _this.horizontalSliderCalibrateValue; // this.horizontalSliderMeasure.value;
    */

    calibrationSliderElement.oninput = function () {
        // Updates text output
        _this.calibrationTransformText = "scale(" + (this.value / 100) + ")";

//        for (var i = 0; i < sliderValueText.length; i++) {
//            sliderValueText[i].innerHTML = Math.round(this.value);
//            sliderValueText.textContent = this.value;
//        }

        for (var i = 0; i < _this.NumberOfVerticalScaleElements; i++) {
            _this.calibrationElements[i].style['transform'] = _this.calibrationTransformText;
            _this.calibrationElements[i].style['-webkit-transform'] = _this.calibrationTransformText;
            _this.calibrationElements[i].style['webkitTransform'] = _this.calibrationTransformText;
            _this.calibrationElements[i].style['WebkitTransform'] = _this.calibrationTransformText;
        } // end for(each measuring element)
    }; // end calibrationSliderElement.oninput()
} // end bindCalibrationSlider

//SizingChart.prototype.bindMeasuringSlider = function (sliderElement, arrayOfelementsToUpdate) {
SizingChart.prototype.bindMeasuringSlider = function (sliderElement) {
    var _this = this;

    sliderElement.oninput = function () {
        // Updates text output
        _this.measuringTransformText = "scale(" + (this.value / 10) + ")";
        debugger;
        /**
         * NOTE: replacing this w/ explicit references to elements, since there are only 2...
         * for (var i = 0; i < arrayOfelementsToUpdate.length; i++) {
         *     arrayOfelementsToUpdate[i].innerHTML = Math.round(this.value);
         * }
         **/
        _this.sizeUShapedNumberDisplayed.innerHTML = Math.round(this.value);
        _this.measurableUShapedTip.style['transform'] = _this.measuringTransformText;
        _this.measurableUShapedTip.style['-webkit-transform'] = _this.measuringTransformText;
        _this.measurableUShapedTip.style['webkitTransform'] = _this.measuringTransformText;
        _this.measurableUShapedTip.style['WebkitTransform'] = _this.measuringTransformText;
            
        if (this.value < 146) {
            _this.sizeRoundNumberDisplayed.innerHTML = Math.round(this.value);            
            _this.measurableRoundTip.style['transform'] = _this.measuringTransformText;
            _this.measurableRoundTip.style['-webkit-transform'] = _this.measuringTransformText;
            _this.measurableRoundTip.style['webkitTransform'] = _this.measuringTransformText;
            _this.measurableRoundTip.style['WebkitTransform'] = _this.measuringTransformText;
        } else {
            _this.sizeRoundNumberDisplayed.innerHTML = 'Sorry, 14mm is our largest size.';
        }
            
            
            
            
            
//        for (var i = 0; i < _this.numberOfMeasuringElements; i++) {
//            _this.measuringElements[i].style['transform'] = _this.measuringTransformText;
//            _this.measuringElements[i].style['-webkit-transform'] = _this.measuringTransformText;
//            _this.measuringElements[i].style['webkitTransform'] = _this.measuringTransformText;
//            _this.measuringElements[i].style['WebkitTransform'] = _this.measuringTransformText;
//        } // end for(each measuring element)
        //        _this.resizableElements.width++;
        //        console.log(_this.resizableElements);
    }; // end sliderElement.oninput()
}; // end bindMeasuringSlider



SizingChart.prototype.bindArrows = function () {
    var _this = this;

    // Revealing the measure view
    _this.leftArrow.addEventListener('click', function (event) {
        _this.chartState = 'measure'; // track that we're in the tips measuring state

        if (_this.firstTimeClickingArrow) {
            _this.firstTimeClickingArrow = false;
            _this.wideBackground.setAttribute('class', (_this.wideBackground.getAttribute('class') + ' moving-left'));
        } else {
            var classString = _this.wideBackground.getAttribute('class');
            _this.wideBackground.setAttribute('class', classString.replace(/moving-right/, 'moving-left'));
        }

        _this.makeTransparent(_this.horizontalSliderCalibrateContainer);
        _this.makeTransparent(_this.verticalSliderContainer);
        _this.makeTransparent(_this.instructions1);
        _this.makeOpaque(_this.horizontalSliderMeasureContainer);
        _this.makeOpaque(_this.shapeSelectorThumbnailContainer);
        _this.makeOpaque(_this.instructions2);
    }); // end addEventListener

    // Revealing the calibration view
    _this.rightArrow.addEventListener('click', function (event) {
        _this.chartState = 'calibrate'; // track that we're in the calibration state

        var classString = _this.wideBackground.getAttribute('class');
        _this.wideBackground.setAttribute('class', classString.replace(/moving-left/, 'moving-right'));

        _this.makeTransparent(_this.horizontalSliderMeasureContainer);
        _this.makeTransparent(_this.shapeSelectorThumbnailContainer);
        _this.makeTransparent(_this.instructions2);
        _this.makeOpaque(_this.horizontalSliderCalibrateContainer);
        _this.makeOpaque(_this.verticalSliderContainer);
        _this.makeOpaque(_this.instructions1);
    }); // end addEventListener
}; // end bindArrows()

SizingChart.prototype.calibrateVertical = function (sliderElement) {
    var _this = this;
}; // end calibrateVertical()

SizingChart.prototype.makeTransparent = function (element) {
//    for (var i = 0; i < arguments.length; i++) {
//        var currentClassString = arguments[i].getAttribute('class');
//        arguments[i].setAttribute('class', (currentClassString.replace(/opaque/, 'transparent')));
//    }
    var currentClassString = element.getAttribute('class');
    return element.setAttribute('class', (currentClassString.replace(/opaque/, 'transparent')));
}; // end makeTransparent()

SizingChart.prototype.makeOpaque = function (element) {
//    for (var i = 0; i < arguments.length; i++) {
//        var currentClassString = arguments[i].getAttribute('class');
//        arguments[i].setAttribute('class', (currentClassString.replace(/transparent/, 'opaque')));
//    }
    var currentClassString = element.getAttribute('class');
    return element.setAttribute('class', (currentClassString.replace(/transparent/, 'opaque')));
}; // end makeOpaque()

SizingChart.prototype.replaceClassValue = function (element, stringToBeReplaced, replacingString) {
    var regex = new RegExp(stringToBeReplaced);

    var currentClassString = element.getAttribute('class');
    return element.setAttribute('class', (currentClassString.replace(regex, replacingString)));
}; // end makeTransparent()









//SizingChart.prototype.bindButtons = function (currentShape) {
SizingChart.prototype.bindButtons = function () {
    var _this = this;


    document.getElementById('thumbnail-u').addEventListener('click', function (event) {
        if (_this.currentMeasureView !== event.target.dataset.shape) {
            _this.replaceClassValue(_this.tipsView, _this.currentMeasureView, event.target.dataset.shape);
            _this.currentMeasureView = event.target.dataset.shape;
        } // end if(currentMeasureView !== event.target.dataset.shape)
        else {
            console.log("_this.currentMeasureView is already " + event.target.dataset.shape);
        }
    }); // end addEventListener(U thumbnail)



    document.getElementById('thumbnail-round').addEventListener('click', function (event) {
        if (_this.currentMeasureView !== event.target.dataset.shape) {
            _this.replaceClassValue(_this.tipsView, _this.currentMeasureView, event.target.dataset.shape);
            _this.currentMeasureView = event.target.dataset.shape;
        } // end if(currentMeasureView !== event.target.dataset.shape)
        else {
            console.log("_this.currentMeasureView is already " + event.target.dataset.shape);
        }
    }); // end addEventListener(Round thumbnail)



    document.getElementById('thumbnail-ellipse').addEventListener('click', function (event) {
        if (_this.currentMeasureView !== event.target.dataset.shape) {
            _this.replaceClassValue(_this.tipsView, _this.currentMeasureView, event.target.dataset.shape);
            _this.currentMeasureView = event.target.dataset.shape;
        } // end if(currentMeasureView !== event.target.dataset.shape)
        else {
            console.log("_this.currentMeasureView is already " + event.target.dataset.shape);
        }
    }); // end addEventListener(Ellipse thumbnail)



    document.getElementById('thumbnail-rectangle').addEventListener('click', function (event) {
        if (_this.currentMeasureView !== event.target.dataset.shape) {
            _this.replaceClassValue(_this.tipsView, _this.currentMeasureView, event.target.dataset.shape);
            _this.currentMeasureView = event.target.dataset.shape;
        } // end if(currentMeasureView !== event.target.dataset.shape)
        else {
            console.log("_this.currentMeasureView is already " + event.target.dataset.shape);
        }
    }); // end addEventListener(Rectangle thumbnail)









    //    var allShapes = _this.shapeViews.keys();
    //    for (var shape in _this.shapeViews) {
    //        if (shape === currentShape) {
    //            _this.shapeViews[shape].makeOpaque();
    //        } else {
    //            _this.shapeButtons[shape].makeTransparent();
    //        }
    //    } // end for(shapes in _this.shapeButtons)



}; // end bindButtons()

// TODO: abstract bindButtons functions here.
//SizingChart.prototype.shapesSelector = function (event) {
//    var _this = this;
//    if (_this.currentMeasureView !== event.target.dataset.shape) {
//        _this.replaceClassValue(_this.tipsView, _this.currentMeasureView, event.target.dataset.shape);
//        _this.currentMeasureView = event.target.dataset.shape;
//    } // end if(currentMeasureView !== event.target.dataset.shape)
//    else {
//        console.log("_this.currentMeasureView is already " + event.target.dataset.shape);
//    }
//};



/**
 * Views on vertical sliding #tips-view :
 *   current-view-u
 *   current-view-round
 *   current-view-ellipse
 *   current-view-rectangle
 **/



//
//    _this.leftArrow.addEventListener('click', function (event) {
//        _this.chartState = 'measure'; // track that we're in the tips measuring state
//
//        if (_this.firstTimeClickingArrow) {
//            _this.firstTimeClickingArrow = false;
//            _this.wideBackground.setAttribute('class', (_this.wideBackground.getAttribute('class') + ' moving-left'));
//        } else {
//            var classString = _this.wideBackground.getAttribute('class');
//            _this.wideBackground.setAttribute('class', classString.replace(/moving-right/, 'moving-left'));
//        }
//
//        _this.makeTransparent(_this.horizontalSliderCalibrateContainer);
//        _this.makeTransparent(_this.verticalSliderContainer);
//        _this.makeTransparent(_this.instructions1);
//        _this.makeOpaque(_this.horizontalSliderMeasureContainer);
//        _this.makeOpaque(_this.shapeSelectorThumbnailContainer);
//        _this.makeOpaque(_this.instructions2);
//    }); // end addEventListener


