import { all, call, put, fork, take, race } from 'redux-saga/effects';
import { get } from '../../utils/fetch';
import delay from '../../utils/sagas';

import { fetchTransactions, STOP_TRANSACTIONS_POLLING } from '../../redux/modules/transactions/transactions';

/**
 * Fetch Transactions
 */

function* fetchTransactionsIterator() {
  while (true) {
    try {
      const data = yield call(get, '/dashboard/transactions');
      yield put(fetchTransactions.success(data));
      yield call(delay, 10000);
    } catch (e) {
      yield put(fetchTransactions.failure(e));
      yield call(delay, 10000);
    }
  }
}

function* fetchTransactionsSaga() {
  while (true) {
    yield take(fetchTransactions.REQUEST);
    yield race([
      call(fetchTransactionsIterator),
      take(STOP_TRANSACTIONS_POLLING)
    ]);
  }
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(fetchTransactionsSaga)
  ]);
}
