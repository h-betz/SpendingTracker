from rest_framework import serializers
from django.contrib.auth.models import User
from dashboard.models import Expense

class UserSerializer(serializers.ModelSerializer):
    expenses = serializers.PrimaryKeyRelatedField(many=True, queryset=Expense.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'expenses')
