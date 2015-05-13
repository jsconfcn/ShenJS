$(function() {
  /* hero height*/
  function center() {
      var header = $('#header-new');
      if (header.length) {
        // Reset for calculations
        header.css({
          'height': ''
        });
        // Apply our magic
        var viewport = $(window).height();
        var position = header.offset();
        header.css({
          'height': viewport
        });
      }
    }
    /* scroll */
  function scrollEffect() {
      var link = $('div.menu a'),
        body = $('html, body');
      link.click(function() {
        // $(this).addClass('active').siblings().removeClass('active');
        body.animate({
          scrollTop: $($.attr(this, 'href')).offset().top
        }, 600);
        return false;
      });
    }
    /* Sticky */
  function sticky() {
    var header = $('#header-new').height() - $('#header-new div.menu').height(),
      menu = $('#header-new div.menu'),
      w_width = $(window).width(),
      scrollPos;
    if (typeof window.pageYOffset != 'undefined') {
      scrollPos = window.pageYOffset; //Netscape
    } else if (typeof document.compatMode != 'undefined' &&
      document.compatMode != 'BackCompat') {
      scrollPos = document.documentElement.scrollTop; //FirefoxéŠ†ä¸†hrome
    } else if (typeof document.body != 'undefined') {
      scrollPos = document.body.scrollTop; //IE
    }
    if (w_width >= 800) {
      if (scrollPos >= header) {
        menu.addClass('sticky');
      } else {
        menu.removeClass('sticky');
      }
    } else {
      menu.removeClass('sticky');
    }
  }

  /* Timeline */
  // function timeline() {
  //     var time = $('.timeline li'),
  //       active_time = $('.timeline li.active'),
  //       line = $('.timeline .line'),
  //       b_width = $('.timeline .wrapper').width();
  //     line.css({
  //       left: active_time.offset().left + (b_width * 0.125)
  //     }, 300).show();
  //     time.hover(function() {
  //       $(this).addClass('active').siblings().removeClass('active');
  //       line.stop().animate({
  //         left: $(this).offset().left + (b_width * 0.125)
  //       }, 300).show();
  //     }, function() {
  //       time.removeClass('active');
  //       line.hide();
  //     })
  //   }
  /* arrow */

  $('.arrow').click(function() {
    if ($(this).hasClass('register')) {
      $('html,body').stop().animate({
        scrollTop: $('#register').offset().top
      }, 300);
    } else if ($(this).hasClass('down')) {
      $('html,body').stop().animate({
        scrollTop: $('.action').offset().top
      }, 300);
    }
  });

  /* function */
  center();
  scrollEffect();
  sticky();
  //timeline();
  $(window).resize(function() {
    center();
    sticky();
    //timeline();
  })
  $(window).scroll(function() {
    sticky();
  })
});
