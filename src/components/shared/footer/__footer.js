import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure , shallow } from 'enzyme';
// COMPONENTS
import { Footer } from './footer';



configure({adapter : new Adapter()});

describe('<Footer/>' , () => {

    it('Should have footer class name' , () => {
        const wrapper = shallow(<Footer/>);
        wrapper.setProps({localization: true})
        expect(wrapper.find('.footer')).toHaveLength(1);
    })
})
