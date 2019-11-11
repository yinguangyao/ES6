const mixin = (...mixins) => (targetClass) => {
    function copyProperties(target, source) {
        for (let key of Reflect.ownKeys(source)) {
          if ( key !== 'constructor'
            && key !== 'prototype'
            && key !== 'name'
          ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
          }
        }
      }
    
      for (let mixin of mixins) {
        copyProperties(targetClass, mixin); // 拷贝静态属性
        copyProperties(targetClass.prototype, mixin.prototype); // 拷贝原型属性
      }
    
      return new Proxy(targetClass, {
        construct(target, args) {
          const obj = new target(...args);
          for (let mixin of mixins) {
              copyProperties(obj, new mixin()); // 拷贝实例属性
          }
          return obj;
        }
      });
}

export default mixin