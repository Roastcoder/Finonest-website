# SMS Integration Setup Guide

## Overview
The Finonest platform supports multiple SMS providers for OTP delivery:
- **Twilio** (Recommended for production)
- **AWS SNS** (Alternative for AWS infrastructure)
- **Console** (Development mode - logs to console)

## Environment Variables

Add these to your `.env` file:

### For Twilio:
```env
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_FROM_NUMBER=+1234567890  # Your Twilio phone number
```

### For AWS SNS:
```env
SMS_PROVIDER=aws-sns
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

### For Development (Console):
```env
SMS_PROVIDER=console
# OTPs will be logged to console
```

## Installation

### Twilio
```bash
npm install twilio
```

### AWS SNS
```bash
npm install aws-sdk
```

## Configuration

1. **Twilio Setup:**
   - Sign up at https://www.twilio.com
   - Get your Account SID and Auth Token from dashboard
   - Purchase a phone number or use trial number
   - Add credentials to `.env`

2. **AWS SNS Setup:**
   - Create AWS account
   - Create IAM user with SNS publish permissions
   - Get Access Key ID and Secret Access Key
   - Add credentials to `.env`

## Testing

In development mode (`SMS_PROVIDER=console`), OTPs are logged to console:
```
[SMS] To: 9876543210
Message: Your Finonest OTP is 123456. Valid for 10 minutes...
```

## Production Checklist

- [ ] Configure SMS provider credentials
- [ ] Test OTP delivery end-to-end
- [ ] Set up monitoring/alerts for SMS failures
- [ ] Configure rate limiting (already implemented)
- [ ] Set up SMS delivery logs/analytics
- [ ] Test OTP expiration and retry flows

## Rate Limiting

The system includes built-in rate limiting:
- 60-second cooldown between OTP requests
- Maximum 5 failed verification attempts per OTP
- Automatic OTP expiration (10 minutes default)

## Cost Considerations

- **Twilio**: ~$0.0075 per SMS in India
- **AWS SNS**: ~$0.00645 per SMS in India
- Both providers offer free tier for testing
