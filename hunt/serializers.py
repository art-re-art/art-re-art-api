from rest_framework import serializers

from hunt.models import HuntItem


class HuntItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = HuntItem
        fields = ("_order", "question", "answer", "answer_type")
