// Import Packages
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import CreateTeamForm from './components/CreateTeamForm.js';

// Describe a test case for
// the create team form component
describe('CreateTeamForm', () => {
  // This test will check if the form has the required fields
  it('should have 5 input fields for the team name and member names', function () {
    // Gets the component
    const wrapper = shallow(<CreateTeamForm/>);
    // Find the input fields in the page
    expect(wrapper.find('input')).to.have.length(5);
  });
});
