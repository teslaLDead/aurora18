from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.conf import settings
from .forms import UserForm
from .models import *
from social_django.models import UserSocialAuth
from instamojo_wrapper import Instamojo
# Create your views here.

api = Instamojo(api_key="8d23e1ebcd31b04e0e7e72aae28e2fec",
                auth_token="3597e5d20557a0f8eb2a7a15bcda3e31")

def indexView(request):
    reg="Register"
    if request.user.is_authenticated:
        reg="Profile"

    return render(request,'facebooklogin/index.html',{'reg':reg})

def eventMenu(request):
    return render(request,'facebooklogin/eventMenu.html')

def gallery(request):
    return render(request,'facebooklogin/imageGallery.html')

def about(request):
    return render(request,'facebooklogin/about.html')

def team(request):
    return render(request,'facebooklogin/teampage.html')

def tech_events(request):
    return render(request,'facebooklogin/techEvent.html')

def cultural_events(request):
    return render(request,'facebooklogin/culturalEvent.html')

def managerial_events(request):
    return render(request,'facebooklogin/managerialEvents.html')

def tech_events_specific(request,eventName):
    return render(request,'facebooklogin/techEvent.html',{'event':eventName})

def cultural_events_specific(request,eventName):
    return render(request,'facebooklogin/culturalEvent.html',{'event':eventName})

def managerial_events_specific(request,eventName):
    return render(request,'facebooklogin/managerialEvents.html',{'event':eventName})



@login_required
def eventTeamView(request,eventName):
    s = eventName+";"

    try:
        user=UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        return redirect('/CreateProfile/')
    if s in user.eventsPending or s in user.eventsPaid:
        return redirect('/Profile/')
    else:
        s=s.replace(';','')
        s=s.replace('_',' ').title()
        event = Events.objects.get(name=eventName)
        if event.teamEvent is True:
            formsize = event.maxTeamSize
        else:
            formsize = 0
        return render(request, 'facebooklogin/event_registration.html', {'eventName': s, 'formsize': formsize})


def profile(request):
    try:
        user=UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        return redirect('/CreateProfile/')

    imagelink=UserSocialAuth.objects.get(user=request.user).uid
    unpaid_events=user.eventsPending.split(";")
    unpaid_events.pop(-1)
    paid_events=user.eventsPaid.split(";")

    payble_amount=user.unpaidAmount
    return render(request,'facebooklogin/profile.html',{'unpaid_events':unpaid_events,'paid_events':paid_events,'payble_amount':payble_amount,'imagelink':imagelink})
@login_required
def updateUserEvents(request,eventname):
    s = eventname + ";"
    try:
        user=UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        return redirect('/CreateProfile/')

    event = Events.objects.get(name=eventname)
    message=""
    if s in user.eventsPaid:
        message="You have completed the registration process for this event."

        return redirect('/Profile/')
    elif s in user.eventsPending:
        message="Registration incomplete please check profile to complete registration."
        return redirect('/Profile/')
    else:
        if event.teamEvent is True:
            teamdata = str(request.GET)
            user.unpaidAmount = user.unpaidAmount + event.fee
            user.addNewEvent(s)
            user.teamNames = user.teamNames + eventname + "%" + teamdata + ";"
            user.save()
            return redirect('/Profile/')
        else:
            user.unpaidAmount = user.unpaidAmount + event.fee
            user.addNewEvent(s)
            user.save()
            return redirect('/Profile/')

@login_required
def removeEvents(request):
    try:
        user=UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        return redirect('/CreateProfile/')
    data=request.POST

    events=data.getlist('events')

    string=""
    for x in events:
        string=string+x+";"
    user.eventsPending=user.eventsPending.replace(string,'')
    feededuction=0
    for x in events:
        e=Events.objects.get(name=x)
        feededuction=feededuction+e.fee
    user.unpaidAmount=user.unpaidAmount-feededuction
    user.save()
    return redirect('/Profile/')

@login_required
def createprofile(request):
    try:
        user=UserProfile.objects.get(user=request.user)
        return redirect('/Profile/')
    except UserProfile.DoesNotExist:
        pass
    if request.method=='POST':

        form=UserForm(request.POST)
        if form.is_valid():
            new_user_form=form.save(commit=False)
            new_user_form.user=request.user
            new_user_form.save()
            return redirect('/Profile/')
    else:
        form=UserForm()
    return render(request,'facebooklogin/createuser.html',{'form':form})

@login_required
def payment(request):
    try:
        user=UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        return redirect('/CreateProfile/')
    amount=user.unpaidAmount
    if (amount<=0):
        return redirect('/Profile/')
    phone=user.phonenumber
    purpose="user:"+request.user.first_name
    email=request.user.email
    response = api.payment_request_create(
        amount=amount,
        purpose=purpose,
        send_email=False,
        email=email,
        phone=str(phone),
        send_sms=False,
        allow_repeated_payments=False,
        redirect_url="http://aurora18.com/payment_made/",

    )
    new_payment=PaymentInitiated(payment_id=response['payment_request']['id'],user_name=(str(request.user.first_name)+" "+str(request.user.last_name)),user_email=request.user.email,user_phone=str(user.phonenumber),amount=str(amount),events=user.eventsPending,created_at=str(response['payment_request']['created_at']))
    new_payment.save()

    return redirect(response['payment_request']['longurl'])

@login_required
def payment_made(request):
    user = UserProfile.objects.get(user=request.user)
    payment=PaymentInitiated.objects.filter(user_name=(str(request.user.first_name)+" "+str(request.user.last_name)),events=user.eventsPending)
    for x in payment:
	id=(x.payment_id)
    	status = api.payment_request_status(id)
    	current_status=status['payment_request']['status']
        if (current_status=="Completed"):
            new_payment=PaymentMade(user=user,events=x.events,amount=x.amount,payment_id=x.payment_id)
            new_payment.save()
            user.eventsPaid=user.eventsPaid+user.eventsPending
            user.eventsPending=""
            user.totalPaid=user.totalPaid+x.amount
            user.unpaidAmount=0
            user.save()
            break

    return redirect('profile')
