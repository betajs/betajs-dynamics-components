
window.components = new BetaJS.Collections.Collection({objects: [
    {title:'overlaycontainer'},
    {title:'overlaycontainertest'},
    {title:'scrollpicker'},
    {title:'swipecontainer'},
    {title:'clickitem'},
    {title:'selectableitem'},
    {title:'list'},
    {title:'searchlist'},
    {title:'titledlist'}
]});

window.componentsBytitle = function (title) {
    var comp = window.components;
    for (var i = 0; i < comp.count(); ++i)
        if (comp.getByIndex(i).get("title") == title)
            return comp.getByIndex(i);
    return null;
};
