import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { toast } from "react-hot-toast";

const useImageUpload = () => {
  const auth = getAuth();
  const [progressState, setProgressState] = useState();
  const [loading, setLoading] = useState(false);

  const storeImage = async (image, pathName) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      const file = image;
      const fileName = `${auth.currentUser.uid}-${file.name}-${uuidv4()}`;
      const storage = getStorage();
      const storageRef = ref(storage, `BlogsImage/${fileName}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressState(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          setLoading(false);
          toast.error("Unable to upload file");
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              return resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      );
    });
  };
  return { storeImage };
};

export default useImageUpload;
