from django.shortcuts import render

# Create your views here.
from django.shortcuts import render


def index(request):
    return render(request, 'frontend/index.html')


def main(request):
    return render(request, 'frontend/main.html')
