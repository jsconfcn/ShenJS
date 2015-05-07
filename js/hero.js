'use strict';
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
        scrollTop = $('body').scrollTop(),
        w_width = $(window).width();
      if (w_width >= 768) {
        if (scrollTop >= header) {
          menu.addClass('sticky');
        } else {
          menu.removeClass('sticky');
        }
      }else {
        return false;
      }
    }
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
  $(window).resize(function() {
    center();
    sticky();
  })
  $(window).scroll(function() {
    sticky();
  })
});
