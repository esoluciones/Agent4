
function LoadGMap(divId, locations, rowCount) {
    var wInfowindow = null;
    try {
        if (typeof google === 'object' && typeof google.maps === 'object') {
            wInfowindow = new google.maps.InfoWindow();
        }
    } catch (e) {
        //Ignore
    }
    if (wInfowindow == null) {
        showRadAlert("No está cargada el API de gmaps.", 330, 100);
    } else {
        var wGeocoder = new google.maps.Geocoder();
        var wBounds = new google.maps.LatLngBounds();
        var wMap = new google.maps.Map($get(divId), {
            disableDefaultUI: true,
            zoom: 8,
            zoomControl: true,
            streetViewControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        for (var i = 0; i < rowCount; i++) {
            var wEntry = locations[i];
            DoLoadGMap(wEntry[0], wEntry[1], wInfowindow, wGeocoder, wBounds, wMap);
        };
    }
}

function DoLoadGMap(title, address, infowindow, geocoder, bounds, map) {
    geocoder.geocode({ 'address': address },
    function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                var wLocation = results[0].geometry.location;
                bounds.extend(wLocation);
                map.fitBounds(bounds);
                map.setZoom(15);
                var wMarker = new google.maps.Marker({
                    map: map,
                    title: title,
                    position: wLocation,
                    clickable: true
                });
                google.maps.event.addListener(wMarker, 'click', function () {
                    infowindow.setContent(title + '<br>' + results[0].formatted_address);
                    infowindow.open(map, wMarker);
                });
          //} else {
              //showRadAlert("No se encontraron resultados para '" + title + "'.", 330, 100);
            }
        } else {
            if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                setTimeout(function () {
                    DoLoadGMap(title, address, infowindow, geocoder, bounds, map);
                }, 100);
          //} else {
              //showRadAlert("No se pudo localizar a '" + title + "' por el siguiente motivo: " + status, 330, 100);
            }
        }
    });
}
