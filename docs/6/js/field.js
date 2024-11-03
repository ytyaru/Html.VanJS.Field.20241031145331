;(function(){
class Field { // undefinedは絶対代入させない。null,代入は許可制。
    #_; #v; #on;
    static of(...args) {return new Field(...args)}
    static #NAMES = 'Boolean,Integer,BigInt,Float,String,Symbol,Function,AsyncFunction,GeneratorFunction,AsyncGeneratorFunction,Error,Class,Instance,Promise,Iterator,Object,Array,Map,Set,WeakMap,WeakSet,Proxy,Date,Regexp,URL,Element,Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,BigInt64Array,BigUint64Array,Float16Array,Float32Array,Float64Array,ArrayBuffer,SharedArrayBuffer,DataView'.split(',')
    static get NAMES() {return this.#NAMES}
    static #ON = Object.freeze({
        before:(v,o,k)=>{},
        validate:(v,o,k)=>true,
        invalid:(v,o,k)=>{throw new TypeError(`Invalid value.`)},
        valid:(n,o,k)=>n,
        set:(n,o,k)=>{},
        unset:(n,o,k)=>{},
        change:(n,o,k)=>{},
        unchange:(n,o,k)=>{},
        after:(n,o,k)=>{},
    })
    static #V = [
        ['Boolean', false],
        ['Integer', 0],
        ['BigInt', 0n],
        ['Float', 0.0],
        ['String', ''],
        ['Object', {}],
        ['Array', []],
        ['Class<Error>', Error],
        ['Symbol', ()=>Symbol()],
        ['Function', ()=>(()=>{})],
        ['AsyncFunction', ()=>(async()=>{})],
        ['GeneratorFunction', ()=>(function*(){yield undefined})],
        ['AsyncGeneratorFunction', ()=>(async function*(){yield undefined})],
        ['Error', ()=>(new Error())],
        ['Class', ()=>(class{})],
        ['Instance', ()=>new (class{})()],
        ['Promise', ()=>new Promise(()=>{})],
        ['Proxy', ()=>new Proxy({},{})],
        ['Element', ()=>document.createElement('p')],
    ]
    constructor(name, type, value, nullable=false, mutable=false, getter=null, setter=null) {
        const v = undefined===value ? (nullable ? null : this.#getDefaultValue(type)) : value
        this.#_ = Object.freeze({name:name, type:type, value:v, mutable:mutable, nullable:nullable, getter:getter, setter:this.#makeSetter(setter)})
        this.#v = v
        this.#valid()
        return new Proxy(this, {
            get:(t,k)=>{
                if (k in t) { return 'function'===typeof t[k] ? t[k].bind(t)
                    : ('v'===k && Type.isFn(this.#_.getter) ? this.#_.getter(this.#v, this.#_.name, t) : t[k]) }
                else { throw new TypeError(`'${k}' is invalid property name. valid name is 'n','t','v','m'.`) }
            },
            set:(t,k,v)=>{
                if ('v'===k) {
                    if (Type.isFn(this.#_.setter)) {this.#_.setter(v,k,t)}
                    else {t[k] = v}
                }
                else {throw new TypeError(`Read only.`)}
            },
        })
    }
    get n() { return this.#_.name }
    get t() { return this.#_.type }
    get v() { return this.#v }
    set v(v) {
        this.#throwImmutable(v)
        this.#throwNullable(v)
        this.#throwType(v)
        this.#v=v
    }
    #throwType(v){if (!(null===v && this.#_.nullable) && !Type[`is${this.#_.type}`](v)){throw new TypeError(`Invalid type.`)}}
    #throwNullable(v) {if (null===v && !this.#_.nullable){throw new TypeError(`'${this.#_.name}' is not nullable.`)}}
    #throwImmutable(v) {if (!this.#_.mutable){throw new TypeError(`'${this.#_.name}' is immutable.`)}}
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
        //if (type.endsWith('?')) { return null }
        if (this.#_.nullable) { return null }
        const p = this.#V.filter(([t,v])=>t===this.#_.type).map(([t,v])=>v)
        return 0===p.length ? new Function(`return new ${type}()`)() : p[0][1]
        //const p = this.#V.filter(([t,v])=>t===this.#_.type)
        //return 0===p.length ? new Function(`return new ${type}()`)() : p[0]
        /*
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
        */
    }
    #validOn(on) {
        const keys = [...Object.keys(Field.#ON)]
        console.log(on, Object.keys(on), Object.keys(on).length)
        if (0===Object.keys(on).length){throw new TypeError(`The argument 'setter' object should have one or more key: : ${keys}`)}
        for (let [k,v] of [...Object.entries(on)]) {
            if (!keys.some(K=>K===k)) {throw new TypeError(`The key of the argument 'setter' object should be one of the following:: actual:${k}, expected:${keys}`)}
            if (!Type.isFn(v)) {throw new TypeError(`All keys in the 'setter' object should be functions. actual: ${k} ${Type.getName(v)}`)}
        }
        return true
    }
    #makeSetter(setter) {
        console.log(setter)
        if (Type.isFn(setter)) {return setter}
        else if (Type.isObj(setter)) {
            this.#validOn(setter)
            this.#on = Object.freeze({...Field.#ON, ...setter})
            return (v,k,t)=>{
                const o = this.#v
                this.#on.before(v, o, k)
                this.#throwNullable(v)
                this.#throwType(v)
                const n = (this.#on.validate(v,o,k) ? this.#on.valid : this.#on.invalid)(v, o, k)
                if (n!==undefined) {this.v = n}
                this.#on[`${((n===undefined) ? 'un' : '')}set`](n,o,k);
                (o===n ? this.#on.unchange : this.#on.change)(n, o, k);
                this.#on.after(n, o, k)
            }
        }
        else {return null}
    }
}
window.Field = Object.freeze(Field)
})();
