import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import LoginForm from './components/LoginForm.js';

describe('LoginForm', () => {
  it('should have 2 input fields for the username and password', function () {
    const wrapper = shallow(<LoginForm/>);
    expect(wrapper.find('input')).to.have.length(2);
  });
});
