$(function() {
  var url = window.location.pathname.replace(/\/$/, '');
  $('a').each(function(){
    var href= $(this).attr('href');
    var match = new RegExp("^"+ href.replace(/\/$/, ''), 'i');
    if (match.test(url)) {
      $(this).addClass('active');
    }
  });
});