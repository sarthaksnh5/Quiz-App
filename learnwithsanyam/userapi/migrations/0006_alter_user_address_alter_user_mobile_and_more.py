# Generated by Django 4.0.5 on 2022-07-18 10:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapi', '0005_alter_user_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='address',
            field=models.TextField(verbose_name='address'),
        ),
        migrations.AlterField(
            model_name='user',
            name='mobile',
            field=models.CharField(max_length=10, unique=True, verbose_name='mobile'),
        ),
        migrations.AlterField(
            model_name='user',
            name='yourClass',
            field=models.CharField(max_length=20, verbose_name='yourClass'),
        ),
    ]