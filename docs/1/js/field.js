;(function(){
class Field {
    #_; #v;
    static of(...args) {return new Field(...args)}
    static #NAMES = 'Boolean,Integer,Bigint,Float,String,Symbol,Function,AsyncFunction,GeneratorFunction,AsyncGeneratorFunction,Error,Class,Instance,Promise,Iterator,Object,Array,Map,Set,WeakMap,WeakSet,Proxy,Date,Regexp,URL,Element,Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,BigInt64Array,BigUint64Array,Float16Array,Float32Array,Float64Array,ArrayBuffer,SharedArrayBuffer,DataView'.split(',')
    static get NAMES() {return this.#NAMES }
    constructor(name, type, value, mutable=false, getter=null, setter=null) {
        this.#valid(name, type, value, mutable, getter, setter)
        this.#_ = Object.freeze({name:name, type:type, value:value, mutable:mutable})
        this.#v = value
        return new Proxy(this, {
            get(t,k){
                if (k in t) { return 'function'===typeof t[k] ? t[k].bind(t) : t[k] }
                else { throw new TypeError(`'${k}' is invalid property name. valid name is 'n','t','v','m'.`) }
                //if ('toString'===k) {return t.v[k].bind(t) }
                /*    
                if ('n,t,v,toString'.split(',').some(K=>K===k)) {return t[k]}
                else if ('function'===typeof t[k])
                throw new TypeError(`'${k}' is invalid property name. valid name is 'n','t','v','m'.`)
                */
                /*
                if ('toString'===k) {return '' }
                else if ('n,t,v'.split(',').some(K=>K===k)) {return t[k]}
//                else if ('function'===typeof t[k])
                throw new TypeError(`'${k}' is invalid property name. valid name is 'n','t','v','m'.`)
                */
            },
            set(t,k,v){
                if ('v'===k) {t[k] = v}
                else {throw new TypeError(`Read only.`)}
            },
        })
//        return Object.freeze(this)
        /*
        Object.defineProperty(this, '_', {
            value: Object.freeze({name:name, type:type, value:value, mutable:mutable}),
            enumerable:false,
            configurable:false,
            writable:false,
        })
        this._value = value
        //Object.defineProperty(this, '_value', {value:value, enumerable:false, writable:true})
        //Object.defineProperty(this.constructor.prototype, 'v', {enumerable:true});
        //Object.defineProperty(Field.prototype, 'v', {enumerable:true});
        */
    }
    get n() { return this.#_.name }
    get t() { return this.#_.type }
    get v() { return this.#v }
    set v(v) {
        if (this.#_.mutable) {
            if (Type[`is${this.#_.type}`](v)) {this.#v = v}
            else {throw new TypeError(`Invalid type.`)}
        } else {throw new TypeError(`'${this.#_.name}' is immutable.`)}
    }
    get m() { return this.#_.mutable }
//    toString(...args) {return this.v.toString(...args)}
//    valueOf(){return this.v}
    #valid(name, type, value, mutable=false, getter=null, setter=null) {
        if (!this.#validName(name)){throw new TypeError(`Invalid name.`)}
        if (!this.#validType(type)){throw new TypeError(`Invalid type.`)}
        if (!this.#validValue(value,type)){throw new TypeError(`Invalid value.`)}
    }
    #validName(name) { return /^[_a-zA-Z][_a-zA-Z0-9]*$/.test(name) }
    #validType(type) { return Field.#NAMES.includes(type) }
    #validValue(value, type) { return Type.isCls(type) ? value instanceof type : Type[`is${type}`](value) }
    #validGetter(getter, type) {}
    #validSetter(getter, type) {}
}
//window.Field = Field
window.Field = Object.freeze(Field)
})();
