from django.db import models

# Create your models here.
# accounts/models.py
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    pass
    def __str__(self):
        return self.username
    
# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    proveedor = models.CharField(max_length=100)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    foto = models.ImageField(upload_to='productos/', null=True, blank=True)
    cantidad = models.PositiveIntegerField(default=0)

class Venta(models.Model):
    usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    fecha_venta = models.DateField(auto_now_add=True)
    total_venta = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Venta {self.id} - {self.fecha_venta}"
    
class DetalleVenta(models.Model):
    venta = models.ForeignKey(Venta, related_name='detalles', on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def save(self, *args, **kwargs):
        # Actualizar el subtotal antes de guardar
        self.subtotal = self.cantidad * self.producto.valor
        super().save(*args, **kwargs)

    def __str__(self):
        return f"DetalleVenta - Producto: {self.producto.nombre}, Cantidad: {self.cantidad}, Subtotal: {self.subtotal}"