import { Button } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { imageUploaderStyles } from "./imageUploaderStyles";

const ImageUploader = ({ url, handleImageUpload, isReadOnly }) => {
  const styles = imageUploaderStyles("250");
  const fileInputRef = useRef();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  useEffect(() => {
    setPreview(url);
  }, [url]);

  return (
    <>
      <form>
        {preview ? (
          <img
            src={preview}
            alt='avatar'
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "5%",
              cursor: isReadOnly ? "default" : "pointer",
              objectFit: "cover",
            }}
            onClick={() => {
              if (!isReadOnly) {
                setImage(null);
              }
            }}
          />
        ) : (
          <Button
            variant='contained'
            className={styles.boton}
            onClick={(e) => {
              e.preventDefault();
              fileInputRef.current.click();
            }}
            disabled={isReadOnly}
          >
            Add image
          </Button>
        )}

        <input
          type='file'
          style={{ display: "none" }}
          ref={fileInputRef}
          accept='image/*'
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.type.substr(0, 5) === "image") {
              setImage(file);
              handleImageUpload(file);
            } else {
              setImage(null);
            }
          }}
        />
      </form>
    </>
  );
};

export default ImageUploader;
