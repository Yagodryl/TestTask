import React, { Component } from "react";
import Axios from "axios";
import ItemsTable from "./ItemsTable";
import AddItem from "./AddItem";
import ItemPagination from "../ItemPagination";

class ItemsPage extends Component {
  state = {
    itemsData: {}
  };
  getData = pageNumber => {
    Axios.get("api/item/products/" + pageNumber)
      .then(response => {
        this.setState({ itemsData: response.data });
      })
      .catch(error => {
        alert(error.response.data);
      });
  };
  componentDidMount() {
    this.getData(1);
  }
  onClickPage = pageNumber => {
    this.getData(pageNumber);
  };
  deleteItem = itemId => {
    const {currentPage} = this.state.itemsData;
  
    Axios.get("api/item/product/delete/" + itemId).then(() => {
      this.getData(currentPage);
      
    });
  };

  render() {
    const { countOfPages, currentPage, products } = this.state.itemsData;
    //console.log(countOfPages);
    console.log("products", this.state.itemsData);

    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Items</h1>
        <AddItem></AddItem>
        {!Object.keys(this.state.itemsData).length ? "Loading" : <ItemsTable deleteItem={this.deleteItem} products={products}></ItemsTable>}
        <div className="d-flex justify-content-center">
          <ItemPagination callBackParams={this.onClickPage} currentPage={currentPage} countOfPages={countOfPages}></ItemPagination>
        </div>
      </div>
    );
  }
}

export default ItemsPage;
