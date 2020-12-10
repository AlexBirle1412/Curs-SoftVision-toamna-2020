export class Human {
    constructor(name,age,IQ) {
        this.name = name;
        this.age = age;
        this.IQ = IQ;
    }
    canSing() {
        console.log(this.name + " can sing");
    }

    canWritePoemsSing(flag) {
       if(Boolean(flag) && this.IQ>80 ) console.log(this.name + " can write poems");
       else console.log(this.name + " can not write poems")
    }

    get Name() {
        return this.name;
    }

    set Name(anotherName) {
         this.name=anotherName;
    }
    get Age() {
        return this.age;
    }

    set Age(newAge) {
         this.age=newAge;
    }
    get _IQ() {
        return this.IQ;
    }

    set _IQ(newIQ) {
         this.IQ=newIQ;
    }

    
}