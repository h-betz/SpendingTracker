from rest_framework import serializers
from models import Category, Expense
from django.contrib.auth.models import User

class CategorySerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_blank=False, max_length=50,read_only=True)

    def create(self, validated_data):
        """
        Create and return a new `Category` instance, given the validated data.
        """
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Category` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class ExpenseSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    description = serializers.CharField(required=True, allow_blank=False, max_length=100)
    amount = serializers.DecimalField(required=True,allow_blank=False,max_digits=15,decimal_places=2)
    date = serializers.DateField(required=True,allow_blank=False)
    user = serializers.User(required=True,allow_blank=False,read_only=True)
    category = CategorySerializer()

    def create(self, validated_data):
        """
        Create and return a new `Expense` instance, given the validated data.
        """
        return Expense.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Expense` instance, given the validated data.
        """
        instance.description = validated_data.get('description', instance.description)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.date = validated_data.get('date', instance.date)
        instance.save()
        return instance