import React, { Component } from "react";
import Axios from "axios";
import ItemsTable from "./ItemsTable";
import AddItem from "./AddItem";
import ItemPagination from "../ItemPagination"


class ItemsPage extends Component {
  state = {
    itemsData: {}
  };
  componentDidMount() {
      const {page} = this.props.match.params;
    Axios.get("api/item/products/"+page).then(response => {
      this.setState({ itemsData: response.data });
    });
  }
  
  render() {
      const { countOfPages, currentPage, products } = this.state.itemsData;
      //console.log(countOfPages);
      console.log("products", this.state.itemsData.products);

    return (
      <div>
          <h1 style={{textAlign: "center"}}>Items</h1>
            <AddItem></AddItem>
           {!Object.keys(this.state.itemsData).length ? (
            "Loading"
          ) : (
            <ItemsTable products={products}></ItemsTable>
          )}   
          <div className="d-flex justify-content-center">
          <ItemPagination pageLink="items/" currentPage={currentPage} countOfPages={countOfPages}></ItemPagination>
          </div>
        
  
      </div>
    );
  }
}

export default ItemsPage;
