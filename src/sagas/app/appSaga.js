import { all, takeLatest, call, fork, put, take, race } from 'redux-saga/effects';
import { removeToken, setToken, getToken, isAuth } from '../../utils/auth';
import { get } from '../../utils/fetch';
import delay from '../../utils/sagas';

import {
  login,
  setAuthState,
  LOGIN,
  CHECK_AUTH,
  LOGOUT,
  logout,
  fetchUser,
  startUserPolling,
  STOP_USER_POLLING
} from '../../redux/modules/app/app';

/*
 * Login
 */

function* loginIterator({ payload: token }) {
  yield call(setToken, token);
  yield put(setAuthState({ authorized: true, token }));
}

function* loginSaga() {
  yield takeLatest(
    LOGIN,
    loginIterator
  );
}

/*
 * Check auth
 */

function* checkAuthIterator() {
  const auth = yield call(isAuth);

  if (auth) {
    const token = yield call(getToken);
    yield put(login(token));
  } else {
    yield put(setAuthState({ authorized: false, token: '' }));
  }
}

function* checkAuthSaga() {
  yield takeLatest(
    CHECK_AUTH,
    checkAuthIterator
  );
}

/*
 * Logout
 */

function* logoutIterator() {
  yield call(removeToken);
  yield put(setAuthState({ authorized: false, token: '' }));
}

function* logoutSaga() {
  yield takeLatest(
    LOGOUT,
    logoutIterator
  );
}

/*
 * Fetch user
 */

const apiUserPath = '/user/me';

function* fetchUserIterator() {
  try {
    const data = yield call(get, apiUserPath);
    yield put(fetchUser.success(data));
  } catch (e) {
    yield put(fetchUser.failure(e));

    if (e.statusCode === 401) {
      yield put(logout());
    }
  }
}

function* fetchUserSaga() {
  yield takeLatest(
    fetchUser.REQUEST,
    fetchUserIterator
  );
}

/*
 * Start user polling
 */

function* startUserPollingIterator() {
  while (true) {
    try {
      const data = yield call(get, apiUserPath);
      yield put(startUserPolling.success(data));
      yield call(delay, 20000);
    } catch (e) {
      yield put(startUserPolling.failure(e));
      yield call(delay, 20000);
    }
  }
}

function* startUserPollingSaga() {
  while (true) {
    yield take(startUserPolling.REQUEST);
    yield race([
      call(startUserPollingIterator),
      take(STOP_USER_POLLING)
    ]);
  }
}

/*
 * Export
 */

export default function* () {
  yield all([
    fork(loginSaga),
    fork(checkAuthSaga),
    fork(logoutSaga),
    fork(fetchUserSaga),
    fork(startUserPollingSaga)
  ]);
}
