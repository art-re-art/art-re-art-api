from django.db import models
from django.core.exceptions import ValidationError


class About(models.Model):
    title = models.CharField(max_length=255)
    website = models.URLField(max_length=255)
    description = models.TextField()

    class Meta:
        verbose_name = "about"
        verbose_name_plural = "about"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if About.objects.exists() and not self.pk:
            raise ValidationError(
                "Only one About object can be created, please update the existing object."
            )
        return super().save(*args, **kwargs)

    @property
    def developer_list(self):
        if self.developers.exists():
            return ", ".join([developer.name for developer in self.developers.all()])

    @property
    def organizers_list(self):
        if self.organizers.exists():
            return ", ".join([organizers.name for organizer in self.organizers.all()])


class AboutOrganizer(models.Model):
    about = models.ForeignKey(
        to="about.About", on_delete=models.CASCADE, related_name="organizers"
    )
    name = models.CharField(max_length=255)
    website = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name


class AboutDeveloper(models.Model):
    about = models.ForeignKey(
        to="about.About", on_delete=models.CASCADE, related_name="developers"
    )
    name = models.CharField(max_length=255)
    website = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name


class AboutFAQ(models.Model):
    about = models.ForeignKey(
        to="about.About", on_delete=models.CASCADE, related_name="faqs"
    )
    question = models.CharField(max_length=255)
    answer = models.TextField()
    is_mobile = models.BooleanField(default=True)

    def __str__(self):
        return self.question

    class Meta:
        verbose_name = "About FAQ"
        verbose_name_plural = "About FAQs"
