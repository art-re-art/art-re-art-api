from rest_framework import serializers

from about.models import About, AboutDeveloper, AboutFAQ


class AboutFAQSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AboutFAQ
        fields = ("is_mobile", "question", "answer")


class AboutDeveloperSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AboutDeveloper
        fields = ("name", "website")


class AboutSerializer(serializers.HyperlinkedModelSerializer):
    faqs = AboutFAQSerializer(many=True, read_only=True)
    developers = AboutDeveloperSerializer(many=True, read_only=True)

    class Meta:
        model = About
        fields = ("url", "id", "title", "website", "description", "faqs", "developers")
