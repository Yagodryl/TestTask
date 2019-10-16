import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ItemModal extends Component {

    onClickResp = (e)=>{
      this.props.onClickResp(e)
    }
    render() { 

        return ( 
            <div>
            {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
            <Modal isOpen={this.props.isOpen}  className={this.props.className}>
              <ModalHeader >{this.props.title}</ModalHeader>
              <ModalBody>
               {this.props.content}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={()=>{this.onClickResp(true)}} >Ok</Button>{' '}
                <Button color="secondary" onClick={()=>{this.onClickResp(false)}}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
         );
    }
}
 
export default ItemModal;