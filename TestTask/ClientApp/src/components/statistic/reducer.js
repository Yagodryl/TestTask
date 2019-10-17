import update from "../../helpers/update";
import StatisticService from "./StatisticService";

export const GET_STATISTIC_STARTED = "statistic/GET_STATISTICS_STARTED";
export const GET_STATISTIC_SUCCESS = "statistic/GET_STATISTICS_SUCCESS";
export const GET_STATISTIC_FAILED = "statistic/GET_STATISTICS_FAILED";

const initialState = {
  statisticList: {
    data: {},
    error: {},
    loading: false,
    failed: false,
    success: false
  }
};

export const statisticReducer = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case GET_STATISTIC_STARTED: {
      newState = update.set(state, "statisticList.loading", true);
      newState = update.set(newState, "statisticList.failed", false);
      newState = update.set(newState, "statisticList.success", false);
      newState = update.set(newState, "statisticList.error", {});

      break;
    }
    case GET_STATISTIC_SUCCESS: {
      newState = update.set(state, "statisticList.loading", false);
      newState = update.set(newState, "statisticList.failed", false);
      newState = update.set(newState, "statisticList.success", true);
      newState = update.set(newState, "statisticList.data", action.payload);
      newState = update.set(newState, "statisticList.error", {});

      break;
    }
    case GET_STATISTIC_FAILED: {
      newState = update.set(state, "statisticList.loading", false);
      newState = update.set(newState, "statisticList.failed", true);
      newState = update.set(newState, "statisticList.success", false);
      newState = update.set(newState, "statisticList.error", action.error);

      break;
    }
    default: {
      return newState;
    }
  }
  return newState;
};

export const getStatistic = page => {
  return dispatch => {
    FetchData(page, dispatch);
  };
};

const FetchData = (page, dispatch) => {
  dispatch(GetStatisticActions.started());
  StatisticService.getStatistic(page)
    .then(response => {
      dispatch(GetStatisticActions.success(response));
    })
    .catch(error => {
      dispatch(GetStatisticActions.failed(error));
    });
};

export const GetStatisticActions = {
  started: () => {
    return {
      type: GET_STATISTIC_STARTED
    };
  },
  success: response => {
    return {
      type: GET_STATISTIC_SUCCESS,
      payload: response.data
    };
  },

  failed: response => {
    return {
      type: GET_STATISTIC_FAILED,
      error: response.data
    };
  }
};
