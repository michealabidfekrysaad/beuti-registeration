import React from 'react';
import Select from 'react-select';
import { connect } from "react-redux";
 

const optionsd = [
    { value: 'chocolate', label: 'Chocolate' , test:'d'},
    { value: 'strawberry', label: 'Strawberry', test:'d' },
    { value: 'vanilla', label: 'Vanilla' , test:'d'},
  ];
class SelectEmployeesList extends React.Component {
    state = {
      selectedOption: null,
      options: this.props.employeesList,
      parentIndex: this.props.parentIndex ,
      childIndex: this.props.childIndex
    };


    componentDidMount = () => {
        const { language } = this.props;
        let options = [...this.state.options]
        options.map( (emp , index) => {
            language === 'ar' ? emp['label'] = emp.arabicName : emp['label'] = emp.englishName;
            emp['value'] = emp.id
        })
        this.setState({
            options
        } , () => {
            console.log(this.state.options)
        })
    }

    handleChange = selectedOption => {
      this.setState({ selectedOption });
    };
    
    render() {
      const { selectedOption  , options} = this.state;
      return (
        <Select
          isMulti={true}
          isSearchable={true}
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          placeholder=''
          className='custome-input'
        />
      );
    }
  }

  const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps, {  })(SelectEmployeesList); 