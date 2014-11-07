/**
 * Initiating different geocoding service from different suppliers
 * 
 * Created November 6th, 2014
 * @author: Yariv Katz
 * @version: 1.0
 * @copyright: Nerdeez LTD
 */


/***************************
 * begin private functions
 ***************************/

/**
 * constructor
 */
function _init(){
    
    //init google places auto complete
    var input = document.getElementById('google-places');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function(details) {
        var place = autocomplete.getPlace();
        var table = prettyPrint(place);
        $('.google-geocoding .result').append(table);
    }); 
    
    //init mapbox geocoding
    $("#mapbox-places").keyup(function() {
        var val = $("#mapbox-places").val();
        var url = 'http://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/' + val + '.json?access_token=pk.eyJ1IjoieXdhcmV6ayIsImEiOiJlVlU2eU9FIn0.yGTJwarqvLj1LMUv7oNh4w';
        $.ajax({
            url: url
        }).done(function(data) {
            var html = '<ul>';
            for(var i=0; i<data.features.length; i++){
                var singleFeature = data.features[i];
                html = html + '<li>' + singleFeature.place_name + '</li>';        
            }
            html = html + '</ul>';
            $('#autocomplete-mapbox').html(html);
        });
    });
    
    //init bing geocoding services
    var table = prettyPrint({"authenticationResultCode":"ValidCredentials","brandLogoUri":"http:\/\/dev.virtualearth.net\/Branding\/logo_powered_by.png","copyright":"Copyright © 2014 Microsoft and its suppliers. All rights reserved. This API cannot be accessed and the content and any results may not be used, reproduced or transmitted in any manner without express written permission from Microsoft Corporation.","resourceSets":[{"estimatedTotal":1,"resources":[{"__type":"Location:http:\/\/schemas.microsoft.com\/search\/local\/ws\/rest\/v1","bbox":[31.712636947631836,34.101902008056641,32.405399322509766,35.424480438232422],"name":"Tel Aviv, Israel","point":{"type":"Point","coordinates":[32.085258483886719,34.790130615234375]},"address":{"adminDistrict":"Tel Aviv","countryRegion":"Israel","formattedAddress":"Tel Aviv, Israel","locality":"Tel Aviv","countryRegionIso2":"IL"},"confidence":"High","entityType":"PopulatedPlace","geocodePoints":[{"type":"Point","coordinates":[32.085258483886719,34.790130615234375],"calculationMethod":"Rooftop","usageTypes":["Display"]}],"matchCodes":["Good"],"queryParseValues":[{"property":"Locality","value":"tel aviv"}]}]}],"statusCode":200,"statusDescription":"OK","traceId":"5a9a550ae8664cd6a1e8b4afd6c900be|DB40180157|02.00.106.3100|DB4SCH010061320, DB4SCH010061332, DB4SCH010080218"});
    $('#bing-result1').html(table);
    var table2 = prettyPrint({"authenticationResultCode":"ValidCredentials","brandLogoUri":"http:\/\/dev.virtualearth.net\/Branding\/logo_powered_by.png","copyright":"Copyright © 2014 Microsoft and its suppliers. All rights reserved. This API cannot be accessed and the content and any results may not be used, reproduced or transmitted in any manner without express written permission from Microsoft Corporation.","resourceSets":[{"estimatedTotal":0,"resources":[]}],"statusCode":200,"statusDescription":"OK","traceId":"032ad9a681a94dc2b641cccb8b5af075|DB40061119|02.00.106.3100|DB4SCH010060660, DB4SCH010061331, DB4SCH010080718"});
    $('#bing-result2').html(table2);
    
    //init open street map geocoding
    $("#openstreet-places").keyup(function() {
        var val = $("#openstreet-places").val();
        var url = 'http://nominatim.openstreetmap.org/search?format=json&accept-language=he&q=' + val;
        $.ajax({
            url: url
        }).done(function(data) {
            var html = '<ul>';
            for(var i=0; i<data.length; i++){
                var singleFeature = data[i];
                html = html + '<li>' + singleFeature.display_name + '</li>';        
            }
            html = html + '</ul>';
            $('#autocomplete-openstreet').html(html);
        });
    });
    
    //init arcgis geocoding
    $("#arcgis-places").keyup(function() {
        var val = $("#arcgis-places").val();
        var url = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?text=' + val + '&f=json';
        $.ajax({
            url: url
        }).done(function(data) {
            var obj = JSON.parse(data);
            var html = '<ul>';
            for(var i=0; i<obj.locations.length; i++){
                var singleFeature = obj.locations[i];
                html = html + '<li>' + singleFeature.name + '</li>';        
            }
            html = html + '</ul>';
            $('#autocomplete-arcgis').html(html);
        });
    });
       
};

/***************************
 * end private functions
 ***************************/


/************************
 * begin entry point
 ************************/

$( document ).ready(function() {
    _init();
});

/************************
 * end entry point
 ************************/