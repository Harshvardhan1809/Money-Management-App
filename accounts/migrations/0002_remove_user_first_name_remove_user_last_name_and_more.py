# Generated by Django 4.1.2 on 2022-10-14 08:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(model_name="user", name="first_name",),
        migrations.RemoveField(model_name="user", name="last_name",),
        migrations.AddField(
            model_name="account",
            name="first_name",
            field=models.CharField(
                blank=True, max_length=30, verbose_name="first name"
            ),
        ),
        migrations.AddField(
            model_name="account",
            name="last_name",
            field=models.CharField(
                blank=True, max_length=150, verbose_name="last name"
            ),
        ),
    ]
