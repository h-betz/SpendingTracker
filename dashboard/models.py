from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50)
    users = models.ForeignKey('auth.User', related_name='categories', on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        """
        Use the `pygments` library to create a highlighted HTML
        representation of the code snippet.
        """
        super(Category, self).save(*args, **kwargs)

class Expense(models.Model):
    description = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=15,decimal_places=2)
    date = models.DateField()
    user = models.ForeignKey('auth.User', related_name='expenses', on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        """
        Use the `pygments` library to create a highlighted HTML
        representation of the code snippet.
        """
        super(Expense, self).save(*args, **kwargs)