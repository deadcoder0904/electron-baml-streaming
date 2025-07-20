generator typescript {
  output_type "typescript"
  output_dir "../"
  version "0.202.1"
}

type Gender = "male" | "female" 

class Address {
  id int
  street string
  streetName string
  buildingNumber string
  city string
  zipcode string
  country string
  country_code string
  latitude float
  longitude float
}

class User {
  id int @stream.done
  firstname string @stream.not_null
  lastname string @stream.not_null
  email string
  phone string
  birthday string
  gender Gender @stream.not_null
  address Address @stream.with_state
}

function GenerateRandomUser() -> User {
  prompt #"
  Generate a random user with realistic fake data including:
  - A unique ID
  - First and last name
  - Valid email address
  - Phone number with country code
  - Birthday in YYYY-MM-DD format
  - Gender (male/female)
  - Complete address with all fields (street, city, country, coordinates, etc.)

  Make the data diverse and realistic but completely fictional.
  {{ ctx.output_format }}
  "#
  client CerebrasClient
}

test TestGenerateRandomUser {
  functions [GenerateRandomUser]
  args {}
  @@assert( {{ this.id > 0 }} )
  @@assert( {{ this.firstname|length > 0 }} )
  @@assert( {{ this.lastname|length > 0 }} )
}
