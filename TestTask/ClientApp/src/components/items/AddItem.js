import React, { Component } from "react";
import { Card, CardBody, FormGroup, Input, FormFeedback, Row, Button } from "reactstrap";
import * as AddItemActions from "./reducer";
import get from "lodash.get";
import { connect } from "react-redux";

class AddItem extends Component {
  state = {
    productName: "",
    categoryName: "",
    errors: {}
  };

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
    const { currentPage } = this.props;
    if (productName === "") errors.productName = "Item name can't be empty!";
    if (categoryName === "") errors.categoryName = "Category name can't be empty!";

    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      this.props.addItem({ productName, categoryName }, currentPage);
      this.setState({ productName: "", categoryName: "" });
      //console.log("currentPage Adddd",currentPage)
    } else {
      this.setState({ errors });
    }
  };

  handleChange = e => {
    this.setStateByErrors(e.target.name, e.target.value);
  };
  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <Card>
          <CardBody style={{ backgroundColor: "lightgrey" }}>
            <form autoComplete="off" onSubmit={this.onSubmitForm}>
              <Row>
                <FormGroup className="col-12 col-md-5">
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

                <FormGroup className="col-12 col-md-5">
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
                <FormGroup className="col-12 col-md-2">
                  <Button color="success">Add</Button>
                </FormGroup>
              </Row>
            </form>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoading: get(state, "items.addItem.loading"),
    isFailed: get(state, "items.addItem.failed"),
    error: get(state, "items.addItem.error")
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addItem: (model, page) => {
      dispatch(AddItemActions.addItem(model, page));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItem);
