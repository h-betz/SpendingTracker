from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfileInfo(models.Model):

    # Create relationship (don't inherit from User!)
    user = models.OneToOneField(User)

    # Add any additional attributes you want
    name = models.CharField(default='0000000',blank=False,max_length=70)

    def __str__(self):
        # Built-in attribute of django.contrib.auth.models.User !
        return self.user.name
