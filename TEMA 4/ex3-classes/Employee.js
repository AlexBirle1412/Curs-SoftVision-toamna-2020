//import Person from "./Person";

class Employee extends Person {
  constructor(description, salary) {
    super(description);
    this.salary = salary;
  }

  loveThisSongs(song) {
    this.favouriteSongs.push(song);
  }

  canManageOtherPeople(flag) {
    if (flag) return true;
    return false;
  }

  canDig(muscle) {
    if (muscle) return true;
    return false;
  }
  isAGenius() {
    if (this.favouriteSongs.length >= 3) return true;
    return false;
  }
}

let p = new Person({ name: "Jack", age: 33 });
let e = new Employee({ name: "Zack", age: 22 }, 300);
console.log(p.canWalk());
console.log(p.loveSport());
console.log(e.canManageOtherPeople(true));
console.log(e.canDig(false));
e.loveThisSongs("Ave Maria");
e.loveThisSongs("The mark man");
e.loveThisSongs("Tako");
e.loveThisSongs("Teimour Radjabov");
console.log(e.isAGenius());

//module.export = Employee;
