
window.components = new BetaJS.Collections.Collection({objects: [
    {title:'signin'},
    {title:'signingoogle'},
    {title:'emaillist'},
    {title:'tasklist'},
    {title:'aa_template'},
    {title:'emailitem'},
    {title:'clickitem'},
    {title:'swipecontainer'},
    {title:'list'},
    {title:'titledlist'},
    {title:'simplelist'},
    {title:'timesetting'},
    {title:'generalsetting'},
    {title:'scrollpicker'},
    {title:'timepicker'},
]});

window.componentsBytitle = function (title) {
    var comp = window.components;
    for (var i = 0; i < comp.count(); ++i)
        if (comp.getByIndex(i).get("title") == title)
            return comp.getByIndex(i);
    return null;
};
