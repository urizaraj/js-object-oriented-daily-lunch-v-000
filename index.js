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

class Model {
  constructor(type) {
    this.id = ++ids[type]
    store[type].push(this)
  }
}

class Customer extends Model {
  constructor(name, employer) {
    super('customers')
    this.name = name
    // this.employerId = employer.id
  }
}

class Meal extends Model {
  constructor(title, price) {
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
