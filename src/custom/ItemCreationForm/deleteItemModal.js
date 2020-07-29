import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import LoaderIcon from "../../assets/icons/712.gif";

const CustomDialog = styled(Dialog)`
  .MuiDialog-paperFullWidth {
    border-radius: 20px;
    height: 14rem;
  }
`;

const CustomDialogActions = styled(DialogActions)`
  && {
    padding: 1rem 2rem;
    justify-content: space-between;
  }
`;

const CustomDialogTitle = styled(DialogTitle)`
  && {
    margin-top: 2rem;
    text-align: center;
    h2 {
      font-size: 0.9rem;
    }
  }
`;
const IconButtonLogo = styled(IconButton)`
  && {
    position: absolute;
    right: 1px;
    top: 0vh;
  }
`;

const CustomDialogContent = styled(DialogContent)`
  && {
    text-align: center;
    p {
      font-size: 0.9rem;
    }
  }
`;

const CustomImage = styled.img`
  height: 64px;
  position: absolute;
  top: 20%;
  object-fit: contain;
  width: 100%;
`;
const Customtext = styled.div`
  display: flex;
`;
const CustomCreateSpan = styled.span`
  position: absolute;
  top: 50%;
  font-size: 0.9rem;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
`;
const ModaDialogAction = styled(DialogActions)`
  && {
    position: absolute;
    top: 70%;
    text-align: center;
    width: -webkit-fill-available;
    width: -moz-available;
    justify-content: center;
  }
`;

const CustomSpan = styled.span`
  position: absolute;
  top: 50%;
  font-size: 0.9rem;
  width: 100%;
  text-align: center;
`;
function DeleteItemModal({
  onDelete,
  onCancel,
  value,
  onClose,
  open,
  deleteState,
  setDeleteState,
  completeDelete,
}) {
  if (!open) {
    return null;
  }


  // 0 -> 0,
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="form-dialog-title"
    >
      {deleteState === 0 ? (
        <>
          <CustomDialogTitle>
            Are you sure to delete your task{" "}
          </CustomDialogTitle>
          <IconButtonLogo aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButtonLogo>

          <CustomDialogContent>
            <Typography> "{value}" ?</Typography>
          </CustomDialogContent>
        </>
      ) : (
        ""
      )}
      {deleteState === 1 ? (
        <Customtext>
          <CustomImage src={LoaderIcon} alt="checked" />
          <CustomCreateSpan> Deleting...</CustomCreateSpan>
        </Customtext>
      ) : (
        ""
      )}

      {deleteState === 2 ? (
        <>
          <Customtext>
            <CustomImage
              src="https://img.icons8.com/cotton/64/000000/checked.png"
              alt="checked"
            />
            <CustomSpan> Task has been successfully deleted! </CustomSpan>
          </Customtext>

          <ModaDialogAction>
            <Button onClick={completeDelete}>Okay</Button>
          </ModaDialogAction>
        </>
      ) : (
        ""
      )}

      {deleteState === 0 ? (
        <CustomDialogActions>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={onDelete}>
            Delete
          </Button>
        </CustomDialogActions>
      ) : (
        ""
      )}
    </CustomDialog>
  );
}
export default DeleteItemModal;
