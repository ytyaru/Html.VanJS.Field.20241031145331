window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    const author = 'ytyaru'
    van.add(document.querySelector('main'), 
        van.tags.h1(van.tags.a({href:`https://github.com/${author}/Html.VanJS.Field.20241031145331/`}, 'Field')),
        van.tags.p('Fieldを作成する。'),
//        p('Create a field.'),
    )
    van.add(document.querySelector('footer'),  new Footer('ytyaru', '../').make())

    const a = new Assertion()
    const bb = new BlackBox(a)
    a.t(Type.isCls(Field))
    a.t(Type.isStrs(Field.NAMES))
    ;(function(){
        const name = new Field('name', 'String')
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        console.log(name.v)
        a.t(''===name.v)
        a.e(TypeError, `'name' is immutable.`, ()=>name.v = 'Suzuki') // 値は変更不可(mutable:falseのため)
        a.e(TypeError, `'name' is immutable.`, ()=>name.v = null) // 値は変更不可(mutable:falseのため)
    })();
    ;(function(){
        const name = new Field('name', 'String', 'Yamada')
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t('Yamada'===name.v)
        a.e(TypeError, `'name' is immutable.`, ()=>name.v = 'Suzuki') // 値は変更不可(mutable:falseのため)
        a.e(TypeError, `'name' is immutable.`, ()=>name.v = null) // 値は変更不可(mutable:falseのため)
    })();
    ;(function(){
        const name = new Field('name', 'String', 'Yamada', true) // nullable
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t('Yamada'===name.v)
        a.e(TypeError, `'name' is immutable.`, ()=>name.v = 'Suzuki') // 値は変更不可(mutable:falseのため)
        a.e(TypeError, `'name' is immutable.`, ()=>name.v = null) // 値は変更不可(mutable:falseのため)
    })();
    ;(function(){
        const name = new Field('name', 'String', 'Yamada', false, true) // mutable
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t('Yamada'===name.v)
        name.v = 'Suzuki'
        a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        a.e(TypeError, `'name' is not nullable.`, ()=>name.v = null) // 値は変更不可(mutable:falseのため)
        a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
    })();
    ;(function(){
         // nullable:falseなのにnullをセットしようとした
        a.e(TypeError, `'name' is not nullable.`, ()=>new Field('name', 'String', null))
    })();
    ;(function(){
        const name = new Field('name', 'String', '', false, true) // nullable:falseなのにnullをセットしようとした
        a.e(TypeError, `'name' is not nullable.`, ()=>name.v = null)
    })();
    ;(function(){
        const name = new Field('name', 'String', null, true)
        a.t(null===name.v)
    })();
    ;(function(){
        const name = new Field('name', 'String', null, true, true) // nullable, mutable
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t(null===name.v)
        name.v = 'Suzuki'
        a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        name.v = null
        a.t(null===name.v) // 値は変更可(mutable:trueのため)
    })();
    ;(function(){ // getter
        const name = new Field('name', 'String', null, true, true, (v,k,t)=>`'${k}' value.`)
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        //a.t(null===name.v)
        console.log(name.v)
        a.t(`'name' value.`===name.v)
        name.v = 'Suzuki'
        //a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        a.t(`'name' value.`===name.v)
        name.v = null
        //a.t(null===name.v) // 値は変更可(mutable:trueのため)
        a.t(`'name' value.`===name.v)
    })();
    ;(function(){ // setter
        const name = new Field('name', 'String', null, true, true, null, (v,k,t)=>t.v=`S:${v}`)
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t(null===name.v)
        console.log(name.v)
        //a.t(`'name' value.`===name.v)
        name.v = 'Suzuki'
        //a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        //a.t(`'name' value.`===name.v)
        a.t('S:Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        name.v = null
        //a.t(null===name.v) // 値は変更可(mutable:trueのため)
        //a.t(`'name' value.`===name.v)
        a.t(`S:null`===name.v)
    })();
    ;(function(){ // getter & setter
        const name = new Field('name', 'String', null, true, true, (v,k,t)=>`G:${v}`, (v,k,t)=>t.v=`S:${v}`)
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t('G:null'===name.v)
        name.v = 'Suzuki'
        a.t('G:S:Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        name.v = null
        a.t(`G:S:null`===name.v)
    })();
    ;(function(){ // setter:{}
        a.e(TypeError, `The argument 'setter' object should have one or more key: : before,validate,invalid,valid,set,unset,change,unchange,after`, ()=>new Field('name', 'String', null, true, true, null, {}))
    })();
    ;(function(){ // setter:{InvalidKey:'InvalidValue'}
        a.e(TypeError, `The key of the argument 'setter' object should be one of the following:: actual:InvalidKey, expected:before,validate,invalid,valid,set,unset,change,unchange,after`, ()=>new Field('name', 'String', null, true, true, null, {InvalidKey:'InvalidValue'}))
    })();
    ;(function(){ // setter:{before:'InvalidValue'}
        a.e(TypeError, `All keys in the 'setter' object should be functions. actual: before String`, ()=>new Field('name', 'String', null, true, true, null, {before:'InvalidValue'}))
    })();
    ;(function(){ // setter:{before}
        let x=0
        const name = new Field('name', 'String', null, true, true, null, {before:()=>++x})
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t(null===name.v)
        a.t(0===x)
        name.v = 'Suzuki'
        a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        a.t(1===x)
        name.v = null
        a.t(null===name.v)
        a.t(2===x)
    })();
    ;(function(){ // setter:{after}
        let x=0
        const name = new Field('name', 'String', null, true, true, null, {after:()=>++x})
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t(null===name.v)
        a.t(0===x)
        name.v = 'Suzuki'
        a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        a.t(1===x)
        name.v = null
        a.t(null===name.v)
        a.t(2===x)
    })();
    ;(function(){ // setter:{validate,invalid}
        let x=0
        const name = new Field('name', 'String', 'Yamada', false, true, null, {
            validate:(v)=>Type.isStr(v) && /^[_A-Z][_a-zA-Z0-9]*$/.test(v),
            invalid:(n,o)=>{throw new TypeError(`Invalid format: '${n}'`)}
        })
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t('Yamada'===name.v)
        name.v = 'Suzuki'
        a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        a.e(TypeError, `'name' is not nullable.`, ()=>name.v = null)
        a.e(TypeError, `Invalid format: ''`, ()=>name.v = '')
        a.e(TypeError, `Invalid format: 'a'`, ()=>name.v = 'a')
        a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        //a.t(null===name.v)
    })();
    ;(function(){ // setter:{valid}
        const name = new Field('name', 'String', 'Yamada', false, true, null, {
            valid:(n,o)=>`V:${n}`,
        })
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t('Yamada'===name.v)
        name.v = 'Suzuki'
        a.t('V:Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        a.e(TypeError, `'name' is not nullable.`, ()=>name.v = null)
//        a.e(TypeError, `Invalid format: ''`, ()=>name.v = '')
//        a.e(TypeError, `Invalid format: 'a'`, ()=>name.v = 'a')
        a.t('V:Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        //a.t(null===name.v)
    })();
    ;(function(){ // setter:{set}
        let x=0
        const name = new Field('name', 'String', 'Yamada', false, true, null, {
            set:(n,o)=>++x,
        })
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t('Yamada'===name.v)
        a.t(0===x)
        name.v = 'Suzuki'
        a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        console.log(x)
        a.t(1===x)
        a.e(TypeError, `'name' is not nullable.`, ()=>name.v = null)
    })();
    ;(function(){ // setter:{unset}
        let x=0
        const odd = new Field('odd', 'Integer', 1, false, true, null, {
            validate:(v,o)=>1===v % 2,
            invalid:(v,o)=>undefined,
            unset:(n,o)=>++x,
        })
        a.t('n' in odd)
        a.t('t' in odd)
        a.t('v' in odd)
        a.e(TypeError, `Read only.`, ()=>odd.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>odd.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>odd.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in odd) 
        a.t('odd'===odd.n)
        a.t('Integer'===odd.t)
        a.t(1===odd.v)
        a.t(0===x)
        odd.v = 2
        a.t(1===odd.v)  // 偶数は無効値でありinvalidが実行されundefinedが代入されようとするが、undの時は代入せずunsetする
        a.t(1===x)      // unsetが実行された
        odd.v = 3
        a.t(3===odd.v)  // 奇数は有効値でありvalidが実行され代入される
        a.t(1===x)      // unsetが実行されない
        odd.v = 4
        a.t(3===odd.v)  // 偶数は無効値でありinvalidが実行されundefinedが代入されようとするが、undの時は代入せずunsetする
        a.t(2===x)      // unsetが実行された
        a.e(TypeError, `'odd' is not nullable.`, ()=>odd.v = null)
    })();
    ;(function(){ // setter:{change}
        let x=0
        const name = new Field('name', 'String', 'Yamada', false, true, null, {
            change:(n,o)=>++x,
        })
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t('Yamada'===name.v)
        a.t(0===x)

        name.v = 'Suzuki'
        a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        a.t(1===x)             // 変更されたためchange()が実行される

        name.v = 'Suzuki'      // 現在と同じ値を代入する
        a.t('Suzuki'===name.v) 
        a.t(1===x)             // 変更されていないためchange()は実行されず

        a.e(TypeError, `'name' is not nullable.`, ()=>name.v = null)
        a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        a.t(1===x)

        name.v = 'Tanaka'
        a.t('Tanaka'===name.v) // 値は変更可(mutable:trueのため)
        a.t(2===x)
    })();
    ;(function(){ // setter:{unchange}
        let x=0
        const name = new Field('name', 'String', 'Yamada', false, true, null, {
            unchange:(n,o)=>++x,
        })
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t('Yamada'===name.v)
        a.t(0===x)

        name.v = 'Suzuki'
        a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        a.t(0===x)             // 変更されたためunchange()は実行されず

        name.v = 'Suzuki'      // 現在と同じ値を代入する
        a.t('Suzuki'===name.v) 
        a.t(1===x)             // 変更されていないためunchange()が実行される

        a.e(TypeError, `'name' is not nullable.`, ()=>name.v = null)
        a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        a.t(1===x)

        name.v = 'Tanaka'
        a.t('Tanaka'===name.v)
        a.t(1===x)             // 変更されたためunchange()は実行されず
    })();
    ;(function(){ // setter:{after}
        let x=0
        const name = new Field('name', 'String', null, true, true, null, {after:()=>++x})
        a.t('n' in name)
        a.t('t' in name)
        a.t('v' in name)
        a.e(TypeError, `Read only.`, ()=>name.n = 'x') // 名は変更不可
        a.e(TypeError, `Read only.`, ()=>name.t = 'x') // 型は変更不可
        a.e(TypeError, `Read only.`, ()=>name.x = 'x') // 新しいプロパティを追加することはできない。
        a.f('x' in name) 
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t(null===name.v)
        a.t(0===x)
        name.v = 'Suzuki'
        a.t('Suzuki'===name.v) // 値は変更可(mutable:trueのため)
        a.t(1===x)
        name.v = null
        a.t(null===name.v)
        a.t(2===x)
    })();










    a.fin()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

