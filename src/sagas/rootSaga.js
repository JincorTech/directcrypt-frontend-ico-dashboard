import { all, fork } from 'redux-saga/effects';
import { formActionSaga } from 'redux-form-saga';

import appSaga from './app/appSaga';

import emailsInputSaga from './common/emailsInputSaga';

import signUpSaga from './auth/signUpSaga';
import signInSaga from './auth/signInSaga';
import restorePasswordSaga from './auth/restorePasswordSaga';

import referralsSaga from './referrals/referralsSaga';

import dashboardSaga from './dashboard/dashboardSaga';

import changePasswordSaga from './account/changePasswordSaga';
import enableTwoFactorAuthSaga from './account/enableTwoFactorAuthSaga';
import disableTwoFactorAuthSaga from './account/disableTwoFactorAuthSaga';

export default function* () {
  yield all([
    fork(formActionSaga),
    fork(appSaga),
    fork(emailsInputSaga),
    fork(signUpSaga),
    fork(signInSaga),
    fork(restorePasswordSaga),
    fork(referralsSaga),
    fork(dashboardSaga),
    fork(changePasswordSaga),
    fork(enableTwoFactorAuthSaga),
    fork(disableTwoFactorAuthSaga)
  ]);
}