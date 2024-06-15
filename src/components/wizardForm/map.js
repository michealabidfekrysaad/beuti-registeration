import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";
import { connect } from "react-redux";
import { validateUserLocation } from "./../../services/redux/actions/index";

Geocode.setApiKey("AIzaSyBIelibOPbA151bV1FPypYQsHyFod_wNVE");
Geocode.enableDebug();
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      area: "",
      state: "",
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
    };
  }
  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    // IF ADDRESS IS ALREADY SAVED (SET ADDRESS , LAT , LNG FROM USER DATA)
    if (this.props.stepOneUserLocation) {
    } else {
      Geocode.fromLatLng(
        this.state.mapPosition.lat,
        this.state.mapPosition.lng
      ).then(
        (response) => {
          const address = response.results[0].formatted_address,
            addressArray = response.results[0].address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray);
          this.setState({
            address: address ? address : "",
            area: area ? area : "",
            city: city ? city : "",
            state: state ? state : "",
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.stepOneUserLocation !== this.props.stepOneUserLocation;
  };
  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getCity = (addressArray) => {
    if (addressArray) {
      if (!addressArray) return;
      let city = "";
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_2" === addressArray[i].types[0]
        ) {
          city = addressArray[i].long_name;
          return city;
        }
      }
    }
  };
  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getArea = (addressArray) => {
    if (!addressArray) return;
    if (addressArray) {
      let area = "";
      for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0]) {
          for (let j = 0; j < addressArray[i].types.length; j++) {
            if (
              "sublocality_level_1" === addressArray[i].types[j] ||
              "locality" === addressArray[i].types[j]
            ) {
              area = addressArray[i].long_name;
              return area;
            }
          }
        }
      }
    }
  };
  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = (addressArray) => {
    if (!addressArray) return;
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  /**
   * And function for city,state and address input
   * @param event
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */
  onInfoWindowClose = (event) => {};
  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = (place) => {
    if (!place.geometry) return;
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    this.props.validateUserLocation({
      address: address,
      lat: latValue,
      lang: lngValue,
      isValid: true,
    });
    // Set these values in the state.
    this.setState({
      address: address ? address : "",
      area: area ? area : "",
      city: city ? city : "",
      state: state ? state : "",
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };
  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng(),
      addressArray = [];
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.props.validateUserLocation({
          address: address,
          lat: newLat,
          lang: newLng,
          isValid: true,
        });
        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };
  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <React.Fragment>
          <GoogleMap
            google={this.props.google}
            defaultZoom={this.props.zoom}
            center={{
              lat: this.props.stepOneUserLocation.lat,
              lng: this.props.stepOneUserLocation.lang,
            }}
          >
            <div className="field">
              <label className="field__label">
                {
                  this.props.localization.FORM_INPUTS_PLACEHOLDERS
                    .ENTER_LOCATION[`${this.props.language}`]
                }
              </label>
            </div>

            {/* For Auto complete Search Box */}
            <Autocomplete
              placeholder={this.props.stepOneUserLocation.address}
              style={{
                width: "100%",
                height: "40px",
                paddingLeft: "16px",
                marginBottom: "16px",
              }}
              onPlaceSelected={this.onPlaceSelected}
              className="field__input google-input-search "
              types={["geocode"]}
              fields={["ALL"]}
              onSubmit={(e) => e.preventDefault()}
            />
            {/*Marker*/}
            <Marker
              google={this.props.google}
              name={"Dolores park"}
              draggable={true}
              onDragEnd={this.onMarkerDragEnd}
              position={{
                lat: this.props.stepOneUserLocation.lat,
                lng: this.props.stepOneUserLocation.lang,
              }}
            />
            <Marker />
            {/* InfoWindow on top of marker */}
            <InfoWindow
              onClose={this.onInfoWindowClose}
              position={{
                lat: this.props.stepOneUserLocation.lat + 0.001,
                lng: this.props.stepOneUserLocation.lang,
              }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>
                  {this.props.stepOneUserLocation.address}
                </span>
              </div>
            </InfoWindow>
          </GoogleMap>
        </React.Fragment>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div>
          <AsyncMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBIelibOPbA151bV1FPypYQsHyFod_wNVE&libraries=places&callback=initMap"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div
                style={{
                  height: "450px",
                  display: "flex",
                  flexDirection: "column-reverse",
                }}
              />
            }
            mapElement={
              <div style={{ height: `100%`, marginBottom: "16px" }} />
            }
          />
        </div>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, { validateUserLocation })(Map);
