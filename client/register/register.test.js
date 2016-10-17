// Import Packages
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import RegisterForm from './components/RegisterForm.js';

// Describe a test case for
// the register form component
describe('RegisterForm', () => {
  // This test will check if the form has the required fields
  it('should have 2 input fields for the username and password', function () {
    // Gets the component
    const wrapper = shallow(<RegisterForm/>);
    // Find the input fields in the page
    expect(wrapper.find('input')).to.have.length(2);
  });
});
