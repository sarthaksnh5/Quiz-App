# Generated by Django 4.0.6 on 2022-07-21 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0007_alter_quiz_on_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questions',
            name='question',
            field=models.TextField(unique=True),
        ),
    ]
