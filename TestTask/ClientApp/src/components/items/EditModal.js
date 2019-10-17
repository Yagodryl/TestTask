import React, { Component } from "react";
import { Label, Button, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, FormFeedback, Input } from "reactstrap";
import * as EditItemActions from "./reducer";
import get from "lodash.get";
import { connect } from "react-redux";

class EditModal extends Component {
  state = {
    productName: "",
    categoryName: "",
    currentPage: 0,
    errors: {}
  };
  
  componentDidMount = () => {
this.setState({
     
      productName: this.props.data.productName,
      categoryName: this.props.data.categoryName,
     
    });

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
    const {currentPage} = this.props;
    const { productName, categoryName, errors } = this.state;
    if (productName === "") errors.productName = "Item name can't be empty!";
    if (categoryName === "") errors.categoryName = "Category name can't be empty!";
    let productID = this.props.data.productID;
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
       this.props.editItem({ productName, categoryName,productID }, currentPage);
    } else {
      this.setState({ errors });
    }
    this.props.onClickResp()
  };
  handleChange = e => {
    this.setStateByErrors(e.target.name, e.target.value);
  };
  render() {
    console.log("SateInModal:", this.props);
    const { errors } = this.state;
    return (
      <Modal isOpen={true} className={this.props.className}>
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
              onClick={() => {
                 this.props.onClickResp();
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
const mapStateToProps = state => {
  return{
    isLoading: get(state, "items.listItems.loading"),
    isFailed: get(state, "items.listItems.failed"),
    error: get(state, "items.listItems.error"),

  }
}
const mapDispatchToProps = dispatch => {
  return {
    editItem: (model, page) =>{
      dispatch(EditItemActions.editItem(model, page));
    }
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
