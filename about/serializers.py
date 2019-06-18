from rest_framework import serializers

from about.models import About, AboutOrganizer, AboutDeveloper, AboutFAQ


class AboutFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutFAQ
        fields = ("is_mobile", "question", "answer")


class AboutOrganizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutOrganizer
        fields = ("name", "website")


class AboutDeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutDeveloper
        fields = ("name", "website")


class AboutSerializer(serializers.HyperlinkedModelSerializer):
    faqs = AboutFAQSerializer(many=True, read_only=True)
    developers = AboutDeveloperSerializer(many=True, read_only=True)
    organizers = AboutDeveloperSerializer(many=True, read_only=True)

    class Meta:
        model = About
        fields = ("url", "title", "website", "description", "faqs", "developers", "organizers")
