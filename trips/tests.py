from django.test import TestCase
from trips.models import Trip, Category, Service

class TripSalesPriceWithManyServicesTestase(TestCase):
    def setUp(self):
        
        # set up the mock trip which we calculate the sale price on
        trip = Trip.objects.create(
            title = "test trip",
            travel_style = "NA",
            duration_days = 1,
            destination = "null island",
            cost = 5
        )

        category = Category.objects.create(
            display_name = 'test'
        )

        # set up the services which will add some cost to the trip
        Service.objects.create(
            name = "test service 1",
            location = "some location",
            cost = 1,
            category = category,
            trip = trip
        )

        Service.objects.create(
            name = "test service 2",
            location = "some location",
            cost = 2,
            category = category,
            trip = trip
        )

    def sales_price_with_many_services_case(self):
        testTrip = Trip.objects.get(title = "test trip")
        # check a that the trip model has 
        self.assertEqual(len(testTrip.services.all()), 2)

        # calculate the sale price
        sale_price = testTrip.calculate_sale_price()
        
        # ensure the sale price is the value we'd expect it to be
        self.assertEqual(sale_price, 8)

class TripSalesPriceWithNoServicesTestCase(TestCase):
    def setUp(self):
        
        # set up the mock trip which we calculate the sale price on
        trip = Trip.objects.create(
            title = "test trip",
            travel_style = "NA",
            duration_days = 1,
            destination = "null island",
            cost = 5
        )

    def sales_price_with_no_services_case(self):
        testTrip = Trip.objects.get(title = "test trip")
        # check a that the trip model has 
        self.assertEqual(len(testTrip.services.all()), 0)

        # calculate the sale price
        sale_price = testTrip.calculate_sale_price()
        
        # ensure the sale price is the value we'd expect it to be
        self.assertEqual(sale_price, 5)