// Import Packages
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import CreateTournamentForm from './components/CreateTournamentForm.js';

// Describe a test case for
// the create tournament form component
describe('CreateTournamentForm', () => {
  // This test will check if the form has the required fields
  it('should have 2 input fields for the tournament name and game', function () {
    // Gets the component
    const wrapper = shallow(<CreateTournamentForm/>);
    // Find the input fields in the page
    expect(wrapper.find('input')).to.have.length(2);
  });
});
