from django.http import HttpResponse
import json
from .models import Lead
from .serializers import LeadSerializer
from rest_framework import generics


class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


def add_new_lead(request):
    data = request.body
    data = json.loads(data)
    name = data['newName']
    email = data['newEmail']
    message = data['newMessage']
    lead = Lead()
    lead.name = name
    lead.email = email
    lead.message = message
    lead.save()

    return HttpResponse('success')

