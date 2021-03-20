from django.urls import path
from .views import ComposeEmailView, MailboxView, SingleEmailView

urlpatterns = [
    path("compose", ComposeEmailView.as_view()),
    path("mailbox/<str:mailbox>", MailboxView.as_view()),
    path("email/<int:email_id>", SingleEmailView.as_view()),
]