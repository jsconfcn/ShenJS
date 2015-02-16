$(function() {
  function center(){
    var header = $('body.page-front #header');
    if (header.length) {
      // Reset for calculations
      header.css({ 'height': '' });
      // Apply our magic
      var viewport = $(window).height();
      var position = header.offset();
      header.css({
        'height': (viewport - position.top),
        'min-height': header.height()
      });
    }
  }
  function firstlaunch(){
      $('#header').css({'position':'relative'});
      $('#content').css({'padding':'0'});
  }
  
  $('.arrow').click(function(){
    $('html,body').stop().animate({scrollTop: $(window).height()},300);
  });
  center();
  firstlaunch();
  $(window).resize(center);
  
});