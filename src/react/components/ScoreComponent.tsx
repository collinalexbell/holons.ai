/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, {ReactNode} from 'react';

const scoreIconDiameter = '10px';


const scoreValueStyle = {
  display: 'inline'
};

class ScoreComponent extends React.Component<{score: number}, {}> {
  isFailing(): boolean {
    return this.props.score < 0.4;
  }
  isMiddling(): boolean {
    return this.props.score < 0.7 && !this.isFailing();
  }
  isPassing(): boolean {
    return !this.isMiddling() && !this.isFailing();
  }
  scoreIconStyle(): DOMStringMap {
    const background = (): string => {
      if (this.isFailing()) return 'red';
      if (this.isMiddling()) return 'yellow';
      if (this.isPassing()) return 'green';
      return '';
    };

    return {
      'border-radius': '50%',
      height: scoreIconDiameter,
      width: scoreIconDiameter,
      background: background(),
      display: 'inline-block',
      'margin-right': '2px'
    };
  };

  scoreEvaluationClass(): string {
    if (this.isFailing()) return 'score-failing' ;
    if (this.isMiddling()) return 'score-middling';
    if (this.isPassing())  return 'score-passing';
    return '';
  }
  render(): ReactNode {
    return (
        <div className={`score-component ${this.scoreEvaluationClass()}`}>
          <div className='score-icon' css={this.scoreIconStyle()} />
          <div className='score-value' css={scoreValueStyle}>{this.props.score}</div>
        </div>
    );
  };
}

export default ScoreComponent;
