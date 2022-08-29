import { getStorage, ref, uploadBytes } from "firebase/storage";


function uploadPic(file) {

    const storage = getStorage();
    const storageRef = ref(storage, 'main-img');
    
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded your setup!');
    });
    

}

export { uploadPic }