/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, {ReactNode} from 'react';
import ScoreComponent from "./ScoreComponent";

const keyResultDescriptionTextStyle = {display:'inline'};

class KeyResultComponent extends React.Component<{description: string; score: number}, {}>  {
  render(): ReactNode {
    return (
        <div className="key-result-description">
          <div className="key-result-description-text" css={keyResultDescriptionTextStyle}>
            {this.props.description}
          </div>
          <ScoreComponent score={this.props.score} />
        </div>
    );
  }
}

export default KeyResultComponent;