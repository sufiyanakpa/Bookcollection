from django.shortcuts import render
from rest_framework.viewsets import ViewSet,ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import permissions
from api.serializers import*

class OwnerViewSet(ViewSet):
    def create(self,request):
        ser=OwnerSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(data=ser.data,status=status.HTTP_201_CREATED)
        return Response(data={"error":ser.errors},status=status.HTTP_400_BAD_REQUEST)
    

class Addbooksviewset(ModelViewSet):
    serializer_class = BookSerializer
    queryset = Bookmodel.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        """Handle full updates (PUT) and partial updates (PATCH)"""
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()

        # 🔥 Fix: Keep the existing image if no new one is uploaded
        if 'image' not in data and instance.image:
            data['image'] = instance.image

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


# Create your views here.
