import { useEffect, useState } from "react";
import styles from "../../../styles/Create.module.css";
import { get, getDatabase, ref, remove, set, update } from "firebase/database";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "@firebase/storage";
import { config } from "../../../webapp-config";
export default function CreatePage({ postId = undefined }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(undefined);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const finalId = postId || v4();
  let db, postRef;
  try {
    db = getDatabase();
    postRef = ref(db, "posts/" + finalId);
  } catch (err) {
    console.log(err);
  }
  const handlePostUpload = (coverImageUrl = "") => {
    if (password !== config.password) return;
    const payload =
      coverImageUrl === ""
        ? {
            title,
            body,
          }
        : {
            title,
            body,
            imageURL: coverImageUrl,
          };

    if (postId) {
      update(postRef, payload).then(() => {
        if (postId === "home") {
          router.push("/");
        } else {
          router.push("/blog/post/" + finalId);
        }
      });
    } else {
      set(postRef, payload).then(() => {
        router.push("/blog/post/" + finalId);
      });
    }
  };
  const handleUploadCoverImage = () => {
    const newImgRef = storageRef(storage, v4());

    return uploadBytes(newImgRef, coverImage)
      .then((data) => {
        console.log(data);
        return getDownloadURL(newImgRef);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCoverImageSelect = (e) => {
    if (e.target.files) {
      const files = e.target.files;
      setCoverImage(files[0]);
    }
  };
  const handleCreate = () => {
    if (password !== config.password) return;
    if (coverImage) {
      handleUploadCoverImage().then((url) => {
        handlePostUpload(url || "");
      });
    } else {
      handlePostUpload();
    }
  };
  const handleDelete = () => {
    if (password !== config.password) return;
    remove(postRef).then(() => {
      router.push("/blog");
    });
  };
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    if (postId) {
      get(postRef).then((snapshot) => {
        setTitle(snapshot.val()?.title || "");
        setBody(snapshot.val()?.body || "");
      });
    }
  }, [postId]);

  const storage = getStorage();
  const handleDrop = (files) => {
    console.log(files);
    const newImgRef = storageRef(storage, v4());

    uploadBytes(newImgRef, files[0])
      .then((data) => {
        console.log(data);
        getDownloadURL(newImgRef).then((url) => {
          setBody(`${body} <img src=${url} />`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.addEventListener("drop", (e) => {
      e.preventDefault();
    });
  }, []);
  return (
    <div className={styles.container}>
      <div
        onClick={() => {
          router.push("/");
        }}
      >
        home
      </div>
      {postId !== "home" && (
        <div className={styles.inputContainer}>
          cover
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleCoverImageSelect}
          />
        </div>
      )}
      <div className={styles.inputContainer}>
        title
        <input
          className={styles.titleInput}
          defaultValue={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
      </div>
      <div
        className={`${styles.inputContainer} dropZone ${
          isDragOver ? styles.dropZoneHover : ""
        }`}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragOver(true);
        }}
        onMouseOut={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragOver(false);
        }}
        onDropCapture={(e) => {
          e.preventDefault();
          // e.nativeEvent.stopPropagation();
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleDrop(e.dataTransfer.files);
            e.dataTransfer.clearData();
            // this.dragCounter = 0;
          }
        }}
        onDragEndCapture={(e) => {
          e.preventDefault();
        }}
        onDragLeaveCapture={(e) => {
          e.preventDefault();
        }}
        onDragExitCapture={(e) => {
          e.preventDefault();
        }}
        onDragStartCapture={(e) => {
          e.preventDefault();
        }}
        onDragOverCapture={(e) => {
          e.preventDefault();
        }}
      >
        body
        <textarea
          className={styles.bodyInput}
          defaultValue={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
      </div>
      password
      <input
        type="text"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={handleCreate}>
        {postId && postId !== "home" ? "Edit" : "Create"}
      </button>
      {postId && postId !== "home" && (
        <button onClick={handleDelete}>delete</button>
      )}
    </div>
  );
}
