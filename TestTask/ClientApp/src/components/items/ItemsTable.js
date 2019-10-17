import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import ItemModal from "../ItemModal";
import EditModal from "./EditModal";

class ItemsTable extends Component {
  state = {
    modalOpen: false,
    deleteItemId: 0,
    editData: 0,
    editModalOpen: false
  };

  deleteOnClick = e => {
    const { currentPage } = this.props;
    if (e) {
      this.props.deleteItem(this.state.deleteItemId, currentPage);
    }
    this.closeEditModal();
  };
  editOnClick = e => {
    this.setState({ editData: e, editModalOpen: true });
  };
  closeEditModal = () => {
    this.setState({ editModalOpen: false, modalOpen: false });
  };

  render() {
    const { products, currentPage } = this.props;
    const { editData, editModalOpen } = this.state;
    const tableBodyItems = products.map((item, index) => {
      return (
        <tr key={item.productID}>
          <td>{item.productName}</td>
          <td>{item.categoryName}</td>
          <td>
            <Button color="info" className="mr-2" onClick={() => this.editOnClick(index)}>
              Edit
            </Button>
            <Button color="danger" onClick={() => this.setState({ deleteItemId: item.productID, modalOpen: true })}>
              Del
            </Button>
          </td>
        </tr>
      );
    });
    //console.log("eeee", products[editData]);
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
        <ItemModal
          content="Do you wont delete this item?"
          title="Dleting"
          isOpen={this.state.modalOpen}
          onClickResp={this.deleteOnClick}
        ></ItemModal>
        {editModalOpen && <EditModal currentPage={currentPage} data={products[editData]} onClickResp={this.closeEditModal}></EditModal>}
      </React.Fragment>
    );
  }
}

export default ItemsTable;
