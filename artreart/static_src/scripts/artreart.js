$(document).ready(function() {
  // change href # to none
  $("a[href='#']").click(function(event) {  // eslint-disable-line
    event.preventDefault();
  });

  // for any tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // for any popovers
  $('[data-toggle="popover"]').popover()

  // hide slick slider dots if only one slide
  $('.slick-dots li:only-child').closest('.slider__controls').hide();
});
