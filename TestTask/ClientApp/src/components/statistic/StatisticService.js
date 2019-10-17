import Axios from "axios";
export default class ItemsService {
  static getStatistic(pageNumber) {
    return Axios.get("api/statistic/get/" + pageNumber);
  }
}
