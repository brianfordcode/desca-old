
import { getStorage, ref, getDownloadURL, deleteObject, uploadBytes } from "firebase/storage";

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

   
    // 'image' comes from the Blob or File API
    return uploadBytes(storageRef, image).then((snapshot) => {
        console.log(snapshot.metadata);
      console.log('Uploaded your setup!');
    });

}

export { downloadPic, deletePic, uploadPic }