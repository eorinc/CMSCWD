// // Javascript by Sarah Grandstrand with EOR Inc//

var light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2dyYW5kc3RyYW5kIiwiYSI6ImNqY3BtMm52MjJyZWsycXBmMDZremxsN3EifQ.3HVgf9jrNbmCSBBBlp5zlQ', {

    //                        pk.eyJ1IjoicHNteXRoMiIsImEiOiJjaXNmNGV0bGcwMG56MnludnhyN3Y5OHN4In0.xsZgj8hsNPzjb91F31-rYA
    //    id: 'mapbox.streets',
    id: 'mapbox.light',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
});

var dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2dyYW5kc3RyYW5kIiwiYSI6ImNqY3BtMm52MjJyZWsycXBmMDZremxsN3EifQ.3HVgf9jrNbmCSBBBlp5zlQ', {
    id: 'mapbox.dark',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
});

var imagery = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2dyYW5kc3RyYW5kIiwiYSI6ImNqY3BtMm52MjJyZWsycXBmMDZremxsN3EifQ.3HVgf9jrNbmCSBBBlp5zlQ', {
    id: 'mapbox.satellite',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
});

var mncomposite = L.tileLayer.wms("//geoint.lmic.state.mn.us/cgi-bin/mncomp?VERSION%3D1.3.0", {
    layers: 'mncomp',
    format: 'image/jpeg',
    transpartent: true,
});

var hillshade = L.tileLayer.wms("//geoint.lmic.state.mn.us/cgi-bin/wms?", {
    layers: 'hillshd',
    format: 'image/jpeg',
    transparent: true,
});

var quad250 = L.tileLayer.wms("//geoint.lmic.state.mn.us/cgi-bin/wmsz?", {
    layers: 'drg250',
    format: 'image/png',
    transparent: true,
});

var quad100 = L.tileLayer.wms("//geoint.lmic.state.mn.us/cgi-bin/wmsz?", {
    layers: 'drg100',
    format: 'image/png',
    transparent: true,
});


var quad24 = L.tileLayer.wms("//geoint.lmic.state.mn.us/cgi-bin/wmsz?", {
    layers: 'drg24',
    format: 'image/png',
    transparent: true,
});


var mapOptions = {
    zoomControl: false,
    center: [45.2, -92.85],
    //[45.28, -92.93], // large screens 
    //[46.35, -94.8], // large screens
    //    center: [46.35, -93.5],
    zoomSnap: 0.25,
    zoomDelta: 0.25,
    zoom: 11, //6.5,
    minZoom: 3,
    maxZoom: 18,
    layers: [light],
    //    loadingControl: true
};


var map = L.map('mapid', mapOptions);


L.control.scale({
    position: 'bottomright',
    metric: false
}).addTo(map);


var zoomHome = L.Control.zoomHome({
    position: 'topleft'
});
zoomHome.addTo(map);

var zoomboxOptions = {
    modal: true,
    title: "Box area zoom",
    zoomSnap: 0.25
};
var zoomboxControl = L.control.zoomBox(zoomboxOptions);
map.addControl(zoomboxControl);

var baseMaps = {
    "Light": light,
    "Dark": dark,
    "Imagery": imagery,
    "MN Composite": mncomposite,
    "Hillshade": hillshade,
    "Scanned 250k DRG": quad250,
    "Scanned 100k DRG": quad100,
    "Scanned 24k DRG": quad24
}
L.control.layers(baseMaps, null).addTo(map);

// bottom left or topleft?? ask
var loadingControl = L.Control.loading({
    separate: true,
    position: 'bottomleft'
});
map.addControl(loadingControl);

//L.easyButton('fa-crosshairs fa-lg', function (btn, map) {
//    map.fitBounds(poltJur.getBounds());
//    console.log(poltJur.getBounds());
//}).addTo(map);

var pattern_gwdepbuff = new L.StripePattern({
    weight: 2,
    spaceWeight: 10,
    color: '#000000',
    opacity: 1.0,
    spaceOpacity: .5,
    angle: 315
});
pattern_gwdepbuff.addTo(map);

// Leaflet Browser Print

L.control.browserPrint({
    title: 'Print Map',
    documentTitle: 'Carnelian-Marine-St. Croix Watershed District',
    closePopupsOnPrint: false,
    printModes: [
		"Landscape",
		"Portrait",
        L.control.browserPrint.mode.portrait("Tabloid Portrait", "tabloid"),
//		L.control.browserPrint.mode.auto()
	],
    manualMode: false,
    position: 'topright'
}).addTo(map);

map.on("browser-print-end", function (e) {
    postPrintLegend();
    sidebar.open('home');
});

map.on("browser-print-start", function (e) {
    sidebar.close('home');
    L.control.scale({
        position: 'bottomright',
        metric: false,
        maxWidth: 200
    }).addTo(e.printMap);
    addPrintLegend(e);
    pattern_gwdepbuff.addTo(e.printMap);
    L.latlngGraticule({
        showLabel: true,
        dashArray: [5, 5],
        zoomInterval: [
            {
                start: 3,
                end: 3,
                interval: 30
            },
            {
                start: 4,
                end: 5,
                interval: 20
            },
            {
                start: 5,
                end: 7,
                interval: 10
                },
            {
                start: 7,
                end: 9,
                interval: 1
                },
            {
                start: 9,
                end: 11.25,
                interval: .5
                },
            {
                start: 11.25,
                end: 14,
                interval: .1
                },

            {
                start: 14,
                end: 15,
                interval: .05
        },
            {
                start: 15,
                end: 18,
                interval: .005
        }
                            ]
    }).addTo(e.printMap);

});

var sidebar = L.control.sidebar('sidebar').addTo(map);

//// URL's for Layers ////
var a_poltJur = 'cmscwd:CMWD_political_jurisdiction'; // political jursidiction boundary
var a_cnty = 'minnesota:county_boundaries'; // county layer
//'clflwd:cntybnds_clfl_mv'; //this is the counties only around the districts
var a_huc8 = 'minnesota:WBD_HU8'; //USGS HUC 8
var a_huc10 = 'minnesota:WBD_HU10'; //USGS HUC 10
var a_huc12 = 'minnesota:WBD_HU12'; //USGS HUC 12


var a_gwdepbuff = 'cmscwd:GWDep_buffer';
var a_gwdeppoly = 'cmscwd:GWDep_poly_diss';
var a_mwmo_wetland = 'cmscwd:MWMO_wetland_data_20Jan09';
var a_mnram = 'cmscwd:cmwd_mnram_11oct06';
var a_mlccs = 'cmscwd:mlccs_cmswd_pol_jur_mv';
var a_parcels = 'cmscwd:parcels_wash_co_mv';
var a_pwi_buffer = 'cmscwd:pwi_buffer_area_esimate';
var a_subcatch = 'cmscwd:subcatchments_20201021';

var a_nwi_cir = 'cmscwd:nwi_cmscwd_mv';

var a_soilgrps = 'cmscwd:gssurgo_soilsgrp_mv';
var a_hydricsoils = 'cmscwd:gssurgo_hydric_cmscwd_mv';

// These might be duplicating th pwi buffer area estimate
var a_buffbasins = 'minnesota:pwi_basins'; //Buffer Protection of Lakes, ponds, reservoirs
//var a_buffwetlnds = 'minnesota:pwi_basins_wetlnd_mv'; //Buffer Protection of wetlands; Public Waters; PWI
var a_buffwtrcrse = 'minnesota:pwi_watercourses'; //Buffer Protection of watercourse; Public Ditches; PWI s



/// *** RASTER LAYERS ***////

//var a_wildLife = 'clflwd_rasters:wildlife100_clflwd'; // Wildlife Habitat Quality Risk
//var a_pollsens = 'clflwd_rasters:nrsfsn_clflwd'; //Pollution Sensitivity of Near-Surface Materials
//var a_nLCD = 'clflwd_rasters:nlcd_clflwd'; //// national land cover data 2016
//var a_pollsensGradient = 'clflwd_rasters:nrsfsn_clflwd_grade'; ////Pollution Sensitivity of Near-Surface Materials Gradient
//var a_waterQual = 'clflwd_rasters:watqual100_clflwd'; //Water Quality Risk
//var a_soil = 'clflwd_rasters:waterosion100_clflwd'; //Soil Erosion Risk
//var a_envBen = 'clflwd_rasters:ebi300clflwd'; //Environmental Risk Index

var a_mask = 'cmscwd:cmscwd_mask'; //mask of district boundaries for printing purposes

// URL for CLFLWD layers
// get url dynamically with this function;
function getCMSCWD_URL(layername) {
    var geoserverRoot = "https://post.eorinc.com/geoserver/cmscwd/ows";
    var defaultParameters = {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        typeName: layername,
        outputFormat: 'text/javascript',
        format_options: 'callback:' + layername.replace(":", ""), //had to do this because otherwise each callback wasn't unique and wouldn't load multiple layers ///not sure if this needs to be callback:processJson. that could be old documentation. 
        SrsName: 'EPSG:4326'
    };
    var parameters = L.Util.extend(defaultParameters);
    var URL = geoserverRoot + L.Util.getParamString(parameters);
    //    console.log('this is the url: ', URL);
    return URL;
};
//
//// URL for Minnesota layers
// get url dynamically with this function
function getMN_URL(layername) {
    var geoserverRoot = "https://post.eorinc.com/geoserver/minnesota/ows";
    var defaultParameters = {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        typeName: layername,
        outputFormat: 'text/javascript',
        format_options: 'callback:' + layername.replace(":", ""), //had to do this because otherwise each callback wasn't unique and wouldn't load multiple layers ///not sure if this needs to be callback:processJson. that could be old documentation. 
        SrsName: 'EPSG:4326',
        // This is the bounding box of the counties surrounding CLFLWD districts. Using this to limit the features shown. 
        bbox: '-92.90743976,45.07582437,-92.73934993,45.29633356, EPSG:4326'

    };
    var parameters = L.Util.extend(defaultParameters);
    var URL = geoserverRoot + L.Util.getParamString(parameters);
    //        console.log('this is the url: ', URL);
    return URL;
};

function getCMSCWD_WMS_URL(layername) {
    var tileLayer = L.tileLayer.wms("https://post.eorinc.com/geoserver/cmscwd/wms", {
        layers: layername,
        format: 'image/png',
        //    styles: 'clflwd_rasters%3Anrsfsn_clflwd_qgisStyle',
        transparent: true,
        version: '1.1.0',
        crs: L.CRS.EPSG4326,

        //        bounds: bounds,
        //bbox: [-93.02427108, 45.22182617, -92.79967634, 45.33440437],
        //        bbox: '-93.01986634,45.20963384,-92.67457369,45.47000262'
        //bounds: L.latLngBounds([[-93.02427108, 45.22182617], [-92.79967634, 45.33440437]]),

    });
    console.log('this is the tile layer bounds: ', tileLayer.getBounds);
    return tileLayer
};

function getTilelayer(rastlayer) {
    var tileLayer = L.tileLayer.wms("https://post.eorinc.com/geoserver/clflwd_rasters/wms", {
        layers: rastlayer,
        format: 'image/png',
        //    styles: 'clflwd_rasters%3Anrsfsn_clflwd_qgisStyle',
        transparent: true,
        version: '1.1.0',
        crs: L.CRS.EPSG4326,

    });
    return tileLayer
};

