var components = new BetaJS.Collections.Collection([

    // Tests
    {value: "Unit-Test-Click-Item", externalfile: "../tests/demotests/test_clickitem.html"},
    {value: "Unit-Test-List", externalfile: "../tests/demotests/test_list.html"},
    {value: "Unit-Test-Selectable-Item", externalfile: "../tests/demotests/test_selectableitem.html"},

    // List - Listitems
    {value  : 'test_clickitem'},
    {value  : 'test_selectableitem'},
    {value  : 'selectableitem'},

    //Inputs
    {value  : 'clickinput'},
    {value  : 'search'},
    {value  : 'textinput'},
    {value  : 'scrollpicker'},

    //Base - Misc
    {value  : 'test_dropdown'},
    {value  : 'dropdown'},
    {value  : 'overlaycontainer'},
    {value  : 'testoverlaycontainer'},

    //List
    {value  : 'test_list_removepromise'},
    {value  : 'test_list_loadmore'},
    {value  : 'list'},
    {value  : 'test_list_clickitem'},
    {value  : 'test_list_listoflist'},
    {value  : 'test_list_swipecontainer'},
    {value  : 'test_list_listcollection'},
    {value  : 'test_list_pushfunc'},

    //Swipecontainers
    {value  : 'hoverbuttoncontainer'},
    {value  : 'eventitem'},

    //Web -
    {value  : 'layout_web'},
    {value  : 'menu_web'},
    {value  : 'header'},

    //Titledlist
    {value  : 'addtitle'},
    {value  : 'titledlist', attrs: {
        listcollection: new BetaJS.Collections.Collection([{
            value: "Titledlist - Item 1"
        },
        {
            value: "Titledlist - Item 2"
        },
        {
            value: "Titledlist - Item 3"
        }
    ])}},
    {value  : 'test_titledlist'},

    //Todo
    // {value  : 'test_searchlist'},

]);