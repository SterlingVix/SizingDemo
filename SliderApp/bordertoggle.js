SizingChart.prototype.bordersButton = document.getElementsByClassName('borders-on-button')[0];
SizingChart.prototype.bordersToggle();

SizingChart.prototype.bordersToggle = function () {
    var _this = this;
    
    _this.bordersButton.addEventListener('click', function(event) {
        var bodyClass = document.body.className;
        
        if (bodyClass === "borders-on") {
            document.body.className = "";
        } else {
            document.body.className = "borders-on";
        }
    }); // end addEventListener()
}; // end bordersToggle()
