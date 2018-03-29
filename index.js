const ids = {
  customer: 0
  meal: 0
}

const store = {
  deliveries: []
}

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
