Ext.namespace('Zarafa.plugins.switcheditor');

/**
 * @class Zarafa.plugins.switcheditor.SwitchEditorPlugin
 * @extends Zarafa.core.Plugin
 *
 */
Zarafa.plugins.switcheditor.SwitchEditorPlugin  = Ext.extend(Zarafa.core.Plugin, {

    /* What's new content */
    whatsNew : {
        version: '0.9',
        features: [{
            title: 'Switch button in editor',
            description: 'Real time switch between editors, without navigating to settings. Keep in mind formatting is lost while switching.',
            image_url: 'img/new.png'
        }]
    },

    initPlugin : function() {
      this.registerInsertionPoint('context.mail.mailcreatecontentpanel.toolbar.actions', this.createNewDelayDeliveryButton, this);
    },

		/**
		 * Prepare new button in mail create toolbar
		 * @return {Ext.Button} Button instance
		 * @private
		 */
		createNewDelayDeliveryButton : function () {
			return [{
				xtype : 'button',
				text : _('Switch Editor'),
				iconCls : 'icon_switcheditor',
				handler : this.switchEditorOnClick,
				scope : this
			}];
		},

	switchEditorOnClick : function (btn) {

    var cont = container.getSettingsModel();
    var html = 'zarafa/v1/contexts/mail/dialogs/mailcreate/use_html_editor';
		var useHTML = cont.get(html);

    var createPanel = btn.findParentByType('zarafa.mailcreatepanel');

    if (useHTML) {
      // Update the settings
      createPanel.editorField.setHtmlEditor(false);
      cont.set(html, false);
    }
    else {
      // Update the settings
      createPanel.editorField.setHtmlEditor(true);
      cont.set(html, true);
    }
	}

});

Zarafa.onReady(function() {
	container.registerPlugin(new Zarafa.core.PluginMetaData({
		name : 'switcheditor',
		displayName : _("Switch Editor"),
		allowUserDisable : true,
		allowUserVisible : true,
		pluginConstructor : Zarafa.plugins.switcheditor.SwitchEditorPlugin
	}));
});
