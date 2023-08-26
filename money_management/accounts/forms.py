from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.forms import ModelForm
from accounts.models import Account, User
from django import forms

class LoginForm(AuthenticationForm): 

    def __init__(self, *args, **kwargs): 
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs['placeholder'] = field.label


class AccountCreationForm(ModelForm): 
    class Meta: 
        model = Account
        fields = ['profile_pic','first_name','last_name', 'location']


class UserCreateForm(UserCreationForm):
    """ユーザー登録用フォーム"""

    class Meta:
        model = User
        fields = (
            "email",
            "password1",
            "password2",
        )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["email"].help_text = "Please enter your mail address"
        for field in self.fields.values():
            field.widget.attrs["class"] = "form-control"

    def clean_email(self):
        email = self.cleaned_data["email"]
        User.objects.filter(email=email, is_active=False).delete()
        return email 
        

        # mアドレス認証
        # email_len = len(email)
        # m_address = email[email_len - 14 :]
        # if not m_address == "m.titech.ac.jp":
        #     raise forms.ValidationError("mアドレスを使ってください！")
        # return email