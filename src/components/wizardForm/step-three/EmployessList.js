import React, { Component } from "react";
import { Container, Row, Col, Table , ButtonToolbar, Tooltip ,Button ,OverlayTrigger } from "react-bootstrap";
import { connect } from "react-redux";
import { setEmployeesList , setAssignedEmployees , setServices } from './../../../services/redux/actions/index';
import './step-three.scss';
import './employeeList.scss';
import alert from "./../../../assets/images/alert.png";

class EmployessList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employeesList: this.props.employeesList,
      employeeTypes: [ {},  {en: 'queue' , ar:'صف /طابور'} , {en: 'appointment' , ar: 'حجز موعد' } ],
      assignedIDs: []
    }
  }


  //  UPDATE STATE WHEN PROPS CHANGED
  shouldComponentUpdate(nextProps) {
    return nextProps.language !== this.props.language ||
           nextProps.employeesList !== this.props.employeesList ||
           nextProps.servicesList  !== this.props.servicesList
  }


  componentDidMount = () => {
    let empsId = new Set();
    let servicesList = [...this.props.servicesList];
    let employeesList = [...this.props.employeesList];
    servicesList.map((serv , i) => {
      if (serv.employees) {
        serv.employees.map(  (empID ,i ) => {
          empsId.add(empID)
        })
      }
    
    })
    this.setState({
      assignedIDs: Array.from(empsId)
    } , () => {
      // this.props.setServices(servicesList);
      employeesList.map((emp, index) => {
        const found = this.state.assignedIDs.some((el , i) => el === emp.id );
        if ( found ) {
          emp.isServiceAssigned = true;
        } else {
          emp.isServiceAssigned = false;
        }
      })
      this.props.setEmployeesList(employeesList);
    })
  }

  testprops = () => {
    console.log(this.props)
  }

  deleteEmployee = (id) => {
    let employeesList = [...this.props.employeesList];
    employeesList.map((emp, index) => {
      if (emp.id === id) {
        employeesList.splice(index, 1);
        this.props.setEmployeesList(employeesList);
      }
    })
  }

  renderEmployessList = () => {
    const { language }      = this.props;
    const { employeeTypes } = this.state;
    if (this.props.employeesList) {
      return this.props.employeesList.map((emp, index, arr) => {

        return (
          <>
            <tr style={{color: 'red', backgroundColor: 'white', textAlign: "center"}}>
              {arr.find(emp => emp.isServiceAssigned) && (emp.isServiceAssigned && <td colSpan="2" style={{textAlign: "center", fontSize: "0.75em"}}>{language === 'ar' ? 'الموظفون الذين تم إضافتهم على خدمات لا يمكن حذفهم' : "Employees assigned on services can't be deleted"}</td>)}
            </tr>
            <tr key={index} dir={`${language === 'ar' ? 'rtl' : 'ltr'}`}>
              <td>
                { language === 'ar'  ? emp.arabicName: emp.englishName }
                </td>
              <td>
                 { employeeTypes[emp.type][language]}
                </td>
               
              <td>
              { !emp.isServiceAssigned  ? 
                  <button
                 
                  className="removeEmployee"
                  onClick={ () => this.deleteEmployee(emp.id)}
                ><span className="icon-delete"></span></button>
              : 
              <ButtonToolbar 
              className={ language=== 'ar' ? ' justify-content-ar ' : ' justify-content-en '}
              >
                {/* Removed tooltip because it didn't show well */}
                <img   className='alt-hover' src={alert} alt="alert" />
            </ButtonToolbar>
  
  
              }
            
  
              
              </td>
            </tr>
          </>
        )
      })
    } else return null

  }


  render() {
    if (this.props.currentStep !== 3) {
      return null
    }
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col sm={12}>
              <div>
                <div className="employeesTable">
                
                  <Table responsive>
                    <tbody>
                      {/* <button 
                      onClick={ () => { this.testprops()}}
                      >test</button> */}
                      {this.renderEmployessList()}
                      
                    </tbody>
                  </Table>

                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}



const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, { setEmployeesList , setServices , setAssignedEmployees})(EmployessList); 