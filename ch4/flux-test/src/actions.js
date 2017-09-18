import { appDispatcher } from './appDispatcher';

// Actionを用意
export const ActionType = {
  CHANGE_NAME: 'CHANGE_NAME',
  SUBMIT_NAME: 'SUBMIT_NAME'
};

// Actionを生成 Dispatcherに投げる
export const Actions = {
  changeName: (name) => {
    appDispatcher.dispatch({
      actionType: ActionType.CHANGE_NAME,
      value: name
    })
  },
  submitName: () => {
    appDispatcher.dispatch({
      actionType: ActionType.SUBMIT_NAME
    })
  }
};
