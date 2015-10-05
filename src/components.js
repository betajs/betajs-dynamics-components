
window.components = new BetaJS.Collections.Collection({objects: [
    {title  : 'test_searchlist'},
    {title  : 'searchlist'},
    {title  : 'test_titledlistswipe'},
    {title  : 'testlist_listoflist'},
    {title  : 'testlist_listcollection'},
    {title  : 'testtitledlist'},
    {title  : 'test_selectableitem'},
    {title  : 'testlist_clickitem'},
    {title  : 'testlist_swipecontainer'},
    //{title  : 'titledlist'}},
    {title  : 'testaddtitle'},
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
