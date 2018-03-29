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

  belongsTo(typeId, plural) {
    return store[plural].find(instance => {
      return instance.id === this[typeId]
    })
  }
}

class Customer extends Model {
  constructor(name, employer) {
    super('customers')
    this.name = name
    // this.employerId = employer.id
  }

  totalSpent() {}

  deliveries() {
    return store.deliveries.filter(d => {
      return d.customerId === this.id
    })
  }

  meals() {
    return this.deliveries().map(d => {
      return d.meal()
    })
  }
}

class Meal extends Model {
  constructor(title, price) {
    super('meals')
    this.title = title
    this.price = price
  }

  static byPrice() {
    return store.meals.slice().sort((a, b) => {
      return b.price - a.price
    })
  }
}

class Delivery extends Model {
  constructor(meal, customer) {
    super('deliveries')
    this.mealId = (meal ? meal.id : null)
    this.customerId = (customer ? customer.id : null)
  }

  customer() { return this.belongsTo('customerId', 'customers') }

  meal() { return this.belongsTo('mealId', 'meals') }
}

class Employer extends Model {
  constructor(name) {
    super('employers')
    this.name = name
  }
}
