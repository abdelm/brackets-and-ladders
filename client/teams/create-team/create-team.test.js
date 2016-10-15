import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import CreateTeamForm from './components/CreateTeamForm.js';

describe('CreateTeamForm', () => {
  it('should have 5 input fields for the team name and member names', function () {
    const wrapper = shallow(<CreateTeamForm/>);
    expect(wrapper.find('input')).to.have.length(5);
  });
});
