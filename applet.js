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
*/

const Applet = imports.ui.applet;
const St = imports.gi.St;
const Settings = imports.ui.settings;

class SpacerApplet extends Applet.Applet {

    // default methods

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
            this.actor.styleClass += " spacer-applet";
            // bind settings
            this.settings = new Settings.AppletSettings(this, metadata.uuid, this.instance_id);
            this.settings.bind("width", "width", this.handleSettings);
            // set orientation and apply settings
            this.handleOrientation(orientation);
        } catch (e) {
            global.logError(e);
        }
    }

    handleOrientation(orientation) {
        this.orientation = orientation;
        this.handleSettings();
    }

    handleSettings() {
        if (this.orientation == St.Side.TOP || this.orientation == St.Side.BOTTOM) {
            this.actor.width = this.width;
        } else {
            this.actor.height = this.width;
        }
    }

    handleRemoveFromPanel() {
        this.settings.finalize();
    }

}

function main(metadata, orientation, panelHeight, instance_id) {
    return new SpacerApplet(metadata, orientation, panelHeight, instance_id);
}
