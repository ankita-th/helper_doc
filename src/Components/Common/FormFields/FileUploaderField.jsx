import React from "react";
import DocumnetIcon from "../../../Assets/SVGIcons/DocumnetIcon";
import { Controller } from "react-hook-form";
import { Input } from "@mui/material";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function FileUploaderField({
  name,
  rules,
  control,
  errors,
  setFile,
}) {
  const handleUploadedFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };
  return (
    <>
      <>
        <DocumnetIcon />
        <Input type="file" onChange={handleUploadedFile} />
      </>
      {errors && errors[name] && <ErrorMessage msg={errors[name].message} />}
    </>
  );
}
