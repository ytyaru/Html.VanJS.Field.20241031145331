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



    a.fin()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

