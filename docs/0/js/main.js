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
        name.someKey = 'someValue'
        a.f('someKey' in name) // Object.freeze(this) されているため追加されない。代入時点で例外発生したい。Proxyは嫌。
    })();
    ;(function(){
        const name = new Field('name', 'String', 'Yamada')
        a.t(Type.isIns(name, Field))
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

