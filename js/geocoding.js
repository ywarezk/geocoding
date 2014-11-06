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