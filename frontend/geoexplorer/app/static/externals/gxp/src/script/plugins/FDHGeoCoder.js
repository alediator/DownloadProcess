/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the BSD license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

/**
 * @requires plugins/Tool.js
 */

/** api: (define)
 *  module = gxp.plugins
 *  class = FDHGeoCoder
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins");

/** api: constructor
 *  .. class:: FDHGeoCoder(config)
 *
 *    Provides an action for zooming to an extent.  If not configured with a 
 *    specific extent, the action will zoom to the map's visible extent.
 */
gxp.plugins.FDHGeoCoder = Ext.extend(gxp.plugins.Tool, {
    
    /** api: ptype = gxp_zoomtoextent */
    ptype: "gxp_fdhgeocoder",
    
    /** api: config[buttonText]
     *  ``String`` Text to show next to the zoom button
     */

    /** api: config[initialText]
     *  ``String``
     *  Initial text for combo box (i18n).
     */
    initialText: "Select an area",
     
    /** api: config[menuText]
     *  ``String``
     *  Text for zoom menu item (i18n).
     */
    menuText: "FDH Geo Coding",

    /** api: config[tooltip]
     *  ``String``
     *  Text for zoom action tooltip (i18n).
     */
    tooltip: "FDH Geo Coding",
    
    data:[],
    
    /** private: method[constructor]
     */
    constructor: function(config) {
        gxp.plugins.FDHGeoCoder.superclass.constructor.apply(this, arguments);
    },

    /** api: method[addActions]
     */
    addActions: function() {
        var geocodingStore = new Ext.data.ArrayStore({
            fields: ['name', 'geometry'],
            data :  this.data
        });

        var map = this.target.mapPanel.map;
        var geocodingSelector = new Ext.form.ComboBox({
            store: geocodingStore,
            displayField: 'name',
            typeAhead: true,
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            emptyText: this.initialText,
            selectOnFocus:true,
            editable: false,
            listeners: {
                select: function(cb, record, index) {
                    var bbox = new OpenLayers.Bounds.fromString(record.get('geometry'));
                    bbox = bbox.transform(
                        new OpenLayers.Projection("EPSG:4326"),
                        new OpenLayers.Projection(map.projection));
                    map.zoomToExtent(bbox);
                }
            }
        });
        
        var actions = [geocodingSelector];
        return gxp.plugins.FDHGeoCoder.superclass.addActions.apply(this, [actions]);
    }
        
});

Ext.preg(gxp.plugins.FDHGeoCoder.prototype.ptype, gxp.plugins.FDHGeoCoder);
