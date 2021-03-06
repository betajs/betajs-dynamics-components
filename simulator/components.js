var components = new BetaJS.Collections.Collection([

    //Inputs
    {value  : 'swipepicker'},
    {value  : 'input'},
    {value  : 'clickinput'},
    {value  : 'search'},
    {value  : 'textinput'},
    {value  : 'scrollpicker'},

    //Listcontainers
    {value  : 'eventitem'},
    {value  : 'clickcontainer'},

    // Tests
    {value: "UTclickitem", externalfile: "../tests/demotests/UTclickitem/UTclickitem.html"},
    {value: "UTscrollpicker", externalfile: "../tests/demotests/UTscrollpicker/UTscrollpicker.html"},
    {value: "UTtextinput", externalfile: "../tests/demotests/UTtextinput/UTtextinput.html"},
    {value: "UTlist", externalfile: "../tests/demotests/UTlist/UTlist.html"},
    {value: "UTdropdown", externalfile: "../tests/demotests/UTdropdown/UTdropdown.html"},
    {value: "UTdropdownselect", externalfile: "../tests/demotests/UTdropdownselect/UTdropdownselect.html"},
    {value: "Unit-Test-Selectable-Item", externalfile: "../tests/demotests/test_selectableitem.html"},

    //Overlaycontainer
    {value  : 'overlaycontainer'},

    // List - Listitems
    {value  : 'test_clickitem'},
    {value  : 'test_selectableitem'},
    {value  : 'selectableitem'},

    //List
    {value  : 'test_list_removepromise'},
    {value  : 'test_list_loadmore'},
    {value  : 'list'},
    {value  : 'test_list_clickitem'},
    {value  : 'test_list_listoflist'},
    {value  : 'test_list_swipecontainer'},
    {value  : 'test_list_listcollection'},
    {value  : 'test_list_pushfunc'},


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