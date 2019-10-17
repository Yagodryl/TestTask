import update from "../../helpers/update";
import ItemsService from "./ItemsService";

export const GET_ITEMS_STARTED = "items/GET_ITEMS_STARTED";
export const GET_ITEMS_SUCCESS = "items/GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "items/GET_ITEMS_FAILED";

export const DLETE_ITEM_STARTED = "items/DLETE_ITEM_STARTED";
export const DLETE_ITEM_SUCCESS = "items/DLETE_ITEM_SUCCESS";
export const DLETE_ITEM_FAILED = "items/DLETE_ITEM_FAILED";

export const ADD_ITEM_STARTED = "items/ADD_ITEM_STARTED";
export const ADD_ITEM_SUCCESS = "items/ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILED = "items/ADD_ITEM_FAILED";

export const EDIT_ITEM_STARTED = "items/EDIT_ITEM_STARTED";
export const EDIT_ITEM_SUCCESS = "items/EDIT_ITEM_SUCCESS";
export const EDIT_ITEM_FAILED = "items/EDIT_ITEM_FAILED";

const initialState = {
  listItems: {
    data: {},
    error: {},
    loading: false,
    failed: false,
    success: false
  },
  deleteItem: {
    error: {},
    loading: false,
    failed: false,
    success: false
  },
  addItem: {
    error: {},
    loading: false,
    failed: false,
    success: false
  },
  editItem: {
    error: {},
    loading: false,
    failed: false,
    success: false
  }
};

export const itemsReducer = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case GET_ITEMS_STARTED: {
      newState = update.set(state, "listItems.loading", true);
      newState = update.set(newState, "listItems.failed", false);
      newState = update.set(newState, "listItems.success", false);
      newState = update.set(newState, "listItems.error", {});

      break;
    }
    case GET_ITEMS_SUCCESS: {
      newState = update.set(state, "listItems.loading", false);
      newState = update.set(newState, "listItems.failed", false);
      newState = update.set(newState, "listItems.success", true);
      newState = update.set(newState, "listItems.data", action.payload);
      newState = update.set(newState, "listItems.error", {});

      break;
    }
    case GET_ITEMS_FAILED: {
      newState = update.set(state, "listItems.loading", false);
      newState = update.set(newState, "listItems.failed", true);
      newState = update.set(newState, "listItems.success", false);
      newState = update.set(newState, "listItems.error", action.error);

      break;
    }
    case DLETE_ITEM_STARTED: {
      newState = update.set(state, "deleteItem.loading", true);
      newState = update.set(newState, "deleteItem.failed", false);
      newState = update.set(newState, "deleteItem.success", false);
      newState = update.set(newState, "deleteItem.error", {});

      break;
    }
    case DLETE_ITEM_SUCCESS: {
      newState = update.set(state, "deleteItem.loading", false);
      newState = update.set(newState, "deleteItem.failed", false);
      newState = update.set(newState, "deleteItem.success", true);
      newState = update.set(newState, "deleteItem.error", {});

      break;
    }
    case DLETE_ITEM_FAILED: {
      newState = update.set(state, "deleteItem.loading", false);
      newState = update.set(newState, "deleteItem.failed", true);
      newState = update.set(newState, "deleteItem.success", false);
      newState = update.set(newState, "deleteItem.error", action.error);

      break;
    }
    case ADD_ITEM_STARTED: {
      newState = update.set(state, "addItem.loading", true);
      newState = update.set(newState, "addItem.failed", false);
      newState = update.set(newState, "addItem.success", false);
      newState = update.set(newState, "addItem.error", {});

      break;
    }
    case ADD_ITEM_SUCCESS: {
      newState = update.set(state, "addItem.loading", false);
      newState = update.set(newState, "addItem.failed", false);
      newState = update.set(newState, "addItem.success", true);
      newState = update.set(newState, "addItem.error", {});

      break;
    }
    case ADD_ITEM_FAILED: {
      newState = update.set(state, "addItem.loading", false);
      newState = update.set(newState, "addItem.failed", true);
      newState = update.set(newState, "addItem.success", false);
      newState = update.set(newState, "addItem.error", action.error);

      break;
    }
    case EDIT_ITEM_STARTED: {
      newState = update.set(state, "editItem.loading", true);
      newState = update.set(newState, "editItem.failed", false);
      newState = update.set(newState, "editItem.success", false);
      newState = update.set(newState, "editItem.error", {});

      break;
    }
    case EDIT_ITEM_SUCCESS: {
      newState = update.set(state, "editItem.loading", false);
      newState = update.set(newState, "editItem.failed", false);
      newState = update.set(newState, "editItem.success", true);
      newState = update.set(newState, "editItem.error", {});

      break;
    }
    case EDIT_ITEM_FAILED: {
      newState = update.set(state, "editItem.loading", false);
      newState = update.set(newState, "editItem.failed", true);
      newState = update.set(newState, "editItem.success", false);
      newState = update.set(newState, "editItem.error", action.error);

      break;
    }

    default: {
      return newState;
    }
  }
  return newState;
};

export const getItems = page => {
  return dispatch => {
    FetchData(page, dispatch);
  };
};

export const deleteItem = (itemId, page) => {
  return dispatch => {
    dispatch(DeleteItemActions.started());
    ItemsService.deleteItem(itemId)
      .then(() => {
        dispatch(DeleteItemActions.success());
        FetchData(page, dispatch);
      })
      .catch(error => {
        dispatch(DeleteItemActions.failed(error));
      });
  };
};

export const addItem = (model, page) => {
  return dispatch => {
    dispatch(AddItemActions.started());
    ItemsService.addItem(model)
      .then(response => {
        dispatch(AddItemActions.success(response));
        FetchData(page, dispatch);
      })
      .catch(error => {
        dispatch(AddItemActions.failed(error));
      });
  };
};

export const editItem = (model, page) => {
  return dispatch => {
    dispatch(EditItemActions.started());
    ItemsService.editItem(model)
      .then(response => {
        dispatch(EditItemActions.success(response));
        FetchData(page, dispatch);
      })
      .catch(error => {
        dispatch(EditItemActions.failed(error));
      });
  };
};

//method for geting data for items
const FetchData = (page, dispatch) => {
  dispatch(GetItemsActions.started());
  ItemsService.getItems(page)
    .then(response => {
      dispatch(GetItemsActions.success(response));
    })
    .catch(error => {
      dispatch(GetItemsActions.failed(error));
    });
};

export const GetItemsActions = {
  started: () => {
    return {
      type: GET_ITEMS_STARTED
    };
  },
  success: response => {
    return {
      type: GET_ITEMS_SUCCESS,
      payload: response.data
    };
  },

  failed: response => {
    return {
      type: GET_ITEMS_FAILED,
      error: response.data
    };
  }
};

export const DeleteItemActions = {
  started: () => {
    return {
      type: DLETE_ITEM_STARTED
    };
  },
  success: () => {
    return {
      type: DLETE_ITEM_SUCCESS
    };
  },

  failed: response => {
    return {
      type: DLETE_ITEM_FAILED,
      error: response.data
    };
  }
};

export const AddItemActions = {
  started: () => {
    return {
      type: ADD_ITEM_STARTED
    };
  },
  success: response => {
    return {
      type: ADD_ITEM_SUCCESS,
      payload: response.data
    };
  },

  failed: response => {
    return {
      type: ADD_ITEM_FAILED,
      error: response.data
    };
  }
};

export const EditItemActions = {
  started: () => {
    return {
      type: EDIT_ITEM_STARTED
    };
  },
  success: response => {
    return {
      type: EDIT_ITEM_SUCCESS,
      payload: response.data
    };
  },

  failed: response => {
    return {
      type: EDIT_ITEM_FAILED,
      error: response.data
    };
  }
};
