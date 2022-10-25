
import { getStorage, ref, getDownloadURL } from "firebase/storage";

async function downloadPic(key) {

    const storage = getStorage();
    
    const url = await getDownloadURL(ref(storage, key))
    return url
}

export { downloadPic }