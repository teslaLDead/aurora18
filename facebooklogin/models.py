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
    eventsPaid=models.CharField(max_length=400,blank=True)
    eventsPending=models.CharField(max_length=400,blank=True)
    totalPaid=models.IntegerField(default=0,blank=True)
    unpaidAmount=models.IntegerField(default=0,blank=True)
    teamNames=models.TextField(blank=True)
    def __str__(self):
        return self.user.email
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

