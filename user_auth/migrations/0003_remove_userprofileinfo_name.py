# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-03 21:43
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_auth', '0002_auto_20170928_2232'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofileinfo',
            name='name',
        ),
    ]
