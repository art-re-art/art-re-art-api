from django.contrib import admin
from django.utils.html import mark_safe

from .models import (
    HuntItem,
)

@admin.register(HuntItem)
class HuntItemAdmin(admin.ModelAdmin):
    list_display = ["_order", "question", "answer", "answer_type"]
    sortable_field_name = "_order"
