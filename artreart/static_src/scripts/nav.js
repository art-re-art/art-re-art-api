$(document).ready(function() {
  // scroll
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      if (!$('.navbar').hasClass('navbar--scrolled')) {
        $('.navbar').addClass('navbar--scrolled');
        // $('.navbar-brand .logo, .navbar-brand small').fadeOut(350);
        $('.navbar-brand .logo').fadeOut(350);
      }
    } else {
      if ($('.navbar').hasClass('navbar--scrolled')) {
        $('.navbar').removeClass('navbar--scrolled');
        // $('.navbar-brand .logo, .navbar-brand small').fadeIn(350);
        $('.navbar-brand .logo').fadeIn(350);
      }
    }
  });

  // menu
  $('.hamburger').on('click', function() {
    $(this).toggleClass('hamburger--clicked');
    $('#menu').slideToggle(350);
    if ($(this).hasClass('hamburger--clicked')) {
      $('body').css('overflow', 'hidden');
      $('.navbar').addClass('navbar--opened');
      // $('.navbar-brand .logo, .navbar-brand small').fadeOut(350);
      $('.navbar-brand .logo').fadeOut(350);
    } else {
      $('body').css('overflow', 'auto');
      $('.navbar').removeClass('navbar--opened');
      // $('.navbar-brand .logo, .navbar-brand small').fadeIn(350);
      $('.navbar-brand .logo').fadeIn(350);
    }
  });
});
