from django.db import models
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone
from django.core.mail import send_mail
from django.utils.translation import gettext_lazy as _
from datetime import date
from django.db.models import signals

# Create your models here.
# all the models will be here 

class CustomUserManager(UserManager):
    """ユーザーマネージャー"""
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, password=password, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self._create_user(email=email, password=password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """カスタムユーザーモデル."""

    email = models.EmailField(
        _("email address"),
        unique=True,
    )

    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )

    objects = CustomUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

    @property
    def username(self):
        """username属性のゲッター
        他アプリケーションが、username属性にアクセスした場合に備えて定義
        メールアドレスを返す
        """
        return self.email


class Spending(models.Model): 

    TYPES_1 = (
        ('shokuji', '食事'),
        ('nichiyouhin','日用品'),
        ('shumi_goraku', '趣味・娯楽'),
        ('koutsuuhi', '交通費',),
        ('ishou_biyou', '衣装・美容'),
        ('kousaihi', '交際費'),
        ('kenkou_iryou', '健康・医療'),
        ('kyouyou_kyouiku', '教養・教育'),
        ('suidou_kounetsuhi', '水道・光熱費'),
        ('sonota', 'その他'),
    )

    expenditure = models.ForeignKey("Expenditure", on_delete=models.CASCADE, null= False)
    amount = models.DecimalField(max_digits=7,decimal_places=2)
    type1 = models.CharField(verbose_name='type1',max_length=150, null=False, blank=False, default=TYPES_1[-1], choices = TYPES_1)
    type2 = models.CharField(verbose_name='type2',max_length=150, null=False, blank=False, default='sonota')
    date = models.DateField(default=date.today)
    note = models.TextField(verbose_name='note', blank=True, null=True, editable=True, max_length=100, help_text='内容を入力')

    
class Expenditure(models.Model): 

    #use 'related_name' for reverse_lookup of expenditure from name
    # use signal or def save to create 1 exp. upon account creation
    account = models.OneToOneField('Account', verbose_name='account', on_delete=models.CASCADE, null=False, related_name='expenditure')
    

class Account(models.Model): 

    TODOUFUKEN = (
        ("tokyo", "東京都"),
        ("osaka", "大阪府"),
        ("kyoto", "京都府"),
        ("kanagawa", "神奈川県"),
        ("hokkaido", "北海道")
    ) 

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False)
    first_name = models.CharField(_("first name"), max_length=30, blank=True)
    last_name = models.CharField(_("last name"), max_length=150, blank=True)
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)
    profile_pic = models.ImageField(blank=True, null= True, default='profile/default/default.jpg', upload_to='profile/account/')
    location = models.CharField(verbose_name='location',max_length=150, null=False, blank=False, default=None, choices = TODOUFUKEN)

    def get_full_name(self):
        """Return the first_name plus the last_name, with a space in
        between."""
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name


# Signals and their functions

def create_expenditure(sender, created, instance, **kwargs):
    if(instance.pk and created): 
        expenditure = Expenditure.objects.create(account = instance)
        expenditure.save()
        
signals.post_save.connect(create_expenditure, sender=Account)

#set up location field temporarily for now. might improve later

#since MEDIA_ROOT is configured to '/media' in urls.py, 
#, specify the path in it to store images


# Will someday be useful. Use Form fields instead
TYPES_BETA = (
        ('食事', ('食事','食料品','外食','カフェ','その他食費')),
        ('日用品', ('日用品','子育て用品','ドラッグストア','100均店','その他日用品')),
        ('趣味・娯楽', ('アウトドア','スポーツ','映画・音楽・ゲーム','本','旅行','秘密の趣味','その趣味・娯楽')),
        ('交通費', ('交通費','電車・バス','タクシー','IC','その他飛行機')),
        ('衣装・美容', ('衣装','クリーニング','美容院','化粧品','アクセサリー','その他衣装・美容')),
        ('交際費', ('交際費','飲み会','プレゼント代','その他交際費')),
        ('健康・医療', ('フィットネス','ボディケア','医療費','薬','保険','その他健康・医療')),
        ('教養・教育', ('書籍','新聞・雑誌','習い事','学費・塾','その他教養・教育')),
        ('水道・光熱費', ('光熱費','電気代','ガス代','水道代','その他水道・光熱費')),
        ('その他', ('その他')),
    )