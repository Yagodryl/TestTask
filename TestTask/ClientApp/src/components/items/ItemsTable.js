import React, { Component } from "react";
import { Button, Table } from "reactstrap";
class ItemsTable extends Component {
  render() {
    const { products } = this.props;

    const tableBodyItems = products.map(item => {
      return (
        <tr key={item.productID}>
          <td>{item.productName}</td>
          <td>{item.categoryName}</td>
          <td>
            <Button color="info" className="mr-2">
              Edit
            </Button>
            <Button color="danger">Del</Button>
          </td>
        </tr>
      );
    });

    return (
      <Table striped>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Type</th>
          </tr>
        </thead>
        <tbody>{tableBodyItems}</tbody>
      </Table>
    );
  }
}

export default ItemsTable;
