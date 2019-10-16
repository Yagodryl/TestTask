import React, { Component } from "react";
import StatisticTable from "./StatisticTable";
import Axios from "axios";
import ItemPagination from "../ItemPagination";
class Statistic extends Component {
  state = {
    statisticData: {}
  };
  getData = pageNumber => {
    Axios.get("api/statistic/get/" + pageNumber)
      .then(response => {
          console.log("response.data",response.data)
        this.setState({ statisticData: response.data });
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
  render() {
    const { countOfPages, currentPage, statisticItems } = this.state.statisticData;
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Statistic</h1>

        {!Object.keys(this.state.statisticData).length ? "Loading" : <StatisticTable statisticItems={statisticItems}></StatisticTable>}
        <div className="d-flex justify-content-center">
          <ItemPagination callBackParams={this.onClickPage} currentPage={currentPage} countOfPages={countOfPages}></ItemPagination>
        </div>
      </div>
    );
  }
}

export default Statistic;
