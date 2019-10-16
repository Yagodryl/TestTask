import React, { Component } from 'react';
import {Table} from "reactstrap";

class StatisticTable extends Component {
    state = {  }
    render() { 
    const {statisticItems} = this.props;

    const tableBodyItems = statisticItems.map(item => {
        return (
          <tr key={item.categoryID}>
            <td>{item.categoryName}</td>
            <td>{item.count}</td>
          </tr>
        );
      });
        return ( <Table striped>
            <thead>
              <tr>
                <th>Item Type</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>{tableBodyItems}</tbody>
          </Table> );
    }
}
 
export default StatisticTable;