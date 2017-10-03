from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfileInfo(models.Model):

    # Create relationship (don't inherit from User!)
    user = models.OneToOneField(User)


    def __str__(self):
        # Built-in attribute of django.contrib.auth.models.User !
        return self.user.username
