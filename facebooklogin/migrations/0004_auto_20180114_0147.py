# Generated by Django 2.0.1 on 2018-01-13 20:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('facebooklogin', '0003_auto_20180114_0137'),
    ]

    operations = [
        migrations.AddField(
            model_name='events',
            name='eventType',
            field=models.CharField(choices=[('T', 'tech'), ('M', 'manag'), ('C', 'cult')], default='T', max_length=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='events',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
