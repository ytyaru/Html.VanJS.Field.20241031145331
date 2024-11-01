;(function(){
class Field { // undefinedは絶対代入させない。null,代入は許可制。
    #_; #v;
    static of(...args) {return new Field(...args)}
    static #NAMES = 'Boolean,Integer,BigInt,Float,String,Symbol,Function,AsyncFunction,GeneratorFunction,AsyncGeneratorFunction,Error,Class,Instance,Promise,Iterator,Object,Array,Map,Set,WeakMap,WeakSet,Proxy,Date,Regexp,URL,Element,Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,BigInt64Array,BigUint64Array,Float16Array,Float32Array,Float64Array,ArrayBuffer,SharedArrayBuffer,DataView'.split(',')
    static get NAMES() {return this.#NAMES }
    constructor(name, type, value, nullable=false, mutable=false, getter=null, setter=null) {
        const v = undefined===value ? (nullable ? null : this.#getDefaultValue(type)) : value
        this.#_ = Object.freeze({name:name, type:type, value:v, mutable:mutable, nullable:nullable})
        this.#v = v
        this.#valid()
        return new Proxy(this, {
            get(t,k){
                if (k in t) { return 'function'===typeof t[k] ? t[k].bind(t) : t[k] }
                else { throw new TypeError(`'${k}' is invalid property name. valid name is 'n','t','v','m'.`) }
            },
            set(t,k,v){
                if ('v'===k) {t[k] = v}
                else {throw new TypeError(`Read only.`)}
            },
        })
    }
    get n() { return this.#_.name }
    get t() { return this.#_.type }
    get v() { return this.#v }
    set v(v) {
        if (this.#_.mutable) {
            if (null===v) {
                if (this.#_.nullable){this.#v=v}
                else{throw new TypeError(`'${this.#_.name}' is not nullable.`)}
            }
            else if (!Type[`is${this.#_.type}`](v)){throw new TypeError(`Invalid type.`)}
            else {this.#v = v}
        } else {throw new TypeError(`'${this.#_.name}' is immutable.`)}
    }
    get m() { return this.#_.mutable }
    #valid() {
        if (!this.#validName(this.#_.name)){throw new TypeError(`Invalid name.`)}
        if (!this.#validType(this.#_.type)){throw new TypeError(`Invalid type.`)}
        console.log(this.#validValue(this.#_.value, this.#_.type))
        if (!this.#validValue(this.#_.value, this.#_.type)){throw new TypeError(`Invalid value.`)}
    }
    #validName(name) { return /^[_a-zA-Z][_a-zA-Z0-9]*$/.test(name) }
    #validType(type) { return Field.#NAMES.includes(type) }
    #validValue(value, type) {
        if (null===value) {
            if (this.#_.nullable) {return true}
            else {throw new TypeError(`'${this.#_.name}' is not nullable.`)}
        } else {
            const mNm = `is${type}`
            if (mNm in Type) {return Type[mNm](value)}
            else {return value instanceof new Function(`return ${type}`)()}
        }
    }
    #validGetter(getter, type) {}
    #validSetter(getter, type) {}
    #getDefaultValue(type) {
        if (type.endsWith('?')) { return null }
        switch (type) {
            case 'Boolean': return false
            case 'Integer': return 0
            case 'BigInt': return 0n
            case 'Float': return 0.0
            case 'String': return ''
            case 'Symbol': return Symbol()
            case 'Function': return (()=>{})
            case 'AsyncFunction': return (async()=>{})
            case 'GeneratorFunction': return (function*(){yield undefined})
            case 'AsyncGeneratorFunction': return (async function*(){yield undefined})
            case 'Error': return (new Error())
            case 'Class<Error>': return Error
            case 'Class': return (class{})
            case 'Instance': return new (class{})()
            case 'Promise': return new Promise(()=>{})
            case 'Object': return {}
            case 'Array': return []
            case 'Proxy': return new Proxy({},{})
            case 'Element': return document.createElement('p')
            default: return new Function(`return new ${type}()`)()
        }
    }
}
window.Field = Object.freeze(Field)
})();
