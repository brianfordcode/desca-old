import { getStorage, ref, uploadBytes } from "firebase/storage";


function uploadPic(key, image) {

    const storage = getStorage();
    
    console.log(key)
    
    const storageRef = ref(storage, key);

   
    // 'image' comes from the Blob or File API
    uploadBytes(storageRef, image).then((snapshot) => {
      console.log('Uploaded your setup!');
    });

}

export { uploadPic }