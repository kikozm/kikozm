const twilio = require('twilio');

const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = new twilio(accountSid, authToken);

function sendWhatsAppMessage(phoneNumber, message, mediaUrl) {
    const messageOptions = {
        body: message,
        from: 'whatsapp:+14155238886', // מספר sandbox של Twilio
        to: `whatsapp:${phoneNumber}`
    };

    if (mediaUrl) {
        messageOptions.mediaUrl = [mediaUrl];
    }

    client.messages.create(messageOptions)
        .then(message => console.log(`הודעה נשלחה: ${message.sid}`))
        .catch(error => console.error(`שגיאה בשליחת ההודעה: ${error}`));
}

// שימוש בדוגמה:
const contacts = [
    { phone: '1234567890', firstName: 'יוחנן' },
    { phone: '0987654321', firstName: 'שרה' },
    // ... אנשי קשר נוספים
];

const baseMessage = "שלום {{firstName}}, זו הודעה בדיקה.";

contacts.forEach(contact => {
    const personalizedMessage = baseMessage.replace('{{firstName}}', contact.firstName);
    sendWhatsAppMessage(contact.phone, personalizedMessage, 'https://example.com/image.jpg'); // הוסף את ה-URL של המדיה אם יש
});
