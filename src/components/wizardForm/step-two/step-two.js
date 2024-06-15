import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { selectCenterTypes , editCategoriesList , setServices } from './../../../services/redux/actions/index';
// import  Video from './../components/shared/video/video';
// import { videosSrcs } from "./../constants/constants";

import './step-two.scss';
class Step2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      centerTypesList: this.props.centerTypesList,
      selectedItems: [] ,
      categoriesList: this.props.categoriesList


    }
  }

  componentDidMount = () => {
    // this.props.getCenterTypes()


  }
  //  UPDATE STATE WHEN PROPS CHANGED
  shouldComponentUpdate = (nextProps) => (
     nextProps.language !== this.props.language ||
     nextProps.centerTypes !== this.props.centerTypes ||
     nextProps.categoriesList !== this.props.categoriesList ||
     nextProps.originalCategoriesList !== nextProps.originalCategoriesList || 
     JSON.stringify(nextProps.centerTypesList) !== JSON.stringify(this.props.centerTypesList)

  )

  selectACtion = (id) => {
    let items   = [...this.props.centerTypes];
      if (items.length !== 0) {
        const found = items.some(selectedId => selectedId === id );
          if (found ) {
            this.onDeselected(id);
          } else {
            this.onSelect(id);
          }
      } else {
        this.onSelect(id);
      }
  }


  onSelect = (id) => {
    let items          = [...this.props.centerTypes];
    let centers        = [...this.state.centerTypesList];
    let categoriesList = [this.props.categoriesList];
    items.push(id);
    this.setState({ selectedItems: items }, () => {
      this.props.selectCenterTypes(this.state.selectedItems)
    });

    centers.map( (center , index) => {      
      center.centerTypes.map( ( type , i) => {
        if ( type.id === id ) {
            type['selected'] = true;
            this.setState({ centerTypesList: centers }, () => {
            this.props.selectCenterTypes(this.state.selectedItems)
            return;
         });
        }
      })
    })  
  }
  
  onDeselected = (id) => {
    console.log(id)
    let items   = [...this.props.centerTypes];
    let centers = [...this.state.centerTypesList];
    let    categoriesList  =  [...this.props.categoriesList];
    console.log(categoriesList)
    let newCatList = categoriesList.filter((item) => item.centerTypeID !== id);
    this.props.setServices(newCatList)
    const index = items.indexOf(id);
    items.splice(index, 1);
    this.setState({ selectedItems: items }, () => {
      this.props.selectCenterTypes(this.state.selectedItems)
    });

    centers.map( (center , index) => {      
      center.centerTypes.map( ( type , i) => {
        if (type.id === id ) {
          type['selected'] = false;
          this.setState({ 
            centerTypesList: centers , 
            selectedItems: items
          }, () => {
          this.props.selectCenterTypes(this.state.selectedItems);
          return;
        });
        }
      })
    })

  }

  centerTypeList = () => {
    const { centerTypesList } = this.state;
    if (centerTypesList.length) {
      return centerTypesList.filter(center => center.centerTypes.length > 0).map((center, index) =>  (
          <Col xs={12}
            className='mb-5' 
            key={index}
          >
              <div className="center-title  ar-font"
              >
                {center.name}
              </div>
              <Row>
              {
                center.centerTypes.map((centertype, index) => {
                  return (
                    <Col xs={'auto'} className="mb-2">
                    <div className="checkbox"  key={index}>
                      <label className="checkbox-wrapper">
                        <input type="checkbox" className="checkbox-input" />
                        <span className="checkbox-tile" onClick={ () => {
                      this.selectACtion(centertype.id ) 
                      } }>
                        
                          <span className="checkbox-label"> {centertype.name}</span>
                        </span>
                      </label>
                  </div>
                  </Col>

                )
                })
              }
            
            </Row>
          </Col>
        )
      )
    } else return null

  }


  render() {
    const { currentStep, language } = this.props;
    return (
      <React.Fragment>
        <div className="tab-pane mt-5 " id="centerType">
          <div className="box">
            <div className="details centerType">
              <div
                className={
                  (language === 'ar' ? 'reverse' : '')}>
                  {this.centerTypeList()}
              </div>
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
export default connect(mapStateToProps, { selectCenterTypes , editCategoriesList , setServices})(Step2); 
