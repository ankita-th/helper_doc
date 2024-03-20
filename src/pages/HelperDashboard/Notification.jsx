import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Pagination,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  getAllNotificationsList,
  removeNotification,
} from "../../Services/ProfileServices/NotificationService";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import { toastMessage } from "../../Utils/toastMessages";
import { successType } from "../../Constant/Constant";
import HelperDashboardSubHeader from "../../Components/Common/Headers/HelperDashboardSubHeader";
import ConfirmationModal from "../../Components/Common/Modal/ConfirmationModal";
import NotificationCard from "../../Components/Common/Notification/NotificationCard";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [totalPage, setTotalPage] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [notificationIdToDelete, setNotificationIdToDelete] = useState(null);
  const [loader, setLoader] = useState(true);
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");

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

  function getAllNotifications(userId) {
    const param = `?page=${currentPage.page}&limit=${10}`;
    getAllNotificationsList(userId, param)
      .then((res) => {
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
          <NotificationCard
            notifications={notifications}
            openDeleteModal={openDeleteModal}
          />
        </Grid>
      </Box>
      {totalPage > 0 && (
        <div className="d-flex justify-content-center">
          <Pagination
            count={totalPage}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePagination}
          />
        </div>
      )}
      {deleteModalOpen && (
        <ConfirmationModal
          openModal={deleteModalOpen}
          closeModal={handleCancelDelete}
          onConfirmClick={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default Notifications;
