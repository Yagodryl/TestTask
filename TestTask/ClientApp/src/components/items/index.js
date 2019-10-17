import React, { Component } from "react";
import { connect } from "react-redux";
import ItemsTable from "./ItemsTable";
import AddItem from "./AddItem";
import ItemPagination from "../ItemPagination";
import * as ItemsActions from "./reducer";
import get from "lodash.get";
class ItemsPage extends Component {
  state = {
    products: [],
    currentPage: 1,
    countOfPages: 0
  };
  componentDidMount() {
    this.props.getItems(1);
  }
  static getDerivedStateFromProps(props, state) {
    return {
      products: props.data.products,
      loading: props.IsLoading,
      currentPage: props.data.currentPage,
      countOfPages: props.data.countOfPages
    };
  }
  onClickPage = pageNumber => {
    this.props.getItems(pageNumber);
  };
  deleteItem = itemId => {
    const { currentPage } = this.state;
    this.props.deleteItem(itemId, currentPage);
  };

  render() {
    const { countOfPages, currentPage, products, loading } = this.state;
    return loading ? (
      <div>Loading</div>
    ) : (
      <div>
        <h1 style={{ textAlign: "center" }}>Items</h1>
        <AddItem currentPage={currentPage}></AddItem>
        {!Object.keys(this.props.data).length ? (
          "Loading"
        ) : (
          <ItemsTable deleteItem={this.deleteItem} currentPage={currentPage} products={products} />
        )}
        <div className="d-flex justify-content-center">
          <ItemPagination callBackParams={this.onClickPage} currentPage={currentPage} countOfPages={countOfPages}></ItemPagination>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: get(state, "items.listItems.data"),
    isLoading: get(state, "items.listItems.loading"),
    isFailed: get(state, "items.listItems.failed"),
    error: get(state, "items.listItems.error"),
    deleteFailed: get(state, "items.deleteItem.failed"),
    deleteError: get(state, "items.deleteItem.error")
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getItems: page => {
      dispatch(ItemsActions.getItems(page));
    },
    deleteItem: (itemId, page) => {
      dispatch(ItemsActions.deleteItem(itemId, page));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsPage);
