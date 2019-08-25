from django.contrib import admin

from grappelli.forms import GrappelliSortableHiddenMixin
import nested_admin

from .models import Hunt, HuntItem


class HuntItemeInline(GrappelliSortableHiddenMixin, nested_admin.NestedStackedInline):
    model = HuntItem
    extra = 0
    sortable_field_name = "_order"
    fields = ("question", ("answer_type", "answer"), "_order")


@admin.register(Hunt)
class HuntAdmin(nested_admin.NestedModelAdmin):
    list_display = ["event", "number_of_items"]
    inlines = [HuntItemeInline]
    fields = ("event",)

    def number_of_items(self, obj):
        return str(obj.items.count())
