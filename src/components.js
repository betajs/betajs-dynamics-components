
window.components = new BetaJS.Collections.Collection({objects: [
    {value  : 'scrollpicker'},
    {value  : 'test_searchlist'},
    {value  : 'searchlist'},
    {value  : 'test_valuedlist_childlist'},
    {value  : 'test_valuedlist'},
    {value  : 'test_valuedlist_pushfunc'},
    {value  : 'test_valuedlist_pushintochild'},
    {value  : 'selectableitem'},
    {value  : 'test_selectableitem'},
    {value  : 'test_attrs'},
    {value  : 'testlist_pushfunc_new'},
    {value  : 'valuedlist'},
    {value  : 'test_addvalue'},
    {value  : 'test_list_pushfunc'},
    {value  : 'test_pushfunc'},
    {value  : 'pushfunc'},
    {value  : 'test_valuedlistswipe'},
    {value  : 'test_list_listoflist'},
    {value  : 'test_list_listcollection'},
    {value  : 'test_list_clickitem'},
    {value  : 'test_list_swipecontainer'},
    //{value  : 'addvalue'},
    {value  : 'overlaycontainer'},
    {value  : 'overlaycontainertest'},
    {value  : 'swipecontainer'},
    {value  : 'clickitem'},
    {value  : 'list'}
]});

window.componentsByvalue = function (value) {
    var comp = window.components;
    for (var i = 0; i < comp.count(); ++i)
        if (comp.getByIndex(i).get("value") == value)
            return comp.getByIndex(i);
    return null;
};
