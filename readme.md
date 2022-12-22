# Setup Locally

1. Install dependencies: `npm i`
2. Create a .env file with the following var (secrets will be shared separately):
```
  PORT=3000
  VERIFY_TOKEN={secret}
  PAGE_ACCESS_TOKEN={secret}
  SENDGRID_API_KEY={secret}
  SENDGRID_EMAIL_TO={your email address}
```
3. Run the project: `npm start`

## Task 1
### Interact with Facebook Page

1. Visit the following [Test Page](https://www.facebook.com/profile.php?id=100088974336410) in Facebook
2. Send a message!
    - Hi, Hello, Good morning
3. Enquire about a product
    - /desc, /price, /shipping, /buy followed by Product SKU
    - Product catalog can be found [here](https://raw.githubusercontent.com/BestBuyAPIs/open-data-set/master/products.json)

## Task 2
1. Send transactions data to `POST /duplicate-transaction`
2. Sample request body:
```
[
  {
    "id": 3,
    "sourceAccount": "A",
    "targetAccount": "B",
    "amount": 100,
    "category": "eating_out",
    "time": "2018-03-02T10:34:30.000Z"
  },
  {
    "id": 1,
    "sourceAccount": "A",
    "targetAccount": "B",
    "amount": 100,
    "category": "eating_out",
    "time": "2018-03-02T10:33:00.000Z"
  },
  {
    "id": 6,
    "sourceAccount": "A",
    "targetAccount": "C",
    "amount": 250,
    "category": "other",
    "time": "2018-03-02T10:33:05.000Z"
  },
  {
    "id": 4,
    "sourceAccount": "A",
    "targetAccount": "B",
    "amount": 100,
    "category": "eating_out",
    "time": "2018-03-02T10:36:00.000Z"
  },
  {
    "id": 2,
    "sourceAccount": "A",
    "targetAccount": "B",
    "amount": 100,
    "category": "eating_out",
    "time": "2018-03-02T10:33:50.000Z"
  },
  {
    "id": 5,
    "sourceAccount": "A",
    "targetAccount": "C",
    "amount": 250,
    "category": "other",
    "time": "2018-03-02T10:33:00.000Z"
  }
]
```
