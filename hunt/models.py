from django.db import models


class Hunt(models.Model):
    event = models.OneToOneField("events.Event", related_name="hunt")

    def __str__(self):
        return f"{self.event.title} Scavenger Hunt"


class HuntItem(models.Model):
    DROPDOWN_CHOICES = {("int", "Integer"), ("str", "String"), ("qr", "QR Code")}

    _order = models.PositiveSmallIntegerField(default=100, blank=True, null=True)
    hunt = models.ForeignKey("hunt.Hunt", related_name="items")
    question = models.CharField(max_length=255)
    answer_type = models.CharField(choices=DROPDOWN_CHOICES, max_length=255)
    answer = models.CharField(max_length=255)

    class Meta:
        ordering = ["_order"]

    def __str__(self):
        return self.question
