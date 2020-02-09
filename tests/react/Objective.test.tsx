import React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import {ObjectiveComponent} from "../../src/react/Objective";
import 'jest-enzyme'
import {KeyResult} from  '../../src/react/KeyResult'

describe('Objective', () => {
  const krIds = [0, 1];
  describe('ShallowComponent', () => {
    let component: ShallowWrapper;
    const componentDescription = 'this is an example objective';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    });
    it('should hide `KeyResult`s based on a prop', () => {
      const component = shallow(<ObjectiveComponent description={componentDescription} krIds={krIds} hideKRs={true} />);
      expect(component.find(KeyResult)).toHaveLength(0);
    });
    describe('toggle visibility', () => {
      describe('.hide-keyresult-visibility-toggle', () => {
        let toggle: ShallowWrapper;
        beforeEach(() => {
          toggle = component.find('.hide-key-result-visibility-toggle');
        });
        it('hides key results when clicked', () => {
          expect(component.find(KeyResult)).toHaveLength(2);
          toggle.simulate('click');
          expect(component.find(KeyResult)).toHaveLength(0);
        });
        it('renders visibility icon', () => {
          expect(toggle.text()).toBe('visibility_off');
          expect(toggle.hasClass('material-icons')).toBeTruthy();
        });
      });
      describe('.show-keyresult-visibility-toggle', () => {
        let toggle: ShallowWrapper;
        beforeEach(() => {
          const hideToggle = component.find('.hide-key-result-visibility-toggle');
          hideToggle.simulate('click');
          toggle = component.find('.show-key-result-visibility-toggle');
        });
        it('shows key results when clicked', () => {
          expect(component.find(KeyResult)).toHaveLength(0);
          toggle.simulate('click');
          expect(component.find(KeyResult)).toHaveLength(2);
        });
      });
    });
  });
});