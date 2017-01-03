(function ($, window, document, undefined) {

  var defaults = {
    width: 300,
    height: 150,
    lineWidth: 20,
    sourceImage: '',
    destinationImage: ''
  };

  function Scratchcard(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, defaults, options);
    this.isScratching = false;

    this.init();
  }

  Scratchcard.prototype = {
    init: function () {
      var options = this.options,
          sourceImage = new Image();

      this.$element.html('');

      var destinationImage = document.createElement("img");
      destinationImage.src = options.destinationImage;
      destinationImage.width = options.width;
      destinationImage.height = options.height;
      this.$element.append(destinationImage);

      var canvas = document.createElement("canvas");
      canvas.width = options.width;
      canvas.height = options.height;
      this.$element.append(canvas);

      this.canvas = this.$element.find('canvas');
      this.context = this.canvas[0].getContext('2d');

      this.context.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);

      var context = this.context;
      sourceImage.src = options.sourceImage;
      sourceImage.onload = function () {
        context.drawImage(sourceImage, 0, 0, options.width, options.height);
        context.globalCompositeOperation = "destination-out";
      };

      this.context.lineJoin = "round";
      this.context.lineWidth = this.options.lineWidth;

      this.offsetxy = this.canvas.offset();

      document.body.addEventListener('touchmove', function (event) {event.preventDefault();}, true);

      this.canvas.on({
        'mousedown': $.proxy(this.eventDown, this),
        'mousemove': $.proxy(this.eventMove, this),
        'mouseup': $.proxy(this.eventUp, this),

        'touchstart': $.proxy(this.eventDown, this),
        'touchmove': $.proxy(this.eventMove, this),
        'touchend': $.proxy(this.eventUp, this)
      });
    },
    eventDown: function (e) {
      var context = this.context;
      context.beginPath();

      var x = (e.type === 'touchstart' ? e.touches[0].pageX : e.pageX) - this.offsetxy.left;
      var y = (e.type === 'touchstart' ? e.touches[0].pageY : e.pageY) - this.offsetxy.top;
      context.moveTo(x, y);

      this.isScratching = true;
    },
    eventMove: function (e) {
      var context = this.context;
      if (!this.isScratching) {
        return;
      }

      var x = (e.type === 'touchmove' ? e.touches[0].pageX : e.pageX) - this.offsetxy.left;
      var y = (e.type === 'touchmove' ? e.touches[0].pageY : e.pageY) - this.offsetxy.top;
      context.lineTo(x, y);

      context.stroke();
    },
    eventUp: function () {
      this.isScratching = false;
    }
  };

  $.fn.scratchcard = function (options) {
    return this.each(function () {
      if (!$.data(this, 'scratchcard')) {
        $.data(this, 'scratchcard',
            new Scratchcard(this, options));
      }
    });
  };

})(Zepto, window, document);
