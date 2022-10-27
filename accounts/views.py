from django.shortcuts import render, redirect
from django.conf import settings
from django.http import HttpResponseRedirect, request, HttpResponseBadRequest
from django.views.generic import TemplateView, CreateView, UpdateView
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import logout, login
from django.urls import reverse, reverse_lazy
from django.contrib.sites.shortcuts import get_current_site
from django.utils import timezone
from django.shortcuts import redirect
from django.core.signing import BadSignature, SignatureExpired, loads, dumps
from django.template.loader import render_to_string

from accounts.models import User, Account
from accounts.forms import LoginForm, AccountCreationForm, UserCreateForm

# Create your views here.

class UserCreation(CreateView):
    """ユーザー仮登録"""

    template_name = "accounts/user_create.html"
    form_class = UserCreateForm

    def form_valid(self, form):
        """仮登録と本登録用メールの発行."""
        # 仮登録と本登録の切り替えは、is_active属性を使うと簡単です。
        # 退会処理も、is_activeをFalseにするだけにしておくと捗ります。
        user = form.save(commit=False)
        user.is_active = False
        user.save()

        # アクティベーションURLの送付
        current_site = get_current_site(self.request)
        domain = current_site.domain
        context = {
            "protocol": self.request.scheme,
            "domain": domain,
            "token": dumps(user.pk),
            "user": user,
        }

        subject = render_to_string("mail_template/subject.txt", context)
        message = render_to_string("mail_template/message.txt", context)
        from_email = "money_management@gmail.com"

        user.email_user(subject, message, from_email)
        return redirect("accounts:user_create_done")


class UserCreateDone(TemplateView): 
    template_name = "accounts/user_create_done.html"


class UserCreateComplete(TemplateView): 
    template_name = "accounts/user_create_complete.html"
    timeout_seconds = getattr(settings, 'ACTIVATION_TIMEOUT_SECONDS', 60*60*24)  # デフォルトでは1日以内

    def get(self, request, **kwargs):
        """tokenが正しければ本登録."""
        token = kwargs.get('token')
        try:
            user_pk = loads(token, max_age=self.timeout_seconds)

        # 期限切れ
        except SignatureExpired:
            return HttpResponseBadRequest()

        # tokenが間違っている
        except BadSignature:
            return HttpResponseBadRequest()

        # tokenは問題なし
        else:
            try:
                user = User.objects.get(pk=user_pk)
            except User.DoesNotExist:
                return HttpResponseBadRequest()
            else:
                if not user.is_active:
                    # 問題なければ本登録とする
                    user.is_active = True
                    user.save()
                    login(request, user, backend='django.contrib.auth.backends.ModelBackend')
                    current_user = self.request.user.id
                    try:  # use try except for queries which may not return anything 
                        Account.objects.get(user=current_user)
                        # return super() sort of terminates the try-except without needing to return a HttpResponse object
                    except Account.DoesNotExist:  #user login and then dispatch to account creation
                        return HttpResponseRedirect(reverse('accounts:account_create'))
                    return super().get(request, **kwargs)


class AccountView(LoginRequiredMixin, TemplateView):

    template_name = "accounts/account.html" 
    login_url = "/accounts/login/"

    def get_context_data(self, **kwargs):
        context = super(AccountView, self).get_context_data(**kwargs)
        context['users'] = self.request.user 
        context['account'] = Account.objects.get(user=self.request.user)
        context['update_slug'] = Account.objects.get(user=self.request.user).get_full_name()
        return context 

    def dispatch(self, request, *args, **kwargs):

        current_user = self.request.user.id
        # use try except for queries which may not return anything 
        if(current_user is None): 
            return redirect("accounts:login")

        try: 
            Account.objects.get(user=current_user)
            # return super() sort of terminates the try-except without needing to return a HttpResponse object
        except Account.DoesNotExist: 
            print("Got dispatched")
            return HttpResponseRedirect(reverse('accounts:account_create'))
        
        return super(AccountView, self).dispatch(request, *args, **kwargs) 

    def post(self, request, *args, **kwargs): 
        print(self.request.POST)
        if self.request.POST['logout'] == 'logout': 
            logout(request) 
            return HttpResponseRedirect(reverse('accounts:login'))
            # render(request, 'authentication/login.html') justs renders the template but does not call the view
            

class AccountCreation(LoginRequiredMixin, CreateView): 

    model = Account
    form_class = AccountCreationForm
    template_name = 'accounts/account_create.html'

    def post(self, request, *args, **kwargs):
        form = self.get_form() #query_dict from forms are immutable so use QueryDict.copy() 
        data = form.data

        if form.is_valid(): 
            account_data = {
                'user':User.objects.get(pk=self.request.user.id),
                'first_name':data['first_name'],
                'last_name':data['last_name'],
                'profile_pic':data['profile_pic'],
                'location':data['location'],
                }

            Account.objects.create(**account_data) # ** treats as kwargs
            return HttpResponseRedirect(reverse('accounts:account_view')) 
        else:
            return self.form_invalid(form)


class Login(LoginView): 

    template_name = 'authentication/login.html'
    form_class = LoginForm
    success_url = "accounts/accountview.html"	
    redirect_authenticated_user = True #Login redirect url in the settings.py

class AccountUpdate(LoginRequiredMixin, UpdateView): 

    model = Account 
    fields = ['profile_pic','first_name', 'last_name', 'location',]
    initial = {}
    template_name = 'accounts/account_update.html'
    slug_field = 'first_name'

    def get_initial(self, **kwargs):
        base_initial = super().get_initial()
        base_initial['account_data'] = Account.objects.filter(user=self.request.user)
        return base_initial

    def get_success_url(self):
        return reverse('accounts:account_view')

    #on the basis of the slug and the model, the object to update is determined 
    def get_slug_field(self):
        return 'first_name'

 