import Axios from "axios";
export default class ItemsService {
  static getItems(pageNumber) {
    return Axios.get("api/item/products/" + pageNumber);
  }
  static deleteItem(itemId) {
    return Axios.delete("api/item/product/delete/" + itemId);
  }
  static addItem(item) {
    return Axios.post("api/item/product/Add", item);
  }
  static editItem(item) {
    return Axios.put("api/item/product/edit", item);
  }
}
