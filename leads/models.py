from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=255, default=None, blank=True, null=True)
    address = models.CharField(max_length=255, default=None, blank=True, null=True)

    def __str__(self):
        return self.name

    # class Meta:
    #     managed = False


class User(models.Model):
    title = models.CharField(max_length=255, default=None, blank=True, null=True)
    first_name = models.CharField(max_length=255, default=None, blank=True, null=True)
    middle_name = models.CharField(max_length=255, default=None, blank=True, null=True)
    last_name = models.CharField(max_length=255, default=None, blank=True, null=True)
    username = models.CharField(max_length=255, default=None, blank=True, null=True)
    email = models.CharField(max_length=255, default=None, blank=True, null=True)
    password = models.CharField(max_length=255, default=None, blank=True, null=True)
    role = models.CharField(max_length=255, default=None, blank=True, null=True)
    status = models.CharField(max_length=255, default=None, blank=True, null=True)


class Lead(models.Model):
    name = models.CharField(max_length=100, default=None, blank=True, null=True)
    tax_id = models.CharField(max_length=100, default=None, blank=True, null=True)
    email = models.EmailField(default=None, blank=True, null=True)
    message = models.CharField(max_length=300, default=None, blank=True, null=True)
    company = models.ForeignKey('Company', on_delete=models.SET_NULL, null=True, blank=True)
    user = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    # class Meta:
    #     managed = False



