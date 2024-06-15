import React, { Component } from 'react';
import { connect } from "react-redux";


class ButtonElement extends Component {

    componentDidMount = () => {
    }

    navigateTo = (path) => {
        this.props.history.push(path)
    }



    render() {
        if (this.props.localization) {
            return (
                <button onClick={ () => { this.navigateTo('/home') }}>
                   click here
                </button>
            )
        } else return null
        }

    }

    const mapStateToProps = (state) =>  {
        return state
    } 
  

export default connect(mapStateToProps , { })(ButtonElement);;