
import { getStorage, ref, getDownloadURL } from "firebase/storage";

async function downloadPic(key) {

    const storage = getStorage();
    
    const url = await getDownloadURL(ref(storage, key))
    console.log('Got URL to use!', url)
    return url
}

export {downloadPic}