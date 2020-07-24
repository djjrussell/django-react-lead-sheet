from django.http import HttpResponse
import json
from .models import *
from .serializers import *
from rest_framework import generics

class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


class CompanyListCreate(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


def init(request):
    leads = Lead.objects.select_related('company').all()
    output = {
        'lead_data': [],
        'company_data': [],
    }
    for lead in leads:
        output['lead_data'].append({
            'id': lead.id,
            'name': lead.name,
            'email': lead.email,
            'message': lead.message,
        })
        output['company_data'].append({
            'company_name': lead.company.name if lead.company.name else "",
            'company_id': lead.company.id if lead.company.name else "",
        })
    output_string = json.dumps(output)
    return HttpResponse(output_string)


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

