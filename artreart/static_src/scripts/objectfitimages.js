// object-fit-images
// Fix for IE 11 using object-fit in css on images

import objectFitImages from 'object-fit-images';

$(document).on('ready turbolinks:load', function() {
  objectFitImages();
});
