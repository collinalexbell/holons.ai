/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, {ReactNode} from 'react';

const scoreIconDiameter = '10px';


const scoreValueStyle = {
  display: 'inline'
};

class ScoreComponent extends React.Component<{score: number}, {}> {
   scoreIconStyle(): DOMStringMap {
     const style = {
       'border-radius': '50%',
       height: scoreIconDiameter,
       width: scoreIconDiameter,
       background: 'green',
       display: 'inline-block',
       'margin-right': '2px'
     };

     if (this.props.score < 0.4) {
        style.background = 'red';
     }

     return style;
  };

  scoreEvaluationClass(): string {
    if(this.props.score < 0.4) {
      return "score-failing" ;
    } else {
      return "" ;
    }
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
