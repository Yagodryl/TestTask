import React, { Component } from 'react';
import {Card, CardBody, FormGroup, Label,
     InputGroup, Input, FormFeedback, Row, Button} from "reactstrap";
class AddItem extends Component {
    state = { 
        productName: "",
        categoryName: "",
        errors: {} 
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
        const { productName,categoryName,errors} = this.state;
        if(productName==="")errors.productName = "Item name can't be empty!"
        if(categoryName==="")errors.categoryName = "Category name can't be empty!"
        
        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            console.log("Ok");
        }else{
            this.setState({errors});
        }
    }
    handleChange = e => {
        this.setStateByErrors(e.target.name, e.target.value);
      };
    render() { 
        const{errors} = this.state;

        return (
          <React.Fragment>
            <Card>
              <CardBody>
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
 
export default AddItem;