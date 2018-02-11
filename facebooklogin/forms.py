from django.forms import ModelForm
from .models import *
from django import forms

class UserForm(ModelForm):
    class Meta:
        model=UserProfile
        fields=('college_name','phonenumber','dob','aadharNumber','roll_number')
        labels ={
            "college_name":"Institute"
        }


