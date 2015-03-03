$(function() {
  function center(){
    var header = $('#header');
    if (header.length) {
      // Reset for calculations
      header.css({ 'height': '' });
      // Apply our magic
      var viewport = $(window).height();
      var position = header.offset();
      header.css({
        'height': viewport
      });
    }
  }
  function firstlaunch(){
      $('#header').css({'position':'relative'});
      $('#content').css({'padding':'0'});
  }
  $('.arrow').click(function(){
    if($(this).hasClass('register')){
      $('html,body').stop().animate({scrollTop: $('#register').offset().top },300);
      console.log($('#register').offset().top);

    }else if($(this).hasClass('down')){
      $('html,body').stop().animate({scrollTop: $(window).height()},300);
    }
  });
  center();
  firstlaunch();
  $(window).resize(center);
});