import React from "react";
import { createPortal } from "react-dom";

// 'modal-root' is a sibling to 'app-root'
const modalRoot = document.getElementById("modal-root");

interface IProps {
  children: React.ReactElement
}
export class Modal extends React.Component<IProps> {
  element: any;
  constructor( props: IProps ) {
    super( props );
    // We create an element div for this modal
    this.element = document.createElement( 'div' );
  }
  // We append the created div to the div#modal
  componentDidMount() {
    modalRoot!.appendChild( this.element );
  }
  /**
   * We remove the created div when this Modal Component is unmounted
   * Used to clean up the memory to avoid memory leak
   */
  componentWillUnmount() {
    modalRoot!.removeChild( this.element );
  }
  render() {
    return createPortal( <div className="modal">{this.props.children}</div>, this.element );
  }
}
