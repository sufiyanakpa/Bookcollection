from django.db import models


class Bookmodel(models.Model):
    Title=models.CharField(max_length=100)
    Author=models.CharField(max_length=100)
    Book_id=models.IntegerField(unique=True)
    year=models.IntegerField()
    Genre=models.CharField(max_length=1000)
    image=models.ImageField(upload_to='image')





# Create your models here.