/////*** BOUNDARY LAYERS ****\\\\

// id  is distbound_layer
var poltJur;
var url_poltJur = getCMSCWD_URL(a_poltJur);
$.ajax({
    url: url_poltJur,
    dataType: 'jsonp',
    jsonpCallback: a_poltJur.replace(":", ""),
    success: function (response) {
        poltJur = L.geoJson(response, {
            attribution: '',
            interactive: true,
            style: stylepoltJur,
        });
        map.addLayer(poltJur);
        //console.log(poltJur.getBounds().toBBoxString());
        // -92.90743976,45.07582437,-92.73934993,45.29633356
    }

}); //end of call for political jursdiction variable

var cnty;
var url_cnty = getMN_URL(a_cnty);

//var city;
//var url_city = getCLFL_URL(a_city);
var huc8;
var url_huc8 = getMN_URL(a_huc8);
var huc10;
var url_huc10 = getMN_URL(a_huc10);
var huc12;
var url_huc12 = getMN_URL(a_huc12);


////// *** Hydrology Layers *** /////


//var cONUS;
//var url_cONUS = getCLFL_URL(a_cONUS);
//var nwi_cir;
//var url_nwi_cir = getCMSCWD_URL(a_nwi_cir);
var nwi_cir = getCMSCWD_WMS_URL(a_nwi_cir);
var buffbasins;
var url_buffbasins = getMN_URL(a_buffbasins);
var buffwetlnds;
//var url_buffwetlnds = getMN_URL(a_buffwetlnds);
//var buffwtrcrse;
var url_buffwtrcrse = getMN_URL(a_buffwtrcrse);

//var hydricsoils;
//var url_hydricsoils = getCMSCWD_URL(a_hydricsoils);
//var soilgrps;
//var url_soilgrps = getCMSCWD_URL(a_soilgrps);
var hydricsoils = getCMSCWD_WMS_URL(a_hydricsoils);
var soilgrps = getCMSCWD_WMS_URL(a_soilgrps);

var gwdepbuff;
var url_gwdepbuff = getCMSCWD_URL(a_gwdepbuff);
var gwdeppoly;
var url_gwdeppoly = getCMSCWD_URL(a_gwdeppoly);
var mwmo_wetland;
var url_mwmo_wetland = getCMSCWD_URL(a_mwmo_wetland);
var mwmo_wetland;
var url_mwmo_wetland = getCMSCWD_URL(a_mwmo_wetland);
var mnram;
var url_mnram = getCMSCWD_URL(a_mnram);
var mlccs = getCMSCWD_WMS_URL(a_mlccs);
//var mlccs;
//var url_mlccs = getCMSCWD_URL(a_mlccs);
var parcels;
var url_parcels = getCMSCWD_URL(a_parcels);
var pwi_buffer;
var url_pwi_buffer = getCMSCWD_URL(a_pwi_buffer);
var subcatch;
var url_subcatch = getCMSCWD_URL(a_subcatch);


//var wildLife = getTilelayer(a_wildLife);
//var waterQual = getTilelayer(a_waterQual);
//var soil = getTilelayer(a_soil);
//var envBen = getTilelayer(a_envBen);


/////*** OTHER layers ***/////
var mask;
var url_mask = getCMSCWD_URL(a_mask);


/// STYLE FUNCTIONS

function stylepoltJur(feature) {
    var x = document.getElementById("fillop_poltJur");
    var y = document.getElementById("boundop_poltJur");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": '#FF0000',
        "fillColor": '#FF0000',
        "weight": 3,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,

    };
}

function stylemask(feature) {
    var x = document.getElementById("fillop_mask");
    var currentfillop = x.value;
    return {
        "color": "transparent",
        "fillColor": "#000000",
        "weight": 2,
        "fillOpacity": currentfillop,
    };
}


