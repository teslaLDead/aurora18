from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
# Create your models here.

class UserProfile(models.Model):

    user=models.OneToOneField(User,on_delete=models.CASCADE)
    college_name=models.CharField(max_length=200)
    phonenumber=models.IntegerField()
    dob=models.DateField()
    aadharNumber=models.CharField(blank=True,default="",max_length=12)
    eventsPaid=models.CharField(max_length=400,blank=True)
    eventsPending=models.CharField(max_length=400,blank=True)
    totalPaid=models.IntegerField(default=0,blank=True)
    roll_number=models.CharField(default="",blank=True,max_length=100)
    unpaidAmount=models.IntegerField(default=0,blank=True)
    teamNames=models.TextField(blank=True)
    def __str__(self):
        return str(self.user)+" "+self.college_name
    def addNewEvent(self,new_event):
        currentEvents=self.eventsPending
        self.eventsPending=currentEvents+new_event
        self.save()
    def changeEventStatus(self,events):
        currentEvents=self.eventsPending
        for x in events:
            currentEvents.replace(x,'')
            self.eventsPaid=self.eventsPaid+x
        self.eventsPending=currentEvents
        self.save()


class Events(models.Model):
    EVENT_TYPE=(
        ('T','tech'),
        ('M', 'manag'),
        ('C', 'cult'),
    )
    eventType=models.CharField(choices=EVENT_TYPE,max_length=1)
    name=models.CharField(max_length=100)
    fee=models.IntegerField(default=100)
    maxTeamSize=models.IntegerField(default=1,blank=True)
    teamEvent=models.BooleanField()
    def __str__(self):
        return self.name
    def getEventText(self):
        s=self.eventType+"_"+self.name+";"
        return s

class PaymentInitiated(models.Model):
    payment_id=models.CharField(max_length=500)
    user_name=models.CharField(max_length=500)
    user_email=models.CharField(max_length=500)
    user_phone = models.CharField(max_length=500)
    amount=models.IntegerField()
    events=models.CharField(max_length=600)
    created_at=models.CharField(max_length=500)
    def __str__(self):
        return self.user_name

class PaymentMade(models.Model):
    user=models.ForeignKey(UserProfile, on_delete=models.CASCADE,blank=True)
    events=models.CharField(max_length=1000,blank=True)
    amount=models.IntegerField(blank=True)
    payment_id=models.CharField(max_length=500,blank=True)

    def __str__(self):
        return str(self.user)+" "+str(self.amount)
