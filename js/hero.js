$(function() {
  function center(){
    var hero = $('body.page-front #content .hero');
    if (hero.length) {
      // Reset for calculations
      hero.css({ 'height': '' });
      // Apply our magic
      var viewport = $(window).height();
      var position = hero.offset();
      hero.css({
        'height': (viewport - position.top),
        'min-height': hero.height()
      });
    }
  }
  function scrollto(){
    $('.arrow').click(function(){
      $("html,body").stop().animate({scrollTop: $(window).height()},500);
    })
  }
  center();
  scrollto();
  $(window).resize(center);
});