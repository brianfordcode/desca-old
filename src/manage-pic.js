
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

    // console.log(pic)

    // Delete the file
    deleteObject(pic).then(() => {
        console.log('File deleted successfully')
    }).catch((error) => {
        console.log('Uh-oh, an error occurred!')
        console.log(error)
    });    
}

function uploadPic(key, image) {

    const storage = getStorage();
    
    console.log(key)
    
    const storageRef = ref(storage, key);

    const metadata = {
        contentType: 'image/jpeg',
      };

    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on('state_changed', 
  (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        store.dispatch('uploadProgress', progress)
    })

    // 'image' comes from the Blob or File API
    return uploadTask.then((snapshot) => {
      console.log('Uploaded your setup!');
    });

}

export { downloadPic, deletePic, uploadPic }