/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.object.classes.data.firstname");
/**
 * @private
 */
pimcore.object.classes.data.firstname = Class.create(pimcore.object.classes.data.data, {

    type: "input",
    /**
     * define where this datatype is allowed
     */
    allowIn: {
        object: true,
        objectbrick: true,
        fieldcollection: true,
        localizedfield: false,
        classificationstore: false,
        block: true,
        encryptedField: true
    },

    initialize: function (treeNode, initData) {
        this.type = "firstname";

        if (!initData["name"]) {
            initData = {
                title: t("firstname")
            };
        }

        initData.fieldtype = "firstname";
        initData.datatype = "data";
        initData.name = "firstname";
        treeNode.set("text", "firstname");

        this.initData(initData);

        this.treeNode = treeNode;
    },

    getTypeName: function () {
        return t("firstname");
    },

    getGroup: function () {
        return "crm";
    },

    getIconClass: function () {
        return "pimcore_icon_firstname";
    },

    getLayout: function ($super) {

        $super();

        var nameField = this.layout.getComponent("standardSettings").getComponent("name");
        nameField.disable();

        this.specificPanel.removeAll();
        var specificItems = this.getSpecificPanelItems(this.datax);
        this.specificPanel.add(specificItems);

        return this.layout;
    },

    getSpecificPanelItems: function (datax, inEncryptedField) {
        var specificItems = [
            {
                xtype: "textfield",
                fieldLabel: t("width"),
                name: "width",
                value: datax.width
            },
            {
                xtype: "displayfield",
                hideLabel: true,
                value: t('width_explanation')
            }
        ];

        if (!inEncryptedField) {
            specificItems.push(
                {
                    xtype: "numberfield",
                    fieldLabel: t("columnlength"),
                    name: "columnLength",
                    value: datax.columnLength
                }
            );
        }
        return specificItems;
    },

    applySpecialData: function (source) {
        if (source.datax) {
            if (!this.datax) {
                this.datax = {};
            }
            Ext.apply(this.datax,
                {
                    width: source.datax.width,
                    columnLength: source.datax.columnLength
                });
        }
    }
});
