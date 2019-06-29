const Applet = imports.ui.applet;
const St = imports.gi.St;
const Settings = imports.ui.settings;

class SpacerApplet extends Applet.IconApplet {

    constructor(metadata, orientation, panelHeight, instance_id) {
        super(orientation, panelHeight, instance_id);
        this.actor.track_hover = false;
        this.actor.styleClass = "spacer-applet"; // override standard styles to make width work as expected

        this.bin = new St.Bin();
        this.actor.add(this.bin);

        this.settings = new Settings.AppletSettings(this, metadata.uuid, this.instance_id);

        this.settings.bind("width", "width", this.handleSettings);

        this.orientation = orientation;

        this.handleSettings();
    }

    on_orientation_changed(neworientation) {
        this.orientation = neworientation;

        if (this.bin) {
            this.bin.destroy();

            this.bin = new St.Bin();
            this.actor.add(this.bin);

            this.handleSettings();
        }
    }

    on_applet_removed_from_panel() {
        this.settings.finalize();
    }

    handleSettings() {
        if (this.orientation == St.Side.TOP || this.orientation == St.Side.BOTTOM) {
            this.bin.width = this.width;
        } else {
            this.bin.height = this.width;
        }
    }
}

function main(metadata, orientation, panelHeight, instance_id) {
    return new SpacerApplet(metadata, orientation, panelHeight, instance_id);
}
