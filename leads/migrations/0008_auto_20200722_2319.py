# Generated by Django 3.0.7 on 2020-07-22 23:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0007_auto_20200722_2317'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='company',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='leads.Lead'),
        ),
    ]
