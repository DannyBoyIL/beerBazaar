
function init(get) {

    var map = document.querySelectorAll(".map");

    for (i = 0; i < myJSONResult.results.length; i++) {
        myAddress[i] = myJSONResult.results[i].formatted_address;
    }
    angular.element(get.target);
}