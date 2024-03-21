import React from "react";
import DocumnetIcon from "../../../Assets/SVGIcons/DocumentIcon";
import { Controller } from "react-hook-form";
import { Input } from "@mui/material";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function FileUploaderField({
  name,
  errors,
  setFile,
  disable = false,
}) {
  const handleUploadedFile = (e) => {
    if (!e?.target?.files || e?.target?.files?.length === 0) {
      return;
    }
    const file = e.target.files[0];
    setFile(e.target.name, file);
  };
  return (
    <>
      <>
        <DocumnetIcon />
        <Input
          name={name}
          disabled={disable}
          type="file"
          onChange={handleUploadedFile}
        />
      </>
      {errors && <ErrorMessage msg={errors} />}
    </>
  );
}
