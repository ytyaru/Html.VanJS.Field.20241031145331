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
    })();
    ;(function(){
        const name = new Field('name', 'String', 'Yamada', true)
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
    })();
    ;(function(){
        const name = new Field('name', 'String', 'Yamada')
        //a.t(Type.isIns(name, Field))
        //a.t(Type.isProxy(name, Field))
        a.t(name instanceof Field)
        //a.t(name instanceof Proxy)
        console.log(name)
        console.log(Object.getOwnPropertyNames(name))
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t('Yamada'===name.v)
        a.e(TypeError, `'name' is immutable.`, ()=>name.v = 'Suzuki')
    })();
    ;(function(){
        const name = new Field('name', 'String', 'Yamada', true)
        a.t(Type.isIns(name, Field))
        console.log(name)
        console.log(Object.getOwnPropertyNames(name))
        a.t('name'===name.n)
        a.t('String'===name.t)
        a.t('Yamada'===name.v)
        name.v = 'Suzuki'
        a.t('Suzuki'===name.v)
    })();
    a.fin()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

