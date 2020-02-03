/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, {ReactNode} from 'react';

const keyResultDescriptionLabelStyle = {display:'inline'};
const keyResultDescriptionTextStyle = {display:'inline'};

class KeyResultComponent extends React.Component<{description: string}, {}>  {
  render(): ReactNode {
    return (
        <div className="key-result-description">
          <div className="key-result-description-label" css={keyResultDescriptionLabelStyle}>
            Description:&nbsp;
          </div>
          <div className="key-result-description-text" css={keyResultDescriptionTextStyle}>
            {this.props.description}
          </div>
        </div>
    );
  }
}

export default KeyResultComponent;