import KeyResultComponent from "../../../src/react/components/KeyResultComponent";
import React from "react";
import {shallow} from 'enzyme';
import 'jest-enzyme'
jest.unmock("../../../src/react/components/KeyResultComponent");

describe('KeyResultComponent', () => {
  const description = "the test passes";
  const kr = shallow(<KeyResultComponent description={description}/>);
  it('displays a description', () => {
    expect(kr.find(".key-result-description-text")).toHaveText(description);
  });
});