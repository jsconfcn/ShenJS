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
  center();
  $(window).resize(center);
});