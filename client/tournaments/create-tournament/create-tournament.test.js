import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import CreateTournamentForm from './components/CreateTournamentForm.js';

describe('CreateTournamentForm', () => {
  it('should have 2 input fields for the tournament name and game', function () {
    const wrapper = shallow(<CreateTournamentForm/>);
    expect(wrapper.find('input')).to.have.length(2);
  });
});
