const ids = {}
const store = {}
const models = [
  'customers',
  'meals',
  'deliveries',
  'employers'
]

models.forEach(type => {
  ids[type] = 0
  store[type] = []
})

class Customer {
  constructor(name, employer) {
    this.id = ++ids.customers
    this.name = name
    this.employerId = employer.id
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++ids.meals
    this.title = title
    this.price = price
  }
}

class Delivery {
  constructor(meal, customer) {
    this.mealId = meal.idea
    this.customerId = customer.id
    this.id = ++ids.deliveries
  }
}

class Model {
  constructor(type) {
    this.id = ++ids[type]
    store[type].push(this)
  }
}
