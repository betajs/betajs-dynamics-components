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
            dragMouseOffset: null,
            dragY: 0,
            top: 20,
            listPos: {
                top: 0,
                height: 0
            },
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
            drag_gesture: {
                mouse_up_activate: false,
                up_event_allow_propagation: Info.isMobile(),
                wait_time: 250,
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
                no_animation: true,
                events: {
                    "move": function(model, event) {
                        this.set('dragYPercent', this._coordToPercent(event));
                        event.actionable_modifier.csscls("focus", true);
                        event.modifier.csscls("unfocus", true);
                    },
                    "release": function(model, event) {
                        this.set('top', this._coordToPercent(event));
                        this.set('dragMouseOffset', null);
                        this.trigger('release', this._coordToPercent(event));
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
            lefticon: 'icon-ok',
            righticon: 'icon-time'
        },

        create: function() {
            this._setinitialTop();
        },

        _afterActivate: function() {
            this._getListPos();
        },

        _setinitialTop: function() {
            var decodeTime = Time.decodeTime(this.getProp('model.start_date_utc'));
            var hour = decodeTime.hour + decodeTime.minute / 60;
            var percentage = hour < 5 ? 0 : (hour - 5) / 19 * 100;

            this.set('top', percentage);
        },

        _getListPos: function() {
            var bounding = this.parent().activeElement().getBoundingClientRect();
            this.set('listPos', {
                top: bounding.top,
                height: bounding.height
            });
        },

        _coordToPercent: function(event) {
            var listHeight = this.getProp('listPos.height');
            var listTop = this.getProp('listPos.top');
            var relativePos = event.page_coords.y - listTop;

            if (!this.get('dragMouseOffset')) {
                var offsetTop = this.activeElement().getElementsByTagName('positioncontainer')[0].offsetTop;
                this.set('dragMouseOffset', relativePos - offsetTop);
            }

            if (0 > relativePos || listHeight < relativePos) {
                console.log('Positioncontainer: Outside Range');
            } else
                return newPos = (relativePos - this.get('dragMouseOffset')) / listHeight * 100;

        }

    }).register();

});