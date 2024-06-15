import React from 'react';
import { connect } from "react-redux";
import { Container  , Row ,Col } from 'react-bootstrap';
import  Video from '../../shared/video/video';
// import { } from './../../services/redux/actions/index';
import './done.scss';
import icSuccess from   './../../../assets/images/ic-success.png';
import appstore  from   './../../../assets/images/ic-appstore.png';
import playstore from   './../../../assets/images/ic-playstore.png';

class DoneStep  extends React.Component {

    render() {
      
            return (
                <React.Fragment>
                    <div className='overlay'>
                        <div className='outer'>
                        <div id="done-popup" className="white-popup mfp-hide">
                            <img className="img-responsive center-block" 
                            src={icSuccess} 
                            alt="success"/>
                            <h1>Everything Is Ready!</h1>
                            <p>Download our app to control your center!</p>
                            <div className="downloadApp">
                            <a href="https://apps.apple.com/us/app/beuti/id1473743885"><img src={appstore}/></a>
                            <a href="https://play.google.com/store/apps/details?id=co.beuti.customer"><img src={playstore}/></a>
                            </div>
                            <p>or</p>
                            <button className="btn field__button btnDefault mb-2 mr-1 ml-1" onClick={() => window.location = "https://admin-panel.beuti.co/login"}>
                                Continue To Web Dashboard</button>
                            <button className="btn field__button btnDefault mb-2 mr-1 ml-1" onClick={() => window.location.reload()}>Close</button>
                            {/* <Video 
                                video="https://www.youtube.com/embed/MPOc2lNdpso"
                                height="155"
                                width="155"
                            >
                            </Video> */}
                        </div>
                        </div>
                    </div>
                </React.Fragment>
            )
    
    }
}

  const mapStateToProps = state => {
    return state;
   };
  export default connect(mapStateToProps , {})(DoneStep) ;   