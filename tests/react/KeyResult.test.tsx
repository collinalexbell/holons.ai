import {KeyResultComponent} from "../../src/react/KeyResult";
import React from "react";
import {shallow} from 'enzyme';
import 'jest-enzyme'
import {Score} from "../../src/react/Score";
jest.unmock("../../src/react/KeyResult");

describe('KeyResult', () => {
  describe('Component', () => {
    const description = "the test passes";
    const kr = shallow(<KeyResultComponent id={0} description={description} score={4}/>);
    it('should display a description', () => {
      expect(kr.find(".key-result-description-text")).toHaveText(description);
    });

    it('should render a score component', () => {
      expect(kr.find(Score)).toExist()
    })
  });
});
