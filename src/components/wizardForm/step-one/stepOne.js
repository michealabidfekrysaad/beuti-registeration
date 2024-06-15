import React , { Component }from "react";
import { connect } from "react-redux";
import Map from '../map'
import { isEmail } from './../../../validation/email'
//Import React Scrit Libraray to load Google object
import './../../register_form/register_form.scss';
import { validateEmailUniquness , 
         validateEmail ,
        validateUserLocation ,
        validateCity
      } from './../../../services/redux/actions/index';
import { isRequired } from './../../../validation/length';
import Select from 'react-select';
import './step-one.scss';
import AddCodeModal from "../../AddCode/AddCode";
import Geocode from "react-geocode";
import CitySelector from "./CitySelector";
Geocode.setApiKey('AIzaSyBIelibOPbA151bV1FPypYQsHyFod_wNVE');
Geocode.enableDebug();
class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: this.props.language,
      userEmail : this.props.stepOneEmail.email,
      userEmailError: '',
      selectedOption: null,
      // selectedOption: [],
      options: this.props.cities,
      cityError: '',
      userLocation: this.props.stepOneUserLocation
    }
    Geocode.setLanguage(this.props.language);
  }


 askForLocation = () => {
 let _self = this

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {displayLocationInfo(pos)}, function(error) {
        displayLocationInfo ({
          coords: {
            latitude: 24.7136,
            longitude: 46.6753
          }
        })
      });
    }
    
    function displayLocationInfo  (position) {
      
      _self.props.validateUserLocation( { 
        lat:  position.coords.latitude,
        lang: position.coords.longitude,
        
    })

    Geocode.fromLatLng( 
      position.coords.latitude , 
      position.coords.longitude ).then(
      response => {
       const address = response.results[0].formatted_address;
       _self.props.validateUserLocation(
        { 
            address: address,
            lat: position.coords.latitude,
            lang: position.coords.longitude,
            isValid: true
        }
      )
      _self.setState({
        userLocation: { 
            address: address,
            lat: position.coords.latitude,
            lang: position.coords.longitude,
            isValid: true
        }
      })
      },
      error => {
       console.error(error);
      }
     );
    }
 }

  componentDidMount ()  {
    // Ask for position if the props comes with the default position because this means we have a saved position.
    // solution for tfs-66186 prelive bug.
    if (this.props.stepOneUserLocation.lat === 24.7136 && this.props.stepOneUserLocation.lang === 46.6753) {
      this.askForLocation();
    }
    // IF CITY IS ALREADY EXIST (SET CITY FROM USER PREV INPUT)
    if (this.props.city) {
      this.setState({
        selectedOption: this.props.city
      })
    }
    let options = [...this.state.options]
    options.map( (city) => {
      city['label'] = city.name;
      city['value'] = city.id
  })
      this.setState({
          options
      })    

  }

    //  UPDATE STATE WHEN PROPS CHANGED
    shouldComponentUpdate( nextProps ) {
      return ( 
          nextProps.language  !== this.props ||
          nextProps.city      !== this.props.city ||
          nextProps.stepOneUserLocation !== this.state.userLocation
      )
  }


  //  UPDATE STATE WHEN PROPS CHANGED
  componentDidUpdate(nextProps){
    if(this.state.lang != this.props.language ) {
      this.setState({
        lang: this.props.language
      })
      if (this.state.userEmailError) {
        this.setState({
          userEmailError: this.emailAddressValidation(this.state.userEmail)
        })
      }
    }
  }

  cityValidation = (city) => {
    const isRequiredError = city;
    if (isRequiredError) {
      return this.props.localization.VALIDATION.IS_REQUIRED[`${this.props.language}`];
    }


  }

  emailAddressValidation = (email ) => {
    const isRequiredError = isRequired(email.trim(), 1);
    const isEmailValid    = isEmail(email.trim());
    this.props.validateEmail({value: email.trim(), isValid: !isRequiredError && isEmailValid })

    if (isRequiredError) {
      return this.props.localization.VALIDATION.IS_REQUIRED[`${this.props.language}`];
    }
    if (!isEmailValid) {
      return this.props.localization.VALIDATION.EMAIL_VALIDATION[`${this.props.language}`];
    }

  }

  
  testValidate = () => {
    // this.props.validateEmailUniquness(this.state.userEmail.trim())
  }
  handleChangeCity = (selectedOption) => {
    this.props.validateCity(selectedOption)
    this.setState({ selectedOption ,
    cityError:  this.cityValidation(selectedOption),
  });
  };
  render () {
    const { selectedOption  , options } = this.state;
    const { language } = this.props;
    if (this.props.localization) {
        return (
   
          <React.Fragment>
            <div className='test'>
            <div className="field mb-3 mt-5" dir={`${language === 'ar' ? 'rtl': 'ltr'}`}>
            <label className="field__label">
                { this.props.localization.FORM_INPUTS_PLACEHOLDERS.EMAIL[`${this.props.language}`]}
              </label>
              <input
                className={"field__input mb-4" + (this.props.language == 'ar' ? 'text-right' : 'text-left')} 
                id="username"
                name="username"
                type="text"
                placeholder={this.props.language == 'ar' ? 'الإيميل المرتبط بمركزك' : " center's email"}
                value={this.state.userEmail}
                onChange={(e) => {
                  this.setState({
                    userEmail: e.target.value ,
                    userEmailError:  this.emailAddressValidation(e.target.value),
                  });
                }}
               />

              {
              this.state.userEmailError ? 
                <span className='field__errors' >
                      {this.state.userEmailError }
                </span>
              :
                null
            }

            {
              this.props.EmailUniqunessError  && !this.state.userEmailError?
              <span className='field__errors' >
              {this.props.EmailUniqunessError['message'] }
                  </span>
                :
               null
            }
            </div>

            <Map
                google={this.props.google}
                center={{lat: this.state.userLocation.lat, 
                         lng: this.state.userLocation.lang }}
                address={this.state.userLocation.address}
                height='300px'
                zoom={15}
                lang={this.props.language}
            />
            </div>
            
            <div  className="field mb-4"> 
              <label htmlFor="city name"
                      className="field__label"
              >
                {this.props.localization.FORM_INPUTS_PLACEHOLDERS.CITIES[`${this.props.language}`]}
              </label>
              <CitySelector handleChangeCity={this.handleChangeCity} selectedOption={selectedOption} options={this.state.options} />
            </div>
            <AddCodeModal />
            {
              this.props.EmailUniqunessError  && !this.state.userEmailError?
			  <div  className="mb-2"> 
              <span className='field__errors' >
              {this.props.EmailUniqunessError['message'] }
                  </span>
				  </div>
                :
               null
            }
          </React.Fragment>
    
        )
    }
   
  }




}


const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps , {validateEmailUniquness ,
                                          validateEmail , 
                                          validateUserLocation , 
                                          validateCity })(Step1) ;      
