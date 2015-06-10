
window.componentsJSON = [
    {name:'aa_template'},
    {name:'numberscrollpicker'},
    {name:'timepicker'},
    {name:'testcomponent'},
    {name:'emailinput'},
    {name:'list'}
];

window.components = BetaJS.Objs.map(window.componentsJSON, function (entry) {
   return new BetaJS.Properties.Properties(entry);
});

window.componentsByName = function (name) {
    var comp = window.components;
    for (var i = 0; i < comp.length; ++i)
        if (comp[i].get("name") == name)
            return comp[i];
    return null;
};