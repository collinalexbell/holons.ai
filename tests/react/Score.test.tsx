import {ScoreComponent} from '../../src/react/Score';
import React from "react";
import {shallow, ShallowWrapper, mount, ReactWrapper} from 'enzyme';
import 'jest-enzyme'
jest.unmock("../../src/react/Score");

function componentWithValue (val: number | string): ShallowWrapper<ScoreComponent, Readonly<{}>, React.Component<{}, {}>> {
  return shallow(<ScoreComponent
      score={parseFloat(val.toString())}
      updateScore={jest.fn()}
  />);
}

describe("ScoreComponent", () => {
  describe(`with a component score value of 0.5`, () => {
    const scoreValue = '0.5';
    const score = componentWithValue(scoreValue);
    it("should have a .score-icon that is a circle, rendered in css", () => {
      const style = score.find(".score-icon").prop('css');
      expect(style).toHaveProperty('borderRadius', '50%');
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
      expect(scoreIconStyle).toHaveProperty('marginRight');
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
    describe('with scoreValue of 0.4-0.69', () => {
      const lowVal = 0.4;
      const highVal = 0.69;
      const low = componentWithValue(lowVal);
      const high = componentWithValue(highVal);

      it('should have class "score-middling' , () => {
        expect(low).toHaveClassName('score-middling');
        expect(high).toHaveClassName('score-middling');
      });

      it('should have the color of yellow', () => {
        const lowIconStyle = low.find('.score-icon').prop('css');
        const highIconStyle = high.find('.score-icon').prop('css');
        expect(lowIconStyle).toHaveProperty('background', 'yellow');
        expect(highIconStyle).toHaveProperty('background', 'yellow');
      });
    });
  });
  describe('when .score-value is clicked', () => {
    let score: ReactWrapper;
    const updateScore = jest.fn();
    beforeEach( () => {
      score =  mount(<ScoreComponent
          score={parseFloat('0.5')}
          updateScore={updateScore}
      />)
    }) ;
    it('renders an input form', () => {
      //at(1) because EmotionJS wraps the element in something with the same class
      const scoreVal = score.find('.score-value').hostNodes();
      scoreVal.simulate('click');
      expect(score.find('input')).toExist()
    });

    it('calls updateScore with new value', () => {
      //at(1) because EmotionJS wraps the element in something with the same class
      const scoreVal = score.find('.score-value').hostNodes();
      scoreVal.simulate('click');
      const input = score.find('input');
      input.simulate('change', {target: {value: '0.6'}});
      input.simulate('keyDown', {key: "Enter"});
      expect(updateScore).toBeCalledWith(0.6);
    });
  });
});
