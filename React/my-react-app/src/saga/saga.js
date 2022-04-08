import { put, takeLatest } from 'redux-saga/effects'
import { handleSubmit } from '../Utils/handlers/handleAddPhoto'
import { NotificationManager } from 'react-notifications'
import { handleSubmitLogin, handleSubmitRegister } from '../Utils/handlers/handleAuth'
import { handleSubmit as handleSubmitFind } from '../Utils/handlers/handleFind'
import { handleSubmit as handleSubmitUserUpd } from '../Utils/handlers/handleUser'
import { getRegion, removeRegion, ascii, sharpen, contrast, RGBAtoGray, flipHorizontal, flipVertical, rotate, saltPepperRemoval, saveToPNG, draw } from '../Utils/multiplyFunctions/drawFunctions';
import { addComment } from '../Utils/multiplyFunctions/editPhotoFuntions'


// воркер Saga: будет запускаться на действия типа `USER_FETCH_REQUESTED`
function* sagaGenerator(process, prefix, action) {
   try {
      yield process(action.payload)
      .then(
         (flag) => { if (!flag) NotificationManager.success('Success','',2000);},
         (e) => {NotificationManager.error('Fail: ' + e,'',2000);}
      );
      yield put({type: prefix + "SUCCEEDED"});
   } catch (e) {
      yield NotificationManager.error('Fail: ' + e,'',2000);
      yield put({type: prefix + "FAILED"});
   }
}

function* notify(action) {
   yield NotificationManager.info(action.payload,'',2000);
}

function* saga() {
  yield takeLatest("PHOTO_ADD_REQUESTED", sagaGenerator.bind(null, handleSubmit, "PHOTO_ADD_"));

  yield takeLatest("USER_AUTH_REQUESTED", sagaGenerator.bind(null, handleSubmitLogin, "USER_AUTH_"));
  yield takeLatest("USER_REGISTER_REQUESTED", sagaGenerator.bind(null, handleSubmitRegister, "USER_REGISTER_"));

  yield takeLatest("NOISE_REMOVE_REQUESTED", sagaGenerator.bind(null, saltPepperRemoval, "NOISE_REMOVE_"));
  yield takeLatest("REGION_REQUESTED", sagaGenerator.bind(null, getRegion, "REGION_"));
  yield takeLatest("UNREGION_REQUESTED", sagaGenerator.bind(null, removeRegion, "UNREGION_"));
  yield takeLatest("REFRESH_REQUESTED", sagaGenerator.bind(null, draw, "REFRESH_"));
  yield takeLatest("SAVE_REQUESTED", sagaGenerator.bind(null, saveToPNG, "SAVE_"));
  yield takeLatest("ROTATE_REQUESTED", sagaGenerator.bind(null, rotate, "ROTATE_"));
  yield takeLatest("FLIPX_REQUESTED", sagaGenerator.bind(null, flipHorizontal, "FLIPX_"));
  yield takeLatest("FLIPY_REQUESTED", sagaGenerator.bind(null, flipVertical, "FLIPY_"));
  yield takeLatest("GRAY_REQUESTED", sagaGenerator.bind(null, RGBAtoGray, "GARY_"));
  yield takeLatest("CONTRAST_REQUESTED", sagaGenerator.bind(null, contrast, "CONTRAST_"));
  yield takeLatest("SHARPEN_REQUESTED", sagaGenerator.bind(null, sharpen, "SHARPEN_"));
  yield takeLatest("ASCII_REQUESTED", sagaGenerator.bind(null, ascii, "ASCII_"));

  yield takeLatest("FIND_REQUESTED", sagaGenerator.bind(null, handleSubmitFind, "FIND_"));
  yield takeLatest("USER_UPD_REQUESTED", sagaGenerator.bind(null, handleSubmitUserUpd, "USER_UPD_"));

  yield takeLatest("NOTIFY_REQUESTED", notify);
  yield takeLatest("COMMENT_ADD_REQUESTED", sagaGenerator.bind(null, addComment, "ADD_COMMENT_"))
}
export default saga;