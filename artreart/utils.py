from sorl.thumbnail import get_thumbnail


def create_thumbnails(original_image):
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
