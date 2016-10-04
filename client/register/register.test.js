import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import RegisterForm from './components/RegisterForm.js';

describe('RegisterForm', () => {
  it('should have an input for the username and password', function () {
    const wrapper = shallow(<RegisterForm/>);
    expect(wrapper.find('input')).to.have.length(2);
  });
});
