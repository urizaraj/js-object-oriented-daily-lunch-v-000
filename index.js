const ids = {}
const store = {}

const models = [
  'customers',
  'meals',
  'deliveries',
]

models.forEach(type => {
  ids[type] = 0
  store[type] = []
})

class Customer {
  constructor(name, employer) {
    this.id = ++ids.customer
    this.name = name
    this.employerId = employer.id
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++ids.meal
    this.title = title
    this.price = price
  }
}

class Delivery {
  constructor() {

  }
}