function stylecnty(feature) {
    var x = document.getElementById("fillop_cnty");
    var y = document.getElementById("boundop_cnty");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#7256E8",
        "fillColor": "#7256E8",
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function styleparcels(feature) {
    var x = document.getElementById("fillop_parcels");
    var y = document.getElementById("boundop_parcels");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#e1e41a",
        "fillColor": "#e1e41a",
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function stylehuc8(feature) {
    var x = document.getElementById("fillop_huc8");
    var y = document.getElementById("boundop_huc8");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#a6cee3",
        "fillColor": "#a6cee3",
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function stylehuc10(feature) {
    var x = document.getElementById("fillop_huc10");
    var y = document.getElementById("boundop_huc10");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#fb9a99",
        "fillColor": "#fb9a99",
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}


function stylehuc12(feature) {
    var x = document.getElementById("fillop_huc12");
    var y = document.getElementById("boundop_huc12");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#fdbf6f",
        "fillColor": "#fdbf6f",
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}



function stylebuffbasins(feature) {
    var x = document.getElementById("fillop_buffbasins");
    var y = document.getElementById("boundop_buffbasins");
    var currentfillop = x.value;
    var currentboundop = y.value;
    type = feature.properties.pwi_label;
    var colorToUse;
    if (type === "Exempt-Contact Area Hydro") colorToUse = '#a6611a';
    else if (type === "Public Water Basin") colorToUse = '#80cdc1';
    else if (type === "Public Water Wetland") colorToUse = '#018571';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

//function stylebuffwetlnds(feature) {
//    var x = document.getElementById("fillop_buffwetlnds");
//    var y = document.getElementById("boundop_buffwetlnds");
//    var currentfillop = x.value;
//    var currentboundop = y.value;
//    return {
//        "color": "#7e8be6",
//        "fillColor": '#7e8be6',
//        "weight": 2,
//        "fillOpacity": currentfillop,
//        "opacity": currentboundop,
//
//    };
//}

function stylebuffwtrcrse(feature) {
    var y = document.getElementById("boundop_buffwtrcrse");
    var currentboundop = y.value;
    return {
        "color": "#674d6e",
        "opacity": currentboundop,
    };
}


//var pattern_gwdepbuff = new L.StripePattern({
//    weight: 2,
//    spaceWeight: 10,
//    color: '#000000',
//    opacity: 1.0,
//    spaceOpacity: .5,
//    angle: 315
//});
//pattern_gwdepbuff.addTo(map);


function stylegwdepbuff(feature) {
    var x = document.getElementById("fillop_gwdepbuff");
    var currentfillop = x.value;
    return {
        fillOpacity: currentfillop,
        stroke: false,
        interactive: true,
        fillPattern: pattern_gwdepbuff
    };
}

//function stylesoilgrps(feature) {
//    var x = document.getElementById("fillop_soilgrps");
//    var y = document.getElementById("boundop_soilgrps");
//    var currentfillop = x.value;
//    var currentboundop = y.value;
//    type = feature.properties.hydrolgrp;
//    var colorToUse;
//    if (type === "A") colorToUse = '#aaff00';
//    else if (type === "A/D") colorToUse = '#9f57f7';
//    else if (type === "B") colorToUse = '#4ecdd9';
//    else if (type === "B/D") colorToUse = '#38538a';
//    else if (type === "C") colorToUse = '#f5e56c';
//    else if (type === "C/D") colorToUse = '#f0599d';
//    else if (type === "D") colorToUse = '#4d7300';
//    else colorToUse = "transparent";
//    return {
//        "color": colorToUse,
//        "fillColor": colorToUse,
//        "weight": 2,
//        "fillOpacity": currentfillop,
//        "opacity": currentboundop,
//    };
//}
//
//function stylehydricsoils(feature) {
//    var x = document.getElementById("fillop_hydricsoils");
//    var y = document.getElementById("boundop_hydricsoils");
//    var currentfillop = x.value;
//    var currentboundop = y.value;
//    type = feature.properties.hydrcratng_pp;
//    var colorToUse;
//    if (type = 0) colorToUse = '#d7191c';
//    else if (type >= 1 && type <= 32) colorToUse = '#f17c4a';
//    else if (type >= 33 && type <= 66) colorToUse = '#ffffbf';
//    else if (type >= 68 && type <= 99) colorToUse = '#c7e9ad';
//    else if (type = 100) colorToUse = '#80bfac';
//    else colorToUse = "transparent";
//    return {
//        "color": colorToUse,
//        "fillColor": colorToUse,
//        "weight": 2,
//        "fillOpacity": currentfillop,
//        "opacity": currentboundop,
//    };
//}

function stylepwi_buffer(feature) {
    var y = document.getElementById("boundop_pwi_buffer");
    var currentboundop = y.value;
    return {
        "color": "#efe1be",
        "opacity": currentboundop,
    };
}

function stylesubcatch(feature) {
    var x = document.getElementById("fillop_subcatch");
    var y = document.getElementById("boundop_subcatch");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#ee9440",
        "fillColor": '#fdae61',
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,

    };
}

function stylegwdeppoly(feature) {
    var x = document.getElementById("fillop_gwdeppoly");
    var y = document.getElementById("boundop_gwdeppoly");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#7d8b8f",
        "fillColor": '#7d8b8f',
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,

    };
}


function stylemnram(feature) {
    var x = document.getElementById("fillop_mnram");
    var y = document.getElementById("boundop_mnram");
    var currentfillop = x.value;
    var currentboundop = y.value;
    type = feature.properties.mgmt_class;
    var colorToUse;
    if (type === "1") colorToUse = '#c7e9c0';
    else if (type === "2") colorToUse = '#74c476';
    else if (type === "3") colorToUse = '#41ab5d';
    else if (type === "4") colorToUse = '#238b45';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function stylemwmo_wetland(feature) {
    var x = document.getElementById("fillop_mwmo_wetland");
    var y = document.getElementById("boundop_mwmo_wetland");
    var currentfillop = x.value;
    var currentboundop = y.value;
    type = feature.properties.mgmt_class;
    var colorToUse;
    if (type === "1") colorToUse = '#c7e9c0';
    else if (type === "2") colorToUse = '#74c476';
    else if (type === "3") colorToUse = '#41ab5d';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}
//function stylemlccs(feature) {
//    type = feature.properties.carto;
//    var colorToUse;
//    if (type = 11) colorToUse = '#fec2c2';
//    else if (type = 12) colorToUse = '#fea4a4';
//    else if (type = 13) colorToUse = '#ff0000';
//    else if (type = 14) colorToUse = '#db0000';
//    else if (type = 15) colorToUse = '#810000';
//    else if (type = 21) colorToUse = '#c2fec2';
//    else if (type = 22) colorToUse = '#fefac2';
//    else if (type = 23) colorToUse = '#fef681';
//    else if (type = 24) colorToUse = '#737300';
//    else if (type = 31) colorToUse = '#92ae2f';
//    else if (type = 32) colorToUse = '#00e09c';
//    else if (type = 51) colorToUse = '#c09671';
//    else if (type = 52) colorToUse = '#feb576';
//    else if (type = 61) colorToUse = '#a06632';
//    else if (type = 62) colorToUse = '#bab56b';
//    else if (type = 63) colorToUse = '#dfd100';
//    else if (type = 71) colorToUse = '#b2b2b2';
//    else if (type = 81) colorToUse = '#ca00db';
//    else if (type = 82) colorToUse = '#63005f';
//    else if (type = 90) colorToUse = '#a4f9fe';
//    else if (type = 92) colorToUse = '#00dafe';
//    else colorToUse = "transparent";
//    return {
//        "color": colorToUse,
//        "fillColor": colorToUse,
//        "weight": 2,
//        "fillOpacity": currentfillop,
//        "opacity": currentboundop,
//    };
//}




//var gwdepbuff;
//
//
//
//var ;
//

//

//









//var hydricsoils;

//var soilgrps

//var nwi_cir

//var gwdepbuff;
//
//var gwdeppoly;
//
//var mwmo_wetland;
//
//var mwmo_wetland;
//
//var mnram;
//
//var mlccs;
//
//var parcels;
//
//var pwi_buffer;
//
//var subcatch;

///// **** END OF STYLE FUNCTIONS *** \\\\\


////*** Functions to change Opacity on Layers ****\\\\\


function updateOpacity(val, layer) {
    layer.setStyle({
        fillOpacity: val,
    });
}

function updateOpacityBound(val, layer) {
    layer.setStyle({
        opacity: val,
    });
}

function updateOpacityTile(val, layer) {
    layer.setOpacity(val);
    //    console.log(layer);
}

//opacity slider for pollution sens
//function updateOpacityTilepollsens(val) {
//    var checkVal = document.getElementById("pollsensGradient").checked;
//    if (checkVal === true) {
//        pollsensGradient.setOpacity(val);
//    } else {
//        pollsens.setOpacity(val);
//    }
//}

var rangeSlider = function () {
    var slider = $('.range-slider'),
        range = $('.slider'),
        value = $('.range-slider_val');

    slider.each(function () {

        value.each(function () {
            var value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function () {
            $(this).next(value).html(this.value);
        });
    });
};

rangeSlider();



/// Zoom to Layer IS THIS EVER USED??
//function zoomToFeature(urlLayer) {
//    var query = L.esri.query({
//        url: urlLayer,
//    });
//    query.bounds(function (error, latLngBounds, response) {
//        if (error) {
//            console.log(error);
//            return;
//        }
//        map.fitBounds(latLngBounds);
//    });
//}


/// ***Legend control items*** ////


var legendpoltJur = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Political Jurisdiction',
    legends: [{
        name: 'Political Jurisdiction',
        elements: [{
            html: document.querySelector('#poltJurLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendcnty = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Counties',
    legends: [{
        name: 'Counties',
        elements: [{
            html: document.querySelector('#cntyLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendparcels = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Parcels',
    legends: [{
        name: 'Parcels',
        elements: [{
            html: document.querySelector('#parcelsLegend').innerHTML
            }]
        }],
    detectStretched: true,
});

var legendhuc8 = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Major Watershed HUC 8 Boundaries',
    legends: [{
        name: 'Major Watershed HUC 8 Boundaries',
        elements: [{
            html: document.querySelector('#huc8Legend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendhuc10 = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'HUC 10 Boundaries',
    legends: [{
        name: 'HUC 10 Boundaries',
        elements: [{
            html: document.querySelector('#huc10Legend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendhuc12 = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'HUC 12 Boundaries',
    legends: [{
        name: 'HUC 12 Boundaries',
        elements: [{
            html: document.querySelector('#huc12Legend').innerHTML
            }]
        }],
    detectStretched: true,
});

var legendsubcatch = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Subcatchments',
    legends: [{
        name: 'Subcatchments',
        elements: [{
            html: document.querySelector('#subcatchLegend').innerHTML
            }]
        }],
    detectStretched: true,
});

var legendpwi_buffer = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'PWI Buffer - CMSCWD',
    legends: [{
        name: 'PWI Buffer - CMSCWD',
        elements: [{
            html: document.querySelector('#pwi_bufferLegend').innerHTML
            }]
        }],
    detectStretched: true,
});

var legendbuffbasins = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'PWI Basins',
    legends: [{
        name: 'PWI Basins',
        elements: [{
            html: document.querySelector('#buffbasinsLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
//var legendbuffwetlnds = L.control.htmllegend({
//    position: 'bottomleft',
//    layer: 'PWI - Wetlands',
//    legends: [{
//        name: 'PWI - Wetlands',
//        elements: [{
//            html: document.querySelector('#buffwetlndsLegend').innerHTML
//            }]
//        }],
//    detectStretched: true,
//});
var legendbuffwtrcrse = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'PWI - Watercourse',
    legends: [{
        name: 'PWI - Watercourse',
        elements: [{
            html: document.querySelector('#buffwtrcrseLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendmlccs = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'MLCCS',
    legends: [{
        name: 'MLCCS',
        elements: [{
            html: document.querySelector('#mlccsLegend').innerHTML
            }]
        }],
    detectStretched: true,
});

var legendnwi_cir = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'NWI - Circular 39 Classication',
    legends: [{
        name: 'NWI - Circular 39 Classication',
        elements: [{
            html: document.querySelector('#nwi_cirLegend').innerHTML
            }]
        }],
    detectStretched: true,
});

var legendmnram = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'MN Ram',
    legends: [{
        name: 'MN Ram',
        elements: [{
            html: document.querySelector('#mnramLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendmwmo_wetland = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'MWMO Wetland Data',
    legends: [{
        name: 'MWMO Wetland Data',
        elements: [{
            html: document.querySelector('#mwmo_wetlandLegend').innerHTML
            }]
        }],
    detectStretched: true,
});

var legendsoilgrps = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Soil Groups',
    legends: [{
        name: 'Soil Groups',
        elements: [{
            html: document.querySelector('#soilgrpsLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendhydricsoils = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Hydric Soils',
    legends: [{
        name: 'Hydric Soils',
        elements: [{
            html: document.querySelector('#hydricsoilsLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendgwdepbuff = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'GW Dep Buff',
    legends: [{
        name: 'GW Dep Buff',
        elements: [{
            html: document.querySelector('#gwdepbuffLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendgwdeppoly = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'GW Dep Poly',
    legends: [{
        name: 'GW Dep Poly',
        elements: [{
            html: document.querySelector('#gwdeppolyLegend').innerHTML
            }]
        }],
    detectStretched: true,
});

var legendmask = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Planning Area Mask',
    legends: [{
        name: 'Planning Area Mask',
        elements: [{
            html: document.querySelector('#maskLegend').innerHTML
            }]
        }],
    detectStretched: true,
});


// add legends to print
function addPrintLegend(print) {
    $.each($('input[class="showLegend"]:checked'), function () {
        x = window[this.value];
        return x.addTo(print.printMap);
    });
}

function postPrintLegend() {
    $.each($('input[class="showLegend"]:checked'), function () {
        //        console.log(window[this.value]);
        x = window[this.value];
        return x.addTo(map);
    });

}

function changeStyle(val, layer) {
    //    console.log(val);
    layer.setStyle(val);
    //    console.log(layer.setStyle(val));
}

function changeToOrigStyle(val, layer) {
    //    console.log(val);
    layer.setStyle(val);
}

$(document).ready(function () {
    sidebar.open('home');
    //    createSidebar();


    $('#range').on("input", function () {
        $('.output').val(this.value);
    }).trigger("change");

    $('.collapse')
        .on('shown.bs.collapse', function () {
            $(this)
                .parent()
                .find(".fa-plus")
                .removeClass("fa-plus")
                .addClass("fa-minus");
        })
        .on('hidden.bs.collapse', function () {
            $(this)
                .parent()
                .find(".fa-minus")
                .removeClass("fa-minus")
                .addClass("fa-plus");
        });

    $('leaflet-printing').click(function () {
        console.log("print button clicked");
    });
    $('input[type="checkbox"]').click(function () {
        layerClicked = window[event.target.value];
        colorGradeID = window[event.target.id]; // the function name of the style for gradient color scheme 
        colorOrigID = window[event.target.name]; //the original color scheme function
        idName = this.id;
        console.log("the id = ",
            idName);
        if ($(this).is(":checked") && $(this).hasClass('pollution-sens')) {
            //            layerClicked.on('loading', function (e) {
            //                loadingControl._showIndicator()
            //            });
            //            layerClicked.on('load', function (e) {
            //                loadingControl._hideIndicator
            //            });
            map.removeLayer(layerClicked);
            map.addLayer(colorGradeID);
        } else if ($(this).is(":not(:checked)") && $(this).hasClass('pollution-sens')) {
            map.removeLayer(colorGradeID);
        } else if ($(this).is(":checked") && $(this).hasClass('colorGrade')) {
            //                        layerClicked.on('loading', function (e) {
            //                            loadingControl._showIndicator()
            //                        });
            //                        layerClicked.on('load', function (e) {
            //                            loadingControl._hideIndicator
            //                        });
            changeStyle(colorGradeID, layerClicked); //calls function to change the style
        } else if ($(this).is(":not(:checked)") && $(this).hasClass('colorGrade')) {
            changeToOrigStyle(colorOrigID, layerClicked);
        } else if ($(this).is(":checked") && $(this).hasClass('showLegend')) {
            map.addControl(layerClicked); //calls function to add legend
        } else if ($(this).is(":not(:checked)") && $(this).hasClass('showLegend')) {
            map.removeControl(layerClicked); //remove legend control
        } else if ($(this).is(":checked")) {
            //            layerClicked.on('loading', function (e) {
            //                loadingControl._showIndicator()
            //            });
            //            layerClicked.on('load', function (e) {
            //                loadingControl._hideIndicator
            //            });
            console.log('idName = ', idName)
            switch (idName) {
                case 'wellhead_layer':
                    $.ajax({
                        url: url_wellhead,
                        dataType: 'jsonp',
                        jsonpCallback: a_wellhead.replace(":", ""),
                        success: function (response) {
                            wellhead = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylewellhead,
                            });

                            map.addLayer(wellhead);
                        }

                    }); // end of stylewellhead call
                    break;
                case 'distBound_layer':
                    $.ajax({
                        url: url_distBound,
                        dataType: 'jsonp',
                        jsonpCallback: a_distBound.replace(":", ""),
                        success: function (response) {
                            distBound = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                //            layerName: 'distBound',
                                style: styledistBound,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><b><i> District: </b>' + feature.properties.lkmgtdist + '</i></p>');
                                    layer.on({
                                        mouseover: function (e) {
                                            layer.setStyle({
                                                weight: 3,
                                                color: '#00FFFF',
                                                opacity: 1
                                            });
                                            if (!L.Browser.ie && !L.Browser.opera) {
                                                layer.bringToFront();
                                            }
                                        },
                                        mouseout: function (e) {
                                            //                                            console.log(e);
                                            distBound.resetStyle(e.target);
                                        },
                                    });
                                },
                            });
                            map.addLayer(distBound);
                        }

                    }); //end of call for distBound variable
                    break;
                case 'poltJur_layer':
                    $.ajax({
                        url: url_poltJur,
                        dataType: 'jsonp',
                        jsonpCallback: a_poltJur.replace(":", ""),
                        success: function (response) {
                            poltJur = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylepoltJur,
                            });
                            map.addLayer(poltJur);
                            //        console.log(distBound.getBounds().toBBoxString());
                            //        -93.02427108,45.22182617,-92.79967634,45.33440437
                        }

                    }); //end of call for political jursdiction variable
                    break;
                case 'cnty_layer':
                    $.ajax({
                        url: url_cnty,
                        dataType: 'jsonp',
                        jsonpCallback: a_cnty.replace(":", ""),
                        success: function (response) {
                            cnty = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylecnty,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><i> County: ' + feature.properties.county_nam + '</i></p>');
                                    layer.on({
                                        mouseover: function (e) {
                                            layer.setStyle({
                                                weight: 3,
                                                color: '#00FFFF',
                                                opacity: 1
                                            });
                                            if (!L.Browser.ie && !L.Browser.opera) {
                                                layer.bringToFront();
                                            }
                                        },
                                        mouseout: function (e) {
                                            cnty.resetStyle(e.target);
                                        },
                                    });
                                },

                            });
                            map.addLayer(cnty);
                            console.log(cnty.getBounds().toBBoxString());
                        }

                    }); //end of call for county variable
                    break;

                case 'huc8_layer':
                    $.ajax({
                        url: url_huc8,
                        dataType: 'jsonp',
                        jsonpCallback: a_huc8.replace(":", ""),
                        success: function (response) {
                            huc8 = L.geoJSON(response, {
                                attribution: '',
                                interactive: true,
                                style: stylehuc8,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><i> HUC 8 Name: ' + feature.properties.hu_8_name + '</i></p>');
                                    layer.on({
                                        mouseover: function (e) {
                                            layer.setStyle({
                                                weight: 3,
                                                color: '#00FFFF',
                                                opacity: 1
                                            });
                                            if (!L.Browser.ie && !L.Browser.opera) {
                                                layer.bringToFront();
                                            }
                                        },
                                        mouseout: function (e) {
                                            huc8.resetStyle(e.target);
                                        },
                                    });
                                },
                            });
                            map.addLayer(huc8);
                        }
                    }); //end of call for huc8 variable
                    break;
                case 'huc10_layer':
                    $.ajax({
                        url: url_huc10,
                        dataType: 'jsonp',
                        jsonpCallback: a_huc10.replace(":", ""),
                        success: function (response) {
                            huc10 = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylehuc10,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><i> HUC 10 Name: ' + feature.properties.hu_10_name + '</i></p>');
                                    layer.on({
                                        mouseover: function (e) {
                                            layer.setStyle({
                                                weight: 3,
                                                color: '#00FFFF',
                                                opacity: 1
                                            });
                                            if (!L.Browser.ie && !L.Browser.opera) {
                                                layer.bringToFront();
                                            }
                                        },
                                        mouseout: function (e) {
                                            huc10.resetStyle(e.target);
                                        },
                                    });
                                },
                            });
                            map.addLayer(huc10);
                        }
                    }); //end of call for huc10 variable
                    break;
                case 'huc12_layer':
                    $.ajax({
                        url: url_huc12,
                        dataType: 'jsonp',
                        jsonpCallback: a_huc12.replace(":", ""),
                        success: function (response) {
                            huc12 = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylehuc12,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><i> HUC 12 Name: ' + feature.properties.hu_12_name + '</i></p>');
                                    layer.on({
                                        mouseover: function (e) {
                                            layer.setStyle({
                                                weight: 3,
                                                color: '#00FFFF',
                                                opacity: 1
                                            });
                                            if (!L.Browser.ie && !L.Browser.opera) {
                                                layer.bringToFront();
                                            }
                                        },
                                        mouseout: function (e) {
                                            huc12.resetStyle(e.target);
                                        },
                                    });
                                },
                            });
                            map.addLayer(huc12);
                        }
                    }); //end of call for huc12 variable
                    break;
                case 'nwi_cir_layer':
                    console.log(layerClicked);
                    map.addLayer(layerClicked);
                    var x = document.getElementById("fillop_nwi_cir");
                    var currentfillop = x.value;
                    layerClicked.setOpacity(currentfillop);
                    // end of nwi call
                    break;
                case 'gwdepbuff_layer':
                    $.ajax({
                        url: url_gwdepbuff,
                        dataType: 'jsonp',
                        jsonpCallback: a_gwdepbuff.replace(":", ""),
                        success: function (response) {
                            gwdepbuff = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylegwdepbuff,
                            });
                            map.addLayer(gwdepbuff);
                            console.log(gwdepbuff);
                        }
                    }); // end of wtrvul call
                    break;
                case 'gwdeppoly_layer':
                    $.ajax({
                        url: url_gwdeppoly,
                        dataType: 'jsonp',
                        jsonpCallback: a_gwdeppoly.replace(":", ""),
                        success: function (response) {
                            gwdeppoly = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylegwdeppoly,
                            });
                            map.addLayer(gwdeppoly);
                        }
                    }); // end of wtrvul call
                    break;
                case 'mwmo_wetland_layer':
                    $.ajax({
                        url: url_mwmo_wetland,
                        dataType: 'jsonp',
                        jsonpCallback: a_mwmo_wetland.replace(":", ""),
                        success: function (response) {
                            mwmo_wetland = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylemwmo_wetland,
                            });
                            map.addLayer(mwmo_wetland);
                            //                            console.log(fEMAflood);
                        }
                    }); // end of fEMAflood call
                    break;
                case 'mnram_layer':
                    $.ajax({
                        url: url_mnram,
                        dataType: 'jsonp',
                        jsonpCallback: a_mnram.replace(":", ""),
                        success: function (response) {
                            mnram = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylemnram,
                            });
                            map.addLayer(mnram);
                        }
                    }); // end of altwtr call
                    break;
                    //                case 'buffwetlnds_layer':
                    //                    $.ajax({
                    //                        url: url_buffwetlnds,
                    //                        dataType: 'jsonp',
                    //                        jsonpCallback: a_buffwetlnds.replace(":", ""),
                    //                        success: function (response) {
                    //                            buffwetlnds = L.geoJson(response, {
                    //                                attribution: '',
                    //                                interactive: true,
                    //                                style: stylebuffwetlnds,
                    //                            });
                    //                            map.addLayer(buffwetlnds);
                    //                        }
                    //                    }); // end of buffwetlnds call
                    //
                    //                    break;
                case 'buffbasins_layer':
                    $.ajax({
                        url: url_buffbasins,
                        dataType: 'jsonp',
                        jsonpCallback: a_buffbasins.replace(":", ""),
                        success: function (response) {
                            buffbasins = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylebuffbasins,
                            });
                            map.addLayer(buffbasins);
                        }
                    }); // end of buffwetlnds call

                    break;
                case 'buffwtrcrse_layer':
                    $.ajax({
                        url: url_buffwtrcrse,
                        dataType: 'jsonp',
                        jsonpCallback: a_buffwtrcrse.replace(":", ""),
                        success: function (response) {
                            buffwtrcrse = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylebuffwtrcrse,
                            });
                            map.addLayer(buffwtrcrse);
                        }
                    }); // end of buffwtrcrse call
                    break;

                case 'parcels_layer':
                    $.ajax({
                        url: url_parcels,
                        dataType: 'jsonp',
                        jsonpCallback: a_parcels.replace(":", ""),
                        success: function (response) {
                            parcels = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styleparcels,
//                                onEachFeature: function (f, l) {
        //                                    l.bindPopup('<pre>' + JSON.stringify(f.properties, null, ' ').replace(/[\{\}"]/g, '') + '</pre>');
        //                                }
                                //                                onEachFeature: function (feature, layer) {
                                //                                    layer.bindPopup('<p><b><i> Impaired for: </b>' + feature.properties.imp_param + '</i></p>');
                                //                                    layer.on({
                                //                                        mouseover: function (e) {
                                //                                            layer.setStyle({
                                //                                                weight: 3,
                                //                                                color: '#00FFFF',
                                //                                                opacity: 1
                                //                                            });
                                //                                            if (!L.Browser.ie && !L.Browser.opera) {
                                //                                                layer.bringToFront();
                                //                                            }
                                //                                        },
                                //                                        mouseout: function (e) {
                                //                                            var checkVal = document.getElementById("styleGradientimpLks").checked;
                                //                                            if (checkVal === true) {
                                //                                                impLks.setStyle(styleGradientimpLks);
                                //                                            } else {
                                //                                                impLks.resetStyle(e.target);
                                //                                            }
                                //                                        },
                                //                                    });
                                //                                }
                            });
                            map.addLayer(parcels);
                        }
                    }); // end of impLks call
                    break;
                case 'pwi_buffer_layer':
                    $.ajax({
                        url: url_pwi_buffer,
                        dataType: 'jsonp',
                        jsonpCallback: a_pwi_buffer.replace(":", ""),
                        success: function (response) {
                            pwi_buffer = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylepwi_buffer,
                            });
                            map.addLayer(pwi_buffer);
                        }
                    }); // end of phos call
                    break;
                case 'subcatch_layer':
                    $.ajax({
                        url: url_subcatch,
                        dataType: 'jsonp',
                        jsonpCallback: a_subcatch.replace(":", ""),
                        success: function (response) {
                            subcatch = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylesubcatch,
                            });
                            map.addLayer(subcatch);
                        }
                    }); // end of subcatch call
                    break;
                case 'soilgrps_layer':
                    console.log(layerClicked);
                    map.addLayer(layerClicked);
                    var x = document.getElementById("fillop_soilgrps");
                    var currentfillop = x.value;
                    layerClicked.setOpacity(currentfillop);
                    // end of Soils Group call
                    break;
                case 'hydricsoils_layer':
                    console.log(layerClicked);
                    map.addLayer(layerClicked);
                    var x = document.getElementById("fillop_hydricsoils");
                    var currentfillop = x.value;
                    layerClicked.setOpacity(currentfillop);
                    // end of hydric soils call
                    break;
                case 'mask_layer':
                    $.ajax({
                        url: url_mask,
                        dataType: 'jsonp',
                        jsonpCallback: a_mask.replace(":", ""),
                        success: function (response) {
                            mask = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylemask,
                            });
                            map.addLayer(mask);
                        }

                    }); //end of call for mask variable 
                    break;
                case 'mlccs_layer':
                    console.log(layerClicked);
                    map.addLayer(layerClicked);
                    var x = document.getElementById("fillop_mlccs");
                    var currentfillop = x.value;
                    layerClicked.setOpacity(currentfillop);
                    // end of mlccs call
                    break;
                    //                case 'wildLife_layer':
                    //                    console.log(layerClicked);
                    //                    map.addLayer(layerClicked);
                    //                    var x = document.getElementById("fillop_wildLife");
                    //                    var currentfillop = x.value;
                    //                    layerClicked.setOpacity(currentfillop);
                    //                    // end of strms call
                    //                    break;

                default:
                    console.log('data call issue');
                    break;
            }
            //            console.log("layerclicked = ",
            //                layerClicked); //this comes up undefined...
        } else if ($(this).is(":not(:checked)")) {
            map.removeLayer(layerClicked);
        }
    });

    //     center: [45.2, -92.85],
    if ($(window).width() < 414.1) {
        map.setView([45.18, -93.13]); // -92.7885
        //map.setView([46.4, -91.99]);
        map.setZoom(10.75)
    } else if ($(window).width() < 768.1) {
        map.setView([45.18, -92.82])
    } else if ($(window).width() < 950) {
        map.setView([45.18, -92.9])
    } else if ($(window).width() < 1260) {
        map.setView([45.18, -92.9])
    }

    //to show loading icon on layers
    $(document).ajaxStart(function (e) {
        //        console.log('start ajax triggered');
        //        console.log(e);
        loadingControl._showIndicator();
    });
    $(document).ajaxStop(function (e) {
        loadingControl._hideIndicator();
        //        console.log('stop ajax triggered');
        //        console.log(e);
    });

});
