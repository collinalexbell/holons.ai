import ScoreComponent from '../../../src/react/components/ScoreComponent';
import React from "react";
import {shallow, ShallowWrapper} from 'enzyme';
import 'jest-enzyme'
jest.unmock("../../../src/react/components/ScoreComponent");

function componentWithValue (val: string): ShallowWrapper<ScoreComponent, Readonly<{}>, React.Component<{}, {}>> {
  return shallow(<ScoreComponent score={parseFloat(val)}/>);
}

describe("ScoreComponent", () => {
  describe(`with a component score value of 0.5`, () => {
    const scoreValue = '0.5';
    const score = componentWithValue(scoreValue);
    it("should have a .score-icon that is a circle, rendered in css", () => {
      const style = score.find(".score-icon").prop('css');
      expect(style).toHaveProperty('border-radius', '50%');
      expect(style).toHaveProperty('height');
      expect(style).toHaveProperty('width');
      expect(style).toHaveProperty('background');
    });

    it ('should have a .score-value that is the value of the score prop', () => {
      const scoreValue = score.find('.score-value').text();
      expect(scoreValue).toBe(scoreValue);
    });

    it('should have .score-value and .score-icon render on the same line and are seperated by some margin', () => {
      const scoreValueStyle = score.find('.score-value').prop('css');
      const scoreIconStyle = score.find('.score-icon').prop('css');

      expect(scoreIconStyle).toHaveProperty('display', 'inline-block');
      expect(scoreValueStyle).toHaveProperty('display', 'inline');
      expect(scoreIconStyle).toHaveProperty('margin-right');
    });
  });

  describe('with default score range', () => {
    describe(`with scoreValue of 0.39`, () => {
      const scoreValue = '0.39';
      const score = componentWithValue(scoreValue);
      it('should have class "score-failing"', () => {
        expect(score).toHaveClassName('score-failing');
      });

      describe(', score-icon', () => {
        it('should have an color of red', () => {
          const scoreIconStyle = score.find('.score-icon').prop('css');
          expect(scoreIconStyle).toHaveProperty('background', 'red')
        });
      });
    });
  })
});
