from django.db import models, transaction
from django.conf import settings
from django.core.mail import send_mail

import requests


class HuntItem(models.Model):
    DROPDOWN_CHOICES = {
        ('int', 'Integer'),
        ('str', 'String'),
        ('qr', 'QR Code'),
    }
    _order = models.PositiveSmallIntegerField(default=100, blank=True, null=True)
    question = models.CharField(max_length=255)
    answer = models.CharField(null=True, max_length=255)
    answer_type = models.CharField(choices=DROPDOWN_CHOICES, null=True, max_length=255)

    class Meta:
        ordering = ["_order"]

    def __str__(self):
        return self.question
