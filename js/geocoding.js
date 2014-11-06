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