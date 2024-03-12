from django.apps import AppConfig


class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'
    def ready(self):
        '''This function is used to import the signals
        when the app is ready. when a user is saved, the
        signal is triggered. the signal then updates the
        user profile.'''
        import base.signals
