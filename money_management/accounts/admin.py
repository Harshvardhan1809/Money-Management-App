from django.contrib import admin
from django.contrib import admin
from django.contrib.admin.options import TabularInline
from django.db.models.fields import PositiveSmallIntegerField
from accounts.models import *

# Register your models here.

class AccountAdmin(admin.ModelAdmin):
    list_display = ('profile_pic', 'user', 'first_name', 'last_name', 'date_joined', 'location')
    ordering = ('date_joined',)

#Try to make a inline with spendings inside the expenditure, under the account

admin.site.register(User)
admin.site.register(Account, AccountAdmin)
admin.site.register(Spending)
admin.site.register(Expenditure)
