
window.components = new BetaJS.Collections.Collection({objects: [
    {name:'aa_template'},
    {name:'testoverlaycontainer'},
    {name:'testtimesetting'},
    {name:'titlesetting'},
    {name:'generalsetting'},
    {name:'numberscrollpicker'},
    {name:'scrollpicker'},
    {name:'timepicker'},
    {name:'emailinput'}
]});

window.componentsByName = function (name) {
    var comp = window.components;
    for (var i = 0; i < comp.count(); ++i)
        if (comp.getByIndex(i).get("name") == name)
            return comp.getByIndex(i);
    return null;
};
