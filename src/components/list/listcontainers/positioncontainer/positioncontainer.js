Scoped.define("module:Positioncontainer", [
    "dynamics:Dynamic",
    "base:Time",
    "browser:Dom",
    "browser:Info"
], [
    "ui:Dynamics.GesturePartial",
    "ui:Dynamics.InteractionPartial",
    "ui:Interactions.Drag",
    "ui:Interactions.Drop"
], function(Dynamic, Time, Dom, Info, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            view: {
                inner: 'eventitem'
            },
            top: 20,
            click_gesture: {
                mouse_up_activate: true,
                up_event_allow_propagation: Info.isMobile(),
                wait_time: 250,
                wait_activate: false,
                disable_x: 10,
                disable_y: 10,
                enable_x: -1,
                enable_y: -1,
                activate_event: "click"
            },
            swipe_gesture: {
                mouse_up_activate: false,
                up_event_allow_propagation: Info.isMobile(),
                wait_time: 250,
                wait_activate: false,
                disable_x: -1,
                disable_y: 10,
                enable_x: 10,
                enable_y: -1,
                interaction: "swipe"
            },
            drag_gesture: {
                mouse_up_activate: false,
                up_event_allow_propagation: Info.isMobile(),
                wait_time: 750,
                wait_activate: true,
                disable_x: 10,
                disable_y: 10,
                enable_x: -1,
                enable_y: -1,
                interaction: "drag"
            },
            drag_interaction: {
                droppable: true,
                type: "drag",
                clone_element: false,
                start_event: null,
                events: {
                    "move": function(model, event) {
                        event.actionable_modifier.csscls("focus", true);
                        event.modifier.csscls("unfocus", true);
                    }
                }
            },
            drop_interaction: {
                enabled: true,
                type: "drop",
                events: {
                    "dropped": function(data, event) {
                        this.execute('dropped', event.source.data);
                    }
                }
            },
            start_swipe: '',
            lefticon: 'icon-ok',
            righticon: 'icon-time',
            swipe_actions: {
                "snooze": {
                    less: -1 / 2,
                    greater: -1,
                    execute: function(element, pos) {
                        this.execute("snooze_model");
                    }
                },
                "group": {
                    less: -1 / 7,
                    greater: -1 / 2,
                    execute: function(element, pos) {
                        this.execute("group_model");
                    }
                },
                "nothing": {
                    greater: -1 / 7,
                    less: 1 / 7
                },
                "archive": {
                    greater: 1 / 7,
                    less: 1 / 2,
                    execute: function(element, pos) {
                        this.execute("archive_model");
                    }
                },
                "delete": {
                    greater: 1 / 2,
                    less: 1,
                    execute: function(element, pos) {
                        this.execute("delete_model");
                    }
                }
            },
            swipe_interaction: {
                type: "drag",
                enabled: true,
                draggable_y: false,
                start_event: null,
                events: {
                    "move": function(doodad, event) {
                        var element = event.element;
                        var w = Dom.elementDimensions(element).width;
                        var x = parseInt(element.style.left, 10);
                        var a = {};
                        var actions = this.get('swipe_actions');
                        for (var cls in actions) {
                            a = actions[cls];
                            if ((!a.less || x <= w * a.less) && (!a.greater || x >= w * a.greater))
                                Dom.elementAddClass(element, cls);
                            else
                                Dom.elementRemoveClass(element, cls);
                        }
                    },
                    "release": function(doodad, event) {
                        var element = event.element;
                        var w = Dom.elementDimensions(element).width;
                        var x = parseInt(element.style.left, 10);
                        var actions = this.get('swipe_actions');
                        for (var cls in actions) {
                            a = actions[cls];

                            if ((!('greater' in a) || x <= w * a.less) && (!('less' in a) || x >= w * a.greater)) {
                                event.source.abort();
                                this.__slideoutElement = element;
                                this.__slideoutX = x;
                                if (a.execute)
                                    a.execute.call(this, element, x);
                            }
                        }
                    }
                }
            }
        },

        create: function() {
            console.log('Positioncontainer');
            // var hour = Time.decodeTime(this.getProp('model.start_date_utc')).hour;
            // var minute = Time.decodeTime(this.getProp('model.start_date_utc')).minute/60;
            var decodeTime = Time.decodeTime(this.getProp('model.start_date_utc'));
            var hour = decodeTime.hour + decodeTime.minute / 60;
            var percentage = hour < 5 ? 0 : (hour - 5) / 19 * 100;
            this.set('top', percentage);
        }

    }).register();

});