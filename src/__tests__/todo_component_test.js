import React from 'react';
import { shallow } from 'enzyme';
import {Todo} from '../src/components/Todo';
import sinon from 'sinon';

//Use array destructurig to create mock functions.
let [editTodo, toggleTodo, deleteTodo] = new Array(3).fill(jest.fn());

function shallowSetup() {
  // Sample props to pass to our shallow render
  const props = {
    id: "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8",
    title: "Todo",
    project: "Project",
    done: false,
    url: "https://www.photos.com/a_photo",

  }
  // wrapper instance around rendered output
  const enzymeWrapper = shallow(<Todo {...props} />);

  return {
    props,
    enzymeWrapper
  };
}