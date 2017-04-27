
window.components = new BetaJS.Collections.Collection({objects: [

    //Swipecontainers
    {value  : 'hoverbuttoncontainer'},
    {value  : 'swipeclickcontainer'},
    {value  : 'eventitem'},

    //Web -
    {value  : 'layout_web'},
    {value  : 'menu_web'},
    {value  : 'header'},

    //Inputs
    {value  : 'scrollpicker'},
    {value  : 'test_scrollpicker'},
    {value  : 'textinput'},
    {value  : 'clickinput'},

    // List - Listitems
    {value  : 'test_selectableitem'},
    {value  : 'selectableitem'},
    {value  : 'clickitem'},

    //Titledlist
    {value  : 'addtitle'},
    {value  : 'titledlist'},
    {value  : 'test_titledlist'},
    {value  : 'test_titledlist_swipe'},

    //List
    {value  : 'test_list_loadmore'},
    {value  : 'list'},
    {value  : 'test_list_clickitem'},
    {value  : 'test_list_listoflist'},
    {value  : 'test_list_swipecontainer'},
    {value  : 'test_list_listcollection'},
    {value  : 'test_list_pushfunc'},

    //Titledlist
    {value  : 'searchlist'},
    {value  : 'test_searchlist'},

    //Itemmizablelist
    //{value  : 'test_list_different_listitems'},
    //Check Below!!

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
    {value  : 'testoverlaycontainer'}
]});

window.componentsByvalue = function (value) {
    var comp = window.components;
    for (var i = 0; i < comp.count(); ++i)
        if (comp.getByIndex(i).get("value") == value)
            return comp.getByIndex(i);
    return null;
};
