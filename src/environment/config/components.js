
window.components = new BetaJS.Collections.Collection({objects: [
    {title  : 'testtitledlist'},
    {title  : 'testtitledlistswipe'},
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
    {title  : 'list'},
    {title  : 'searchlist'}
]});

window.componentsBytitle = function (title) {
    var comp = window.components;
    for (var i = 0; i < comp.count(); ++i)
        if (comp.getByIndex(i).get("title") == title)
            return comp.getByIndex(i);
    return null;
};
