import React, { Component } from "react";
import StatisticTable from "./StatisticTable";
import ItemPagination from "../ItemPagination";
import get from "lodash.get";
import { connect } from "react-redux";
import * as StatisticActions from "./reducer";

class Statistic extends Component {
  state = {
    statisticData: {}
  };
  getData = pageNumber => {
   this.props.getStatistic(pageNumber);
  };
  componentDidMount() {
    this.getData(1);
  }
  onClickPage = pageNumber => {
    this.getData(pageNumber);
  };
  render() {
    const { countOfPages, currentPage, statisticItems } = this.props.data;
    //console.log("this.props.data",this.props.data)
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Statistic</h1>

        {!Object.keys(this.props.data).length ? "Loading" : <StatisticTable statisticItems={statisticItems}></StatisticTable>}
        <div className="d-flex justify-content-center">
          <ItemPagination callBackParams={this.onClickPage} currentPage={currentPage} countOfPages={countOfPages}></ItemPagination>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: get(state, "statistic.statisticList.data"),
    isLoading: get(state, "statistic.statisticList.loading"),
    isFailed: get(state, "statistic.statisticList.failed"),
    
  };
};

const mapDispatchToProps = dispatch => {
  return{
    getStatistic: page=>{
      dispatch(StatisticActions.getStatistic(page))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
