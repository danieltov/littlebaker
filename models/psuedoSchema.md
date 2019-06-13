# Models
- UserSchema
- ProfileSchema (with discriminators!)
	- SellerProfileSchema
	- BuyerProfileSchema
- ProductSchema
- MessageSchema

## UserSchema
- email: String
- password: String
- avatar: String
- accountType: ONE of: ['Seller', 'Buyer']
- joined: Date
- lastSeen: Date
- collection: 'users'

## Base ProfileSchema
- user: { ref 'users' }
- handle: String
- company: String
- website: String
- location: String
- headline: String
- description: String
- discriminatorKey: 'profileType'
- collection: 'profiles'

  **SellerProfileSchema**
  discriminatorKey: 'Seller'
  products: { ref: 'products' }

  **BuyerProfileSchema**
  discriminatorKey: 'Buyer'
  orders: { ref: 'products'  }

## ProductSchema
- seller: ONE Seller { ref: 'users' - can i target just Seller users? }
- buyers: MANY Buyers { ref: 'users' - can i target just Buyer users? }
- inventory: Number
- sold: Number
- price: Number
- category: [ String ]

## MessageSchema
- sender: {ref: 'users'}
- messages: [message, meta]
  - message: String
  - meta: [ { user, date } ]
- user: { ref: 'users' }
- date: Date
- participants: [ { user, date } ]
  - user: { ref: 'users' }
  - date: Date
