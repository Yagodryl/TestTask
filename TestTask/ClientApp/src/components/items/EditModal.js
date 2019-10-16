import React, { Component } from "react";
import { Label, Button, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, FormFeedback, Input } from "reactstrap";
import Axios from 'axios';
class EditModal extends Component {
  state = {
    productName: "",
    categoryName: "",
    errors: {}
  };
  componentWillReceiveProps() {
    this.setState({
     
      productName: this.props.data.productName,
      categoryName: this.props.data.categoryName,
    
    });
    console.log("this.props.data",this.props.data)
  }
  setStateByErrors = (name, value) => {
    if (!!this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState({
        [name]: value,
        errors
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  };
  onSubmitForm = e => {
    e.preventDefault();
    const { productName, categoryName, errors } = this.state;
    if (productName === "") errors.productName = "Item name can't be empty!";
    if (categoryName === "") errors.categoryName = "Category name can't be empty!";
    let productID = this.props.data.productID;
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
       
      Axios.put("api/item/product/edit", { productName, categoryName,productID }).then(() => {
        this.setState({ productName: "", categoryName: "", isOpen: false });
      });
      
    } else {
      this.setState({ errors });
    }
    this.props.onClickResp()
  };
  handleChange = e => {
    this.setStateByErrors(e.target.name, e.target.value);
  };
  render() {
    console.log("SateInModal:", this.state);
    const { errors } = this.state;
    return (
      <Modal isOpen={this.props.isOpen} className={this.props.className}>
        <ModalHeader>{this.props.title}</ModalHeader>
        <form autoComplete="off" onSubmit={this.onSubmitForm}>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="productName">Item name</Label>
              <Input
                type="text"
                invalid={!!errors.productName}
                id="productName"
                name="productName"
                placeholder="Item name"
                onChange={this.handleChange}
                value={this.state.productName}
              />
              <FormFeedback valid={!errors.productName}>{errors.productName}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="categoryName">Type name</Label>

              <Input
                type="text"
                invalid={!!errors.categoryName}
                id="categoryName"
                name="categoryName"
                placeholder="Item type"
                onChange={this.handleChange}
                value={this.state.categoryName}
              />
              <FormFeedback valid={!errors.categoryName}>{errors.categoryName}</FormFeedback>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Edit
            </Button>{" "}
            <Button
              color="secondary"
              onClick={e => {
                e.preventDefault(), this.props.onClickResp();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export default EditModal;
