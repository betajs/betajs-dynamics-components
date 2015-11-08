
window.components = new BetaJS.Collections.Collection({objects: [
    {title  : 'selectableitem'},
    {title  : 'test_selectableitem'},
    {title  : 'test_attrs'},
    {title  : 'test_pushinto_childlist'},
    {title  : 'test_pushinto_child'},
    {title  : 'test_titledlist_pushfunc'},
    {title  : 'testlist_pushfunc_new'},
    {title  : 'test_titledlist'},
    {title  : 'titledlist'},
    {title  : 'test_addtitle'},
    {title  : 'test_list_pushfunc'},
    {title  : 'test_pushfunc'},
    {title  : 'pushfunc'},
    {title  : 'test_searchlist'},
    {title  : 'searchlist'},
    {title  : 'test_titledlistswipe'},
    {title  : 'test_list_listoflist'},
    {title  : 'test_list_listcollection'},
    {title  : 'test_list_clickitem'},
    {title  : 'test_list_swipecontainer'},
    //{title  : 'addtitle'},
    {title  : 'overlaycontainer'},
    {title  : 'overlaycontainertest'},
    {title  : 'scrollpicker'},
    {title  : 'swipecontainer'},
    {title  : 'clickitem'},
    {title  : 'list'}
]});

window.componentsBytitle = function (title) {
    var comp = window.components;
    for (var i = 0; i < comp.count(); ++i)
        if (comp.getByIndex(i).get("title") == title)
            return comp.getByIndex(i);
    return null;
};
