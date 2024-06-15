import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure , shallow } from 'enzyme';
// COMPONENTS
import {App} from './App';
import { Footer } from './../components/shared/footer/footer';
import {Header} from './../components/shared/header/header';

configure({adapter : new Adapter()});

describe('<App/>' , () => {

    it('Should have one footer tag' , () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find(Footer)).toHaveLength(1);
    })

    it('Should have one header tag' , () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find(Header)).toHaveLength(1);
    })

})













