
window.components = new BetaJS.Collections.Collection({objects: [

    {value  : 'swipeclickcontainer'},
    {value  : 'clicktestcontainer'},
    {value  : 'eventitem'},
    {value  : 'swipecontainer'},

    //Titledlist
    {value  : 'titledlist'},
    {value  : 'test_titledlist'},
    {value  : 'test_titledlist_swipe'},
    {value  : 'addtitle'},

    //Titledlist
    {value  : 'searchlist'},
    {value  : 'test_searchlist'},

    //List
    {value  : 'list'},
    {value  : 'test_list_clickitem'},
    {value  : 'test_list_listoflist'},
    {value  : 'test_list_swipecontainer'},
    {value  : 'test_list_listcollection'},
    {value  : 'test_list_pushfunc'},

    //Itemmizablelist
    //{value  : 'test_list_different_listitems'},

    //Web -
    {value  : 'header'},
    {value  : 'menu'},
    {value  : 'layout_web'},

    // List - Listitems
    {value  : 'clickitem'},
    {value  : 'selectableitem'},

    //Check Below!!

    //Inputs
    //{value  : 'scrollpicker'},

    //other
    {value  : 'test_searchlist'},
    {value  : 'searchlist'},
    {value  : 'test_valuedlist_childlist'},
    {value  : 'test_valuedlist'},
    {value  : 'test_valuedlist_pushfunc'},
    {value  : 'test_valuedlist_pushintochild'},
    {value  : 'test_attrs'},
    {value  : 'valuedlist'},
    {value  : 'test_addvalue'},
    {value  : 'test_pushfunc'},
    {value  : 'pushfunc'},
    {value  : 'test_valuedlistswipe'},

    //{value  : 'addvalue'},
    {value  : 'overlaycontainer'},
    {value  : 'overlaycontainertest'}
]});

window.componentsByvalue = function (value) {
    var comp = window.components;
    for (var i = 0; i < comp.count(); ++i)
        if (comp.getByIndex(i).get("value") == value)
            return comp.getByIndex(i);
    return null;
};
