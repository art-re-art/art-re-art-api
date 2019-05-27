$(document).ready(function() {
  // scroll
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      if (!$('.navbar').hasClass('navbar--scrolled')) {
        $('.navbar').addClass('navbar--scrolled');
      }
    } else {
      if ($('.navbar').hasClass('navbar--scrolled')) {
        $('.navbar').removeClass('navbar--scrolled');
      }
    }
  });

  // menu
  $('#hamburger').on('click', function() {
    $(this).toggleClass('hamburger--clicked');
    $('#menu').slideToggle(350);
    if ($(this).hasClass('hamburger--clicked')) {
      $('body').css('overflow', 'hidden');
      $('.navbar').addClass('navbar--opened');
      $('#hamburgerOpen').hide();
      $('#hamburgerClose').show();
    } else {
      $('body').css('overflow', 'auto');
      $('.navbar').removeClass('navbar--opened');
      $('#hamburgerOpen').show();
      $('#hamburgerClose').hide();
    }
  });
});
