from django.db.models.signals import pre_save
from django.contrib.auth.models import User


def updateUser(sender, instance, **kwargs):
    '''This function is used to update the user
    profile when the user is saved.'''
    user = instance
    if user.email != '':
        user.username = user.email


pre_save.connect(updateUser, sender=User)
