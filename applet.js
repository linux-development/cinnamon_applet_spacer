/*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* This code is based on spacer@cinnamon.org applet.
*/

const Applet = imports.ui.applet;
const St = imports.gi.St;
const Settings = imports.ui.settings;

class SpacerApplet extends Applet.Applet {

    // standard methods

    constructor(metadata, orientation, panelHeight, instance_id) {
        super(orientation, panelHeight, instance_id);
        this.handleInit(metadata, orientation);
    }

    on_orientation_changed(orientation) {
        this.handleOrientation(orientation);
    }

    on_applet_removed_from_panel() {
        this.handleRemoveFromPanel();
    }

    // custom handlers

    handleInit(metadata, orientation) {
        try {
            // configure applet
            this.setAllowedLayout(Applet.AllowedLayout.BOTH);
            this.actor.track_hover = false;
            this.actor.add_style_class_name('spacer-applet');
            // create state and set default values
            this.state = {
                'orientation': orientation
            };
            // create a storage for settings
            this.settings = {
                'width': 0
            };
            // bind settings
            this.appletSettings = new Settings.AppletSettings(this.settings, metadata.uuid, this.instance_id);
            this.appletSettings.bind('width', 'width', () => this.handleSettings());
            // apply settings
            this.handleSettings();
        } catch (e) {
            global.logError(e);
        }
    }

    handleSettings() {
        if (this.state.orientation == St.Side.TOP || this.state.orientation == St.Side.BOTTOM) {
            this.actor.width = this.settings.width;
        } else {
            this.actor.height = this.settings.width;
        }
    }

    handleOrientation(orientation) {
        this.state.orientation = orientation;
        this.handleSettings();
    }

    handleRemoveFromPanel() {
        try {
            this.appletSettings.finalize();
        } catch (e) {
            global.logError(e);
        }
    }

}

function main(metadata, orientation, panelHeight, instance_id) {
    return new SpacerApplet(metadata, orientation, panelHeight, instance_id);
}
