# Generated by Django 4.1.3 on 2022-12-24 07:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_alter_question_qtype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='qtype',
            field=models.CharField(max_length=2),
        ),
    ]