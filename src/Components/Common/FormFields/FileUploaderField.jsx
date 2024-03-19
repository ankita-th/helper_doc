import React from "react";
import DocumnetIcon from "../../../Assets/SVGIcons/DocumentIcon";
import { Controller } from "react-hook-form";
import { Input } from "@mui/material";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function FileUploaderField({
  rules,
  control,
  errors,
  setFile,
  disable = true,
}) {
  const handleUploadedFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };
  return (
    <>
      <>
        <DocumnetIcon />
        <Input disabled={!disable} type="file" onChange={handleUploadedFile} />
      </>
      {errors && <ErrorMessage msg={errors} />}
    </>
  );
}
