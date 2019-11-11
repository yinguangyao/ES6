import mixin from './lib/mixin.js'

class Parent1 {
    p1() {
        console.log('this is parent1')
    }
}
class Parent2 {
    test2 = () => {}
    p2() {
        console.log('this is parent2')
    }
}
class Parent3 {
    p3() {
        console.log('this is parent3')
    }
}

@mixin(Parent1, Parent2, Parent3)
class Child {
    c1 = () => {
        console.log('this is child')
    }
}

const child = new Child();
console.log(child);