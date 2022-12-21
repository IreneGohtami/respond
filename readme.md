# Setup Locally

1. Install dependencies: `npm i`
2. Create a .env file with the following var (secrets will be shared separately):
```
  PORT=3000
  VERIFY_TOKEN={secret}
  PAGE_ACCESS_TOKEN={secret}
  SENDGRID_API_KEY={secret}
  SENDGRID_EMAIL_FROM={secret}
  SENDGRID_EMAIL_TO={your email address}
  SENDGRID_ORDER_TEMPLATE_ID={secret}
```
3. Run the project: `npm start`


## Interact with Facebook Page

1. Visit the following [Test Page](https://www.facebook.com/profile.php?id=100088974336410) in Facebook
2. Send a message!
    - Hi, Hello, Good morning
3. Enquire about a product
    - /desc, /price, /shipping, /buy followed by Product SKU
    - Product catalog can be found [here](https://raw.githubusercontent.com/BestBuyAPIs/open-data-set/master/products.json)