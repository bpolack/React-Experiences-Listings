const { useState, useCallback } = wp.element;
import { GoogleMap, useJsApiLoader, MarkerClusterer } from '@react-google-maps/api';
import './RelListingMap.css';

// Import Components
import RelMapMarker from './RelMapMarker/RelMapMarker';

const containerStyle = {
    width: '100%',
    height: '600px',
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)"
};
const center = {
    lat: 49.264813,
    lng: -121.818852
};
const zoom = 12;

const mapStyle = [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#9c9c9c"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7b7b7b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c8d7d4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#070707"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    }
];

const iconSVG = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(23, 63, 87, 0.7)" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>';
const clusterStyles = [
    { textColor: 'white', height: 40, width: 40, url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(iconSVG) },
    { textColor: 'white', height: 50, width: 50, url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(iconSVG) },
    { textColor: 'white', height: 60, width: 60, url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(iconSVG) },
    { textColor: 'white', height: 68, width: 68, url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(iconSVG) },
    { textColor: 'white', height: 76, width: 76, url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(iconSVG) },
    { textColor: 'white', height: 85, width: 85, url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(iconSVG) }
];

function RelListingMap(props) {

    // Destruct required props and globals
    const { listings } = props;
    const { mapField } = props.globals;

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: props.globals.apiKey,
        preventGoogleFontsLoading: true
    })

    const [map, setMap] = useState(null);

    function triggerMapLoadMore(toggle) {
        if (toggle) {
            props.loadMore(moreToLoad => {
                if (moreToLoad) {
                    setTimeout(
                        () => triggerMapLoadMore(true),
                        800
                    );
                }
            });
        }
    }

    const onLoad = useCallback(function callback(map) {
        triggerMapLoadMore(true);
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            options={{ styles: mapStyle, mapTypeControl: false }}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <MarkerClusterer styles={clusterStyles}>
                {(clusterer) =>
                    listings.map((listing, index) => {
                        if (typeof listing.rel_fields[mapField] !== 'undefined' && listing.rel_fields[mapField] != false && typeof listing.rel_fields[mapField].lat === 'number' && typeof listing.rel_fields[mapField].lng === 'number') {
                            const listingPosition = {
                                lat: listing.rel_fields[mapField].lat,
                                lng: listing.rel_fields[mapField].lng
                            }
                            return (
                                <RelMapMarker
                                    key={listing.key}
                                    listing={listing}
                                    listingPosition={listingPosition}
                                    clusterer={clusterer}
                                    toggleModal={props.toggleModal}
                                />
                            )
                        }
                    })
                }
            </MarkerClusterer>
        </GoogleMap>
    ) : <></>
}

export default RelListingMap