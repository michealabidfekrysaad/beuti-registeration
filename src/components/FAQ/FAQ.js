import React, { Component } from "react";
import { connect } from "react-redux";
import {faq} from './../../constants/faq';

// STYLES
import './faq.scss';
class FAQ extends Component {

  renderFAQ = () => {
    if (this.props.localization) {
      return (
        faq[this.props.language].map( (item , index) => {
          return (
            <div className="form__question"
                 key={index} 
            >
                <h3 className={(this.props.language == 'ar' ? 'form__question__headline-ar' : 'form__question__headline-en')}>
                  {item.question}
                </h3>
                <p className='form__answer'>
                  {item.answer}
                </p>
            </div>
          )
        })
        
      )
    }
  }
    render() {
        if (this.props.localization) {
          return (
            <React.Fragment>
              <div className={"form " + (this.props.language == 'ar' ? 'text-right' : 'text-left')}
                style={{direction: `${this.props.direction}`}}
              >
                <div className="form__title">
                  <h2> {this.props.localization.FAQ[this.props.language]}</h2>
                </div>

                {this.renderFAQ()}
            </div>
            </React.Fragment>
    
          );
        } else return null;
      }
}


const mapStateToProps = state => {
    return state;
  };
  
  export default connect(mapStateToProps,{  })(FAQ);
  