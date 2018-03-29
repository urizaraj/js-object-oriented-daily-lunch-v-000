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

  hasMany(typeId, plural) {
    return store[plural].filter(instance => {
      return instance[typeId] === this.id
    })
  }

  hasManyThrough(type, through) {
    return this[through]().map(instance => {
      return instance[type]()
    })
  }
}

class Customer extends Model {
  constructor(name, employer) {
    super('customers')
    this.name = name
    this.employerId = (employer ? employer.id : null)
  }

  totalSpent() {}

  deliveries() { return this.hasMany('customerId', 'deliveries')}
  meals() { return this.hasManyThrough('meal', 'deliveries') }
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

  deliveries() {return this.hasMany('mealId', 'deliveries')}
  customers() {return this.hasManyThrough('customer', 'deliveries')}
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

  employees() {return this.hasMany('employerId', 'customers')}
  deliveries() {
    let result = this.hasManyThrough('deliveries', 'employees')
    return [].concat(...result)
  }

  meals() {
    let meals = this.hasManyThrough('meals', 'deliveries')
    let result = {}
    [].concat(...meals).forEach(meal => {
      result[meal.name] = 0
    })
    return Object.keys(result)
  }
}
