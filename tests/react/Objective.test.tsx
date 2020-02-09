import React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import {ObjectiveComponent} from "../../src/react/Objective";
import 'jest-enzyme'
import {KeyResult} from  '../../src/react/KeyResult'

describe('Objective', () => {
  describe('Component', () => {
    let component: ShallowWrapper;
    const componentDescription = 'this is an example objective';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const krIds = [0, 1];
    beforeEach(() => {
      component = shallow(<ObjectiveComponent description={componentDescription} krIds={krIds}/>);
    });
    it('should render', () => {
        expect(component).toExist();
    });
    it('should have a description class with text', () => {
      expect(component.find('.description')).toHaveText(componentDescription);
    });
    it('should render a list of `KeyResult`s', () => {
      const krComponents: ShallowWrapper<{id: number}> = component.find(KeyResult);
      expect(krComponents).toHaveLength(2);
      expect(krComponents.at(0).prop('id')).toBe(0);
      expect(krComponents.at(1).prop('id')).toBe(1);
    })
  });
});