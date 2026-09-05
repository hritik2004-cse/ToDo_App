interface EmailTemplateParams {
  name: string;
  email: string;
  passcode: string;
  expiry: string;
}

export interface SendEmailOptions {
  templateId: string;
  templateParams: EmailTemplateParams;
}
