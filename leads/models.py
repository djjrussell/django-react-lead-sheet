from django.db import models

# Create your models here.


class Company(models.Model):
    name = models.CharField(max_length=100, default=None, blank=True, null=True)
    address = models.CharField(max_length=100, default=None, blank=True, null=True)


class Lead(models.Model):
    name = models.CharField(max_length=100, default=None, blank=True, null=True)
    email = models.EmailField(default=None, blank=True, null=True)
    message = models.CharField(max_length=300, default=None, blank=True, null=True)
    company = models.ForeignKey('Lead', on_delete=models.CASCADE, default=0,)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
