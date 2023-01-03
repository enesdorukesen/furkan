# Generated by Django 4.1.3 on 2022-12-30 20:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0023_choices_question'),
    ]

    operations = [
        migrations.RenameField(
            model_name='question',
            old_name='name',
            new_name='given_id',
        ),
        migrations.AlterField(
            model_name='choices',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choices', to='base.question'),
        ),
    ]
