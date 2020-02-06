import KeyResultComponent from "../../../src/react/components/KeyResultComponent";
import React from "react";
import {shallow} from 'enzyme';
import 'jest-enzyme'
import ScoreComponent from "../../../src/react/components/ScoreComponent";
jest.unmock("../../../src/react/components/KeyResultComponent");

describe('KeyResultComponent', () => {
  const description = "the test passes";
  const kr = shallow(<KeyResultComponent description={description} score={4}/>);
  it('should display a description', () => {
    expect(kr.find(".key-result-description-text")).toHaveText(description);
  });

  it('should render a score component', () => {
    expect(kr.find(ScoreComponent)).toExist()
  })
});