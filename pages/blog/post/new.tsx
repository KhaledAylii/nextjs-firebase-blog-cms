import { useEffect, useState } from "react";
import styles from "../../../styles/Create.module.css";
import postStyles from "../../../styles/Post.module.css";
import { get, getDatabase, ref, remove, set, update } from "firebase/database";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import { uploadImage } from "../../../hooks/uploadImage";
import ReactMarkdown from "react-markdown";
export default function CreatePage({ postId = undefined }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(undefined);
  const [password, setPassword] = useState("");
  const [shouldShowPreview, setShouldShowPreviewr] = useState(false);
  const [shouldHideCover, setShouldHideCover] = useState(false);
  const [shouldRemoveCover, setShouldRemoveCover] = useState(false);
  const router = useRouter();
  const { access_token } = router.query;
  const db = getDatabase();
  const finalId = postId || v4();
  const postRef = ref(db, "posts/" + finalId);
  const handlePostUpload = (coverImageUrl = "") => {
    if (password !== process.env.EDIT_PASSWORD) return;
    const payload =
      coverImageUrl === "" && !shouldRemoveCover
        ? {
            title,
            body,
            shouldHideCover,
          }
        : {
            title,
            body,
            shouldHideCover,
            imageURL: shouldRemoveCover ? "" : coverImageUrl,
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
        router.push("/blog");
      });
    }
  };
  const handleUploadCoverImage = () => {
    console.log("access", access_token);
    return uploadImage(coverImage, access_token)
      .then((data) => {
        return data?.data?.link;
      })
      .catch((err) => {
        console.log(err);
        return undefined;
      });
  };
  const handleCoverImageSelect = (e) => {
    if (e.target.files) {
      const files = e.target.files;
      setCoverImage(files[0]);
    }
  };
  const handleCreate = () => {
    if (password !== process.env.EDIT_PASSWORD) return;
    if (coverImage) {
      handleUploadCoverImage()
        .then((url) => {
          handlePostUpload(url);
        })
        .catch(() => {
          console.log("failed to upload cover image");
        });
    } else {
      handlePostUpload();
    }
  };
  const handleDelete = () => {
    if (password !== process.env.EDIT_PASSWORD) return;
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
        setShouldHideCover(snapshot.val()?.hideCover || false);
      });
    }
  }, [postId]);

  const handleDrop = (files) => {
    const image = files[0];
    console.log("uploading dropped image: ", image);
    uploadImage(image, access_token)
      .then((data) => {
        const url = data?.data?.link;
        console.log("image uploaded at ", url);
        setBody(`${body} ${url ? `![image](${url})` : "imagefailedtoupload"}`);
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
      <a
        href={`https://api.imgur.com/oauth2/authorize?client_id=${
          process.env.IMGUR_CLIENT_ID
        }&response_type=token&state=${postId || "new"}`}
        style={{ textDecoration: "underline" }}
      >
        authenticate with imgur
      </a>
      <div
        onClick={() => {
          router.push("/");
        }}
        style={{ textDecoration: "underline" }}
      >
        home
      </div>
      {postId !== "home" && (
        <div className={styles.inputContainer}>
          <div>
            cover image &nbsp;
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleCoverImageSelect}
            />
          </div>
          <div>
            <input
              type="checkbox"
              onChange={(e) => {
                setShouldRemoveCover(e.target.checked);
              }}
            />
            remove cover?
            <input
              type="checkbox"
              checked={shouldHideCover}
              onChange={(e) => {
                setShouldHideCover(e.target.checked);
              }}
            />
            hide cover?
            <input
              type="checkbox"
              checked={shouldShowPreview}
              onChange={(e) => {
                setShouldShowPreviewr(e.target.checked);
              }}
            />
            preview?
          </div>
        </div>
      )}
      {shouldShowPreview && (
        <div className={postStyles.articleContainer}>
          <h1>{title}</h1>
          <ReactMarkdown className={postStyles.body}>{body}</ReactMarkdown>
        </div>
      )}
      {!shouldShowPreview && (
        <>
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
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
          </div>
        </>
      )}
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
