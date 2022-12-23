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

## Task 3
### How to solve the high volume of write operations in RDS MySQL databases?
- Analyze slow SQL statements from logs and optimize them based on analysis result. For example: 
  - Add missing indexes or remove unused indexes
  - Too many rows to scan -> data housekeeping
  - Avoid using multiple OR condition & instead split the query that utilize the defined indexes
  - SELECT only fields that you need, instead of everything (*)
  - Unsuitable table structure design
- When executing large write operation, such as deleting a large number of rows, it is advisable to split the transaction into batches.
This prevents maxing out the I/O of your instance and reduces the flushes of dirty pages to the disk.
- Tune DB parameters, such as increasing:
  - `innodb_max_dirty_pages_pct`: the percentage of dirty pages allowed in the buffer pool.
  - `innodb_io_capacity`: the maximum number of I/O operations allowed by InnoDB per second for each background task. This value affects the speed at which RDS flushes dirty pages to the disk and writes data to the buffer pool.
  - `innodb_io_capacity_max`: the maximum number of I/O operations allowed by InnoDB per second for each background task when the flushing activity falls behind.
  - Upgrade DB instance specification
