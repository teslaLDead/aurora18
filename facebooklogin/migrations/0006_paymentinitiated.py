# Generated by Django 2.0.1 on 2018-02-03 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('facebooklogin', '0005_auto_20180114_1322'),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentInitiated',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_id', models.CharField(max_length=500)),
                ('user_name', models.CharField(max_length=500)),
                ('user_email', models.CharField(max_length=500)),
                ('user_phone', models.CharField(max_length=500)),
                ('amount', models.IntegerField()),
                ('events', models.CharField(max_length=600)),
                ('created_at', models.CharField(max_length=500)),
            ],
        ),
    ]
