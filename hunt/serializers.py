from rest_framework import serializers

from hunt.models import Hunt, HuntItem


class HuntItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = HuntItem
        fields = ("id", "_order", "question", "answer_type", "answer")


class HuntSerializer(serializers.HyperlinkedModelSerializer):
    items = HuntItemSerializer(many=True, read_only=True)

    class Meta:
        model = Hunt
        fields = ("url", "id", "event", "items")
