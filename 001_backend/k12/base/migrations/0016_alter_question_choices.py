# Generated by Django 4.1.3 on 2022-12-30 11:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0015_alter_question_choices'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='choices',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='base.choices'),
        ),
    ]
