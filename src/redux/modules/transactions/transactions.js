import { from } from 'seamless-immutable';
import { createReducer, createAsyncAction, createAction } from '../../../utils/actions';

export const FETCH_TRANSACTIONS = 'transactions/transactions/FETCH_TRANSACTIONS';
export const STOP_TRANSACTIONS_POLLING = 'transactions/transactions/STOP_TRANSACTIONS_POLLING';

export const fetchTransactions = createAsyncAction(FETCH_TRANSACTIONS);
export const stopTransactionsPolling = createAction(STOP_TRANSACTIONS_POLLING);

const initialState = from({
  transactions: []
});

export default createReducer({
  [fetchTransactions.SUCCESS]: (state, { payload }) => (
    state.merge({
      transactions: payload
    })
  )
}, initialState);
