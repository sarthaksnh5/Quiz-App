# Generated by Django 4.0.6 on 2022-07-28 07:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0009_alter_leaderboard_user_alter_quiz_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='leaderboard',
            name='difficulty',
            field=models.CharField(default='Easy', max_length=255),
            preserve_default=False,
        ),
    ]
