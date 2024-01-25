from django.shortcuts import render, redirect

# Create your views here.
# accounts/views.py
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from django.views.generic.edit import FormView
from .forms import CustomUserCreationForm
from django.shortcuts import get_object_or_404

from .forms import ProductoForm


from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.http import JsonResponse

from .models import Producto, Venta, DetalleVenta
from .serializers import ProductoSerializer, VentaSerializer, DetalleVentaSerializer

class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer

class DetalleVentaViewSet(viewsets.ModelViewSet):
    queryset = DetalleVenta.objects.all()
    serializer_class = DetalleVentaSerializer
    
def listar_productos(request):
    # Obtén todos los productos desde la base de datos
    productos = Producto.objects.all()

    # Pasa los productos a la plantilla
    return render(request, 'producto_list.html', {'productos': productos})

def listar_catalogo(request):
    # Obtén todos los productos desde la base de datos
    productos = Producto.objects.all()

    # Pasa los productos a la plantilla
    return render(request, 'productos.html', {'productos': productos})

def crear_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()

    else:
        form = ProductoForm()
    # Recupera todos los productos
    productos = Producto.objects.all()
    
    return render(request, 'agregar.html', {'form': form, 'productos': productos})

def comprar_producto(request, producto_id):
    producto = get_object_or_404(Producto, id=producto_id)
    usuario = request.user  # Ajusta esto según cómo obtienes al usuario

    # Crea una nueva venta si el usuario no tiene una venta abierta actualmente
    venta_abierta = Venta.objects.filter(usuario=usuario, total_venta=0).first()

    if not venta_abierta:
        venta_abierta = Venta.objects.create(usuario=usuario)

    # Verifica si ya existe un detalle de venta para este producto en la venta abierta
    detalle_venta_existente = DetalleVenta.objects.filter(venta=venta_abierta, producto=producto).first()

    if detalle_venta_existente:
        # Si ya existe, incrementa la cantidad en lugar de crear uno nuevo
        detalle_venta_existente.cantidad += 1
        detalle_venta_existente.save()
    else:
        # Si no existe, crea un nuevo detalle de venta
        DetalleVenta.objects.create(venta=venta_abierta, producto=producto)

    # Actualiza el total de la venta
    venta_abierta.total_venta = sum(detalle.subtotal for detalle in venta_abierta.detalles.all())
    venta_abierta.save()

    return JsonResponse({'mensaje': 'Producto comprado exitosamente'})