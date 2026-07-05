import { useEffect, useCallback, useState, useMemo, useRef } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "@/redux/selectors/authSelectors.js";

import axios from "@/axios";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";

export const AddPost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputFileRef = useRef();

  const isEditing = Boolean(params.id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert("Error during loading a file!");
    }
  };

  const onClickRemoveImage = async () => {
    setImageUrl("");
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const fields = {
        title,
        imageUrl,
        tags: tags.split(" "),
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${params.id}`, fields)
        : await axios.post("/posts", fields);

      const id = isEditing ? params.id : data._id;

      navigate(`/posts/${id}`);
    } catch (err) {
      console.warn(err);
      alert("Error during creating an article!");
    }
  };

  useEffect(() => {
    if (params.id) {
      axios
        .get(`/posts/${params.id}`)
        .then(({ data }) => {
          setText(data.text);
          setTitle(data.title);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(" "));
        })
        .catch((err) => {
          console.warn(err);
          alert("Error during getting an article!");
        });
    }
  }, [params.id]);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: "add-post-editor",
      },
    }),
    [],
  );

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
      console.log("Navigate resended on main page");
    }
  }, [isAuth, navigate]);

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Load preview
      </Button>
      <input
        type="file"
        onChange={handleChangeFile}
        hidden
        ref={inputFileRef}
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Delete
          </Button>
          <img className={styles.image} src={`${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        value={title}
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="The title of the article..."
        fullWidth
        onChange={(elem) => setTitle(elem.target.value)}
      />
      <TextField
        value={tags}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        fullWidth
        onChange={(elem) => setTags(elem.target.value)}
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
          {isEditing ? `Save` : `Publish`}
        </Button>
        <Link to="/">
          <Button size="large">Cancel</Button>
        </Link>
      </div>
    </Paper>
  );
};
