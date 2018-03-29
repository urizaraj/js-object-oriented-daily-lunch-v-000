const ids = {
  customer: 0
}

class Customer {
  constructor(name, employer) {
    this.id = ++ids.customer
    this.name = name
    this.employerId = employer.id
  }
}
