from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["username","email","password"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model=Bookmodel
        fields="__all__"
        




