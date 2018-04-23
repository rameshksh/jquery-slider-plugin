

(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"pointer"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {

            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;

            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
                $('.draggable').offset({                    
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection

        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });
    }
})(jQuery);

(function ($) {

    var sliderHTML = `<div class="slider">      
                        <div>
                              <span id="minValue"></span>
                              <span id="maxValue"></span>
                        </div>
                        <div class="slider-panel"> 
                            <span class="left-slider"><i class="far fa-circle"></i></span>
                            <span id="thresholdValue"></span>
                            <span class="right-slider"><i class="far fa-circle"></i></span>
                        </div>
                    </div>`;

    $.fn.basicSlider = function (config) {
        this.html(sliderHTML);
        var minValue = 0, maxValue = 0;

        var obj = {
            min : 0,
            max : 100
        }

        $('.left-slider').drags().on("mouseup", function(e) {
            minValue = minValue + 10;
            $('#minValue').html(minValue);
        });

        $('.right-slider').drags().on("mouseup", function(e) {
            maxValue = maxValue - 10;
            $('#maxValue').html(maxValue);
        });

        this.find('.left-slider').click(function(){

        });

        function setDefault() {
            $('.slider #minValue').html(0);
            $('.slider #maxValue').html(100);
        }

        setDefault();

        return this;
    };


}(jQuery));