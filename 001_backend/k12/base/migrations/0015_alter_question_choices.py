# Generated by Django 4.1.3 on 2022-12-27 21:59

import base.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0014_alter_question_choices'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='choices',
            field=models.JSONField(default=base.models.Choices),
        ),
    ]