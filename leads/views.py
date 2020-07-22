from django.http import HttpResponse
import json
from .models import Lead
from .serializers import LeadSerializer
from rest_framework import generics


class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


def add_edit_lead(request):
    data = request.body
    data = json.loads(data)
    name = data['leadName']
    email = data['leadEmail']
    message = data['leadMessage']
    lead = Lead()
    if data['leadId'] > 0:
        lead.id = data['leadId']
    lead.name = name
    lead.email = email
    lead.message = message
    lead.save()

    return HttpResponse('success')


def remove_leads(request):
    data = request.body
    data = json.loads(data)
    leads_to_remove_array = data["leads_to_remove"]
    leads_to_remove = Lead.objects.filter(id__in=leads_to_remove_array)
    leads_to_remove.delete()
    return HttpResponse('success')

