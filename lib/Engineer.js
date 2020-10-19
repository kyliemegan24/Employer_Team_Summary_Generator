const Employee = require('../lib/Employee');

class Engineer extends Employee {
  constructor(name, id, email, GithubUser) {
    super(name, id, email);

    this.github = GithubUser;
  }

  getRole() {
    return "Engineer";
  }

  getGithub() {
    return this.github;
  }
}


module.exports = Engineer;