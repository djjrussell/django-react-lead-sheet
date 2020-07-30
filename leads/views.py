from django.http import HttpResponse, HttpResponseForbidden
import json
from .models import *
from .serializers import *
from rest_framework import generics
from django.shortcuts import redirect


class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


class CompanyListCreate(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def init(request):
    if 'user_pk' not in request.COOKIES:
        return HttpResponseForbidden('failure')

    user_pk = request.COOKIES['user_pk']

    if not user_pk:
        return HttpResponseForbidden('failure')

    leads = Lead.objects.filter(user_id=user_pk).select_related('company').all()

    output = {
        'user_id': user_pk,
        'lead_data': [],
        'company_data': {},
    }

    for lead in leads:
        output['lead_data'].append({
            'id': lead.id,
            'lead_name': lead.name,
            'lead_email': lead.email,
            'lead_message': lead.message,
            'company_name': lead.company.name if lead.company.name else "",
            'company_id': lead.company.id if lead.company.name else "",
            'company_address': lead.company.address if lead.company.address else "",
        })

    companies = Company.objects.all()

    for company in companies:
        output['company_data'][company.pk] = company.name

    output_string = json.dumps(output)
    response = HttpResponse(output_string)
    return response


def login(request):
    data = request.body
    data = json.loads(data)
    username = data['username']
    password = data['password']

    user = User.objects.filter(username=username).get()

    if user.password == password:
        response = HttpResponse('success')
        response.set_cookie('user_pk', user.pk)
    else:
        response = HttpResponse('failure')
    return response


def add_edit_lead(request):
    data = request.body
    data = json.loads(data)
    name = data['leadName']
    email = data['leadEmail']
    message = data['leadMessage']
    user_id = data['userId']
    lead = Lead()

    if data['leadId'] > 0:
        lead.id = data['leadId']

    if data['companyIsNew']:
        company = Company()
        company.name = data['companyName']
        company.address = data['companyAddress']
        company.save()
        company_id = company.pk
    else:
        company_id = data['companyId']
    lead.user_id = user_id
    lead.company_id = company_id
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

