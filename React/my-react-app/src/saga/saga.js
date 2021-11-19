import { put, takeLatest } from 'redux-saga/effects'
import { handleSubmit } from '../Utils/handlers/handleAddPhoto'
import { NotificationManager } from 'react-notifications'
import { handleSubmitLogin, handleSubmitRegister } from '../Utils/handlers/handleAuth'
import { handleSubmitRemoveNoise, handleSubmitRegion } from '../Utils/handlers/handleDrawer'
import { handleSubmit as handleSubmitFind } from '../Utils/handlers/handleFind'
import { handleSubmit as handleSubmitUserUpd } from '../Utils/handlers/handleUser'

// воркер Saga: будет запускаться на действия типа `USER_FETCH_REQUESTED`
function* sagaGenerator(process, prefix, action) {
   try {
      yield process(action.payload)
      .then(
         () => {NotificationManager.success('Success','',2000);},
         (e) => {NotificationManager.error('Fail: ' + e,'',2000);}
      );
      yield put({type: prefix + "SUCCEEDED"});
   } catch (e) {
      yield NotificationManager.error('Fail: ' + e,'',2000);
      yield put({type: prefix + "FAILED", message: e.message});
   }
}

function* saga() {
  yield takeLatest("PHOTO_ADD_REQUESTED", sagaGenerator.bind(null, handleSubmit, "PHOTO_ADD_"));
  yield takeLatest("USER_AUTH_REQUESTED", sagaGenerator.bind(null, handleSubmitLogin, "USER_AUTH_"));
  yield takeLatest("USER_REGISTER_REQUESTED", sagaGenerator.bind(null, handleSubmitRegister, "USER_REGISTER_"));
  yield takeLatest("NOISE_REMOVE_REQUESTED", sagaGenerator.bind(null, handleSubmitRemoveNoise, "NOISE_REMOVE_"));
  yield takeLatest("REGION_REQUESTED", sagaGenerator.bind(null, handleSubmitRegion, "REGION_"));
  yield takeLatest("FIND_REQUESTED", sagaGenerator.bind(null, handleSubmitFind, "FIND_"));
  yield takeLatest("USER_UPD_REQUESTED", sagaGenerator.bind(null, handleSubmitUserUpd, "USER_UPD_"));
}
export default saga;