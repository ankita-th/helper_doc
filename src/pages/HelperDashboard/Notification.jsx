import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Grid , Modal, Button, Pagination,} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getAllNotificationsList,
  removeNotification,
} from "../../Services/ProfileServices/NotificationService";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import { toastMessage } from "../../Utils/toastMessages";
import { successType } from "../../Constant/Constant";
import HelperDashboardSubHeader from "../../Components/Common/Headers/HelperDashboardSubHeader";
import "react-responsive-pagination/themes/classic.css";
import NoDataFound from "../../Components/Common/NoDataFound";
import { calculateTimeAgo }  from '../../Utils/timeAgo'

// const notifications = [
//   {
//     id: 1,
//     title: "New Message",
//     message:
//       "The responsibilities and duties section is the most important part of the job description. Here you should outline the functions this position will perform on a regular basis, how the job functions within the organization and the title of the manager the person will report to",
//     time: "12:30 PM",
//   },
//   {
//     id: 2,
//     title: "Reminder",
//     message:
//       "Don't forget your appointment tomorrow, how the job functions within the organization and the title of the manager the person will report to",
//     time: "Yesterday",
//   },
//   {
//     id: 3,
//     title: "Friend Request",
//     message:
//       "You have a new friend request.The responsibilities and duties section is the most important part of the job description. Here you should outline the functions this position will perform on a regular basis, how the job functions within the organization and the title of the manager the person will report to",
//     time: "2 days ago",
//   },
// ];

const Notifications = () => {
  const { pathname } = useLocation();
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId");
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [totalPage, setTotalPage] = useState(10);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [notificationIdToDelete, setNotificationIdToDelete] = useState(null);

  const [loader, setLoader] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    getAllNotifications(userId);
  }, []);

  const handleRemoveNotification = (id) => {
    setLoader(true);
    removeNotification(userId, id).then((res) => {
      setLoader(false);
      toastMessage(t("notification_deleted_success"), successType);
      getAllNotifications(userId);
    });
  };

  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };

  function getAllNotifications(userId){
    debugger
    const param = `?page=${Number(currentPage.page)}&limit=${Number(10)}`;
    getAllNotificationsList(userId,param)
      .then((res) => {
        debugger;
        setLoader(false);
        const responseData = res.data.notifications;
        setNotifications(responseData);
        setTotalPage(res.data.totalPages);
      })
      .catch((error) => {
        setLoader(false);
      });
  }

  const openDeleteModal = (id) => {
    setDeleteModalOpen(true);
    setNotificationIdToDelete(id);
  };

  const handleConfirmDelete = () => {
    handleRemoveNotification(notificationIdToDelete);
    setDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };


  return (
    <>
      {loader && <PageLoader />}

      <Box maxWidth="xl" sx={{ padding: "20px" }}>
        <HelperDashboardSubHeader
          title={t("all_Notification")}
          description={t("notification_sub_title")}
        />

        <Grid className="JobsListRow">
          <Grid item md={12}>
            <Typography variant="h5">{t("earlier")}</Typography>
          </Grid>
          <Box
            className="profileCardBox"
            border={1}
            borderRadius={8}
            borderColor="#DDDDDD"
            py={3}
            px={3}
            mb={2}
            mt={2}
          >

          {
            notifications.length > 0 ? (
              notifications.map((notification) => (
                <Box
                  className="notificationList"
                  key={notification.id}
                  display="flex"
                  alignItems="center"
                  mb={2}
                >
                  <NotificationsIcon
                    fontSize="large"
                    color="primary"
                    className="notificationIcon"
                  />
                  <Box ml={2}>
                    <Typography variant="subtitle1">
                      {notification.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {calculateTimeAgo(notification.createdAt)}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => openDeleteModal(notification._id)}
                    style={{ marginLeft: "auto" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))
            ) : (
              <NoDataFound title={t("no_notification_found")} />
            )
          }
          </Box>
        </Grid>
      </Box>
      <div className="d-flex justify-content-center">
        <Pagination
          count={totalPage}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePagination}
        />
      </div>

      <Modal
        open={deleteModalOpen}
        onClose={handleCancelDelete}
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
          <Typography id="delete-notification-modal-title" variant="h6" gutterBottom>
            {t("confirm_delete_notification")}
          </Typography>
          <Typography id="delete-notification-modal-description" gutterBottom>
            {t("confirm_delete_notification_message")}
          </Typography>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            {t("delete")}
          </Button>
          <Button onClick={handleCancelDelete} variant="contained" color="primary">
            {t("cancel")}
          </Button>
        </Box>
      </Modal>

    </>
  );
};

export default Notifications;
