import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import ItemModal from "../ItemModal";
import EditModal from "./EditModal"; 
let dataForEdit= null;
class ItemsTable extends Component {
  state={
    modalOpen: false,
    deleteItemId: 0,
    editData: {},
    editModalOpen: false
  }

  deleteOnClick=(e)=>{
    if(e){
    this.props.deleteItem(this.state.deleteItemId);
    }
    this.closeModal();
  }
  closeModal =()=>{
    this.setState({modalOpen: false,editModalOpen: false })
  }
  editOnClick = (e)=>{
    this.setState({editData: e.item})
    this.openEditModal();
  }
  openEditModal=()=>{
    this.setState({editModalOpen: true});
  }
  
  render() {
    //console.log("editOnClick", this.state.editData)
    const { products } = this.props;
    const { editData } = this.state;
    const tableBodyItems = products.map(item => {
      return (
        <tr key={item.productID}>
          <td>{item.productName}</td>
          <td>{item.categoryName}</td>
          <td>
            <Button color="info" className="mr-2" onClick={()=>this.editOnClick({item})}>
              Edit
            </Button>
            <Button color="danger" onClick={()=>this.setState({deleteItemId: item.productID, modalOpen: true})}>Del</Button>
          </td>
        </tr>
      );
    });

    return (
      <React.Fragment>
      <Table striped>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Type</th>
          </tr>
        </thead>
        <tbody>{tableBodyItems}</tbody>
        
      </Table>
        <ItemModal content="Do you wont delete this item?" title="Dleting" isOpen={this.state.modalOpen} onClickResp={this.deleteOnClick} ></ItemModal>
        {/* <EditModal isOpen={this.state.editModalOpen} data={editData} onClickResp={ this.closeModal}></EditModal> */}
      </React.Fragment>
    );
  }
}

export default ItemsTable;
