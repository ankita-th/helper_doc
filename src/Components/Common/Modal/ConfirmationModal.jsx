import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ConfirmationModal({
  openModal,
  closeModal,
  onConfirmClick,
}) {
  const { t } = useTranslation();
  return (
    <Modal
      open={openModal}
      aria-labelledby="delete-notification-modal-title"
      aria-describedby="delete-notification-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Typography
          id="delete-notification-modal-title"
          variant="h6"
          gutterBottom
        >
          {t("confirm_delete_notification")}
        </Typography>
        <Typography id="delete-notification-modal-description" gutterBottom>
          {t("confirm_delete_notification_message")}
        </Typography>
        <Button onClick={onConfirmClick} variant="contained" color="error">
          {t("delete")}
        </Button>
        <Button onClick={closeModal} variant="contained" color="primary">
          {t("cancel")}
        </Button>
      </Box>
    </Modal>
  );
}
