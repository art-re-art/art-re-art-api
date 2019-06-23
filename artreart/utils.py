from io import BytesIO

from sorl.thumbnail import get_thumbnail
import qrcode


def create_qrcode_thumbnails(original_image):
    """ Create qrcode thumbnails
    Generates a thumbnail specifically for qrcodes and their requirements, this isn't
    exactly needed but it create consistency in URLs.
    """
    thumbnail_kwargs = {"format": "PNG"}
    sizes = {"small": "64x64", "medium": "256x256", "large": "490x490"}
    images = {}
    for size, resolution in sizes.items():
        if size == "square":
            thumbnail = get_thumbnail(
                original_image, resolution, crop="center center", **thumbnail_kwargs
            )
        else:
            thumbnail = get_thumbnail(original_image, resolution, **thumbnail_kwargs)
        images[size] = {}
        images[size]["url"] = thumbnail.url
        try:
            images[size]["width"] = thumbnail.width
            images[size]["height"] = thumbnail.height
        except TypeError:  # NOTE: Happens when thumbnail isn't really made yet
            pass
    return images


def create_qrcode(data):
    """ Create qrcode
    Generates a qrcode image for the given data, returns an image object
    """
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_Q,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    buffer = BytesIO()
    img.save(buffer)
    return buffer


def create_thumbnails(original_image):
    """ Create thumbnails
    Generates a set of thumbnails for a vareity of situations, makes sure images are
    progressive, JPEG files with the proper orientation. Returns a dict of image urls
    with their sizes.
    """
    thumbnail_kwargs = {
        "format": "JPEG",
        "progressive": True,
        "orientation": True,
        "quality": 95,
        "upscale": True,
    }
    sizes = {
        "square": "640x640",
        "small": "640x360",
        "medium": "1280x720",
        "large": "1920x1080",
    }
    images = {}
    for size, resolution in sizes.items():
        if size == "square":
            thumbnail = get_thumbnail(
                original_image, resolution, crop="center center", **thumbnail_kwargs
            )
        else:
            thumbnail = get_thumbnail(original_image, resolution, **thumbnail_kwargs)
        images[size] = {}
        images[size]["url"] = thumbnail.url
        try:
            images[size]["width"] = thumbnail.width
            images[size]["height"] = thumbnail.height
        except TypeError:  # NOTE: Happens when thumbnail isn't really made yet
            pass
    return images
