import React, {ChangeEvent, CSSProperties, KeyboardEvent, ReactNode} from "react";

interface TextEditableProps {
  style: CSSProperties;
  className?: string;
  onChange: (value: string) => void;
}
interface TextEditableState {
  text: string;
  editing: boolean;
}

class TextEditable extends React.Component<TextEditableProps, TextEditableState> {
  constructor(props: TextEditableProps) {
    super(props);
    if(this.props.children)
      this.state = {text: this.props.children.toString(), editing: false};
    this.startEdit = this.startEdit.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  startEdit(): void {
    this.setState((state) => Object.assign({}, state, {editing: true}));
  }

  inputHandler(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({editing: true, text: event.target.value})
  }

  handleEnter(event: KeyboardEvent<HTMLInputElement>): void {
    if(event.key === "Enter") {
      this.setState((state) => Object.assign({}, state, {editing: false}));
      this.props.onChange(event.currentTarget.value);
    }
  }

  renderText(): ReactNode {
    if(this.state.editing){
      return (
          <input className='score-value'
                 autoFocus={true}
                 style={{position: 'relative', left:'7px'}}
                 value={this.state.text}
                 onChange={this.inputHandler}
                 onKeyDown={this.handleEnter}
          />
      );
    } else {
      return (
          <div
              onClick={this.startEdit}
              style={{display: 'inline'}}
          >
            &nbsp;{this.state.text}
          </div>
      );
    }
  }

  render(): ReactNode {
    return (
       <div
           style={this.props.style}
           className={this.props.className}
       >
         {this.renderText()}
       </div>
    )
  }
}

export {TextEditable};