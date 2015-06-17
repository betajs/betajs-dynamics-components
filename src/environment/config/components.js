
window.components = new BetaJS.Collections.Collection({objects: [
    {name:'aa_template'},
    {name:'list'},
    {name:'titledlist'},
    {name:'searchlist'},
    {name:'simplelist'},
    {name:'timesetting'},
    {name:'generalsetting'},
    {name:'scrollpicker'},
    {name:'timepicker'},
]});

window.componentsByName = function (name) {
    var comp = window.components;
    for (var i = 0; i < comp.count(); ++i)
        if (comp.getByIndex(i).get("name") == name)
            return comp.getByIndex(i);
    return null;
};
