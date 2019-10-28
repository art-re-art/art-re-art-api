# Generated by Django 2.2.4 on 2019-08-25 16:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [("events", "0011_event_slug")]

    operations = [
        migrations.CreateModel(
            name="Hunt",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "event",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="hunt",
                        to="events.Event",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="HuntItem",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "_order",
                    models.PositiveSmallIntegerField(
                        blank=True, default=100, null=True
                    ),
                ),
                ("question", models.CharField(max_length=255)),
                (
                    "answer_type",
                    models.CharField(
                        choices=[
                            ("int", "Integer"),
                            ("qr", "QR Code"),
                            ("str", "String"),
                        ],
                        max_length=255,
                    ),
                ),
                ("answer", models.CharField(max_length=255)),
                (
                    "hunt",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="items",
                        to="hunt.Hunt",
                    ),
                ),
            ],
            options={"ordering": ["_order"]},
        ),
    ]
