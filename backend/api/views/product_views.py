from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status

from api.models import Product, Review
from api.serializer import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='sample name',
        price=0,
        brand='sample brand',
        countInStock=0,
        category="sample category",
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response('Product Delete Successfully')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(id=product_id)

    product.image = request.FILES.get('image')
    product.save()
    return Response('image uploaded successfully')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(id=pk)
    data = request.data

    # 1 Review Already exit.
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'details': 'Product Already Reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # 2 No rating or zero
    elif data['rating'] == 0:
        content = {'detail': 'Please Select A Rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 Create Review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        content = {'detail': 'Thanks For Review'}
        return Response(content, status=status.HTTP_200_OK)
