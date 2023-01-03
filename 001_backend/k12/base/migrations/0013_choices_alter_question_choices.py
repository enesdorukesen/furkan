# Generated by Django 4.1.4 on 2022-12-26 06:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0012_rename_choises_question_choices'),
    ]

    operations = [
        migrations.CreateModel(
            name='Choices',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('a', models.TextField(max_length=500)),
                ('b', models.TextField(max_length=500)),
                ('c', models.TextField(max_length=500)),
                ('d', models.TextField(max_length=500)),
                ('e', models.TextField(max_length=500)),
                ('answer', models.CharField(max_length=1)),
            ],
        ),
        migrations.AlterField(
            model_name='question',
            name='choices',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.choices'),
        ),
    ]
