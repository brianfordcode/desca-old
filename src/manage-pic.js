
import { getStorage, ref, getDownloadURL, deleteObject, uploadBytes, uploadBytesResumable } from "firebase/storage";
import store from './store/index.js'

const storage = getStorage();

// DOWNLOAD PIC
async function downloadPic(key) {
    const url = await getDownloadURL(ref(storage, key))
    return url
}

// DELETE PIC
function deletePic(key) {
    const pic = ref(storage, key);

    deleteObject(pic).then(() => {
        console.log('deleted successfully')
    }).catch((error) => {
        store.dispatch('openActionModal', {text: 'an error occurred. Please contact support', color: 'red'})
        console.log(error)
    });    
}

function uploadPic(key, image) {
    const storage = getStorage();
    const storageRef = ref(storage, key);
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        store.dispatch('uploadProgress', progress)
    })
    return uploadTask.then((snapshot) => {
      store.dispatch('uploadProgress', "Uploaded!")
    });

}

export { downloadPic, deletePic, uploadPic }