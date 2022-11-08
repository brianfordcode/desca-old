
import { getStorage, ref, getDownloadURL, deleteObject } from "firebase/storage";

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

export { downloadPic, deletePic }