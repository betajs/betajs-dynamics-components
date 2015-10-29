
window.components = new BetaJS.Collections.Collection({objects: [
    {title  : 'test_pushinto_childlist'},
    {title  : 'test_pushinto_child'},
    {title  : 'test_titledlist_pushfunc'},
    {title  : 'testlist_pushfunc_new'},
    {title  : 'test_titledlist'},
    {title  : 'titledlist'},
    {title  : 'test_addtitle'},
    {title  : 'testlist_pushfunc'},
    {title  : 'test_pushfunc'},
    {title  : 'pushfunc'},
    {title  : 'test_searchlist'},
    {title  : 'searchlist'},
    {title  : 'test_titledlistswipe'},
    {title  : 'testlist_listoflist'},
    {title  : 'testlist_listcollection'},
    {title  : 'test_selectableitem'},
    {title  : 'testlist_clickitem'},
    {title  : 'testlist_swipecontainer'},
    //{title  : 'addtitle'},
    {title  : 'overlaycontainer'},
    {title  : 'overlaycontainertest'},
    {title  : 'scrollpicker'},
    {title  : 'swipecontainer'},
    {title  : 'clickitem'},
    {title  : 'selectableitem'},
    {title  : 'list'}
]});

window.componentsBytitle = function (title) {
    var comp = window.components;
    for (var i = 0; i < comp.count(); ++i)
        if (comp.getByIndex(i).get("title") == title)
            return comp.getByIndex(i);
    return null;
};
