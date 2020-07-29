import React, { useState } from "react";
import { graphql } from "@apollo/react-hoc";
import styled from "styled-components";
import { withNoStack, EXECUTE } from "@nostack/no-stack";
import compose from "@shopify/react-compose";
import IconButton from "@material-ui/core/IconButton";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Divider,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import LoaderIcon from "../../assets/icons/712.gif";
import { CREATE_ITEM_FOR_LIST_ACTION_ID } from "../../config";



const CustomDialogAction = styled(DialogActions)`
  justify-content: center !important;
`;

const CustomDialog = styled(Dialog)`
  .MuiDialog-paperFullWidth {
    border-radius: 20px;
    height: 14rem;
    position: relative;
  }
`;

const IconButtonLogo = styled(IconButton)`
  && {
    position: absolute;
    right: 1px;
    top: 0vh;
  }
`;
const CustomDialogTitle = styled(DialogTitle)`
  text-align: center;
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

const CustomSpan = styled.span`
  position: absolute;
  top: 50%;
  font-size: 0.9rem;
  width: 100%;
  text-align: center;
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

const STATE_SHOW_FORM = 0;
const STATE_LOADING = 1;
const STATE_DONE = 2;


function ItemForm({
  userId,
  createItem,
  refetchQueries,
  title,
  buttonLabel,
  onSave,
  open,
  onClose,
  value = "",
  inProgressMessage,
  completedMessage,
}) {
  const [itemValue, updateItemValue] = useState(value);
  const [dialogState, setDialogState] = useState(STATE_SHOW_FORM);

  function handleChange(e) {
    updateItemValue(e.target.value);
  }
  const handleClose = () => {
    onClose();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!itemValue) {
      return;
    }
    setDialogState(STATE_LOADING);
    await onSave(itemValue);
    // const newItemData = JSON.parse(createItemResponse.data.Execute);
    updateItemValue("");
    setDialogState(STATE_DONE);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  function handleOk() {
    setDialogState(STATE_SHOW_FORM);
    handleClose();
  }

  return (
    <CustomDialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="form-dialog-title"
    >
      {dialogState === STATE_SHOW_FORM ? (
        <>
          <CustomDialogTitle id="form-dialog-title">{title}</CustomDialogTitle>
          <IconButtonLogo aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButtonLogo>

          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="item-value"
              label="Task Name"
              type="text"
              fullWidth
              value={itemValue}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </DialogContent>
          <Divider />
        </>
      ) : (
        ""
      )}
      {dialogState === STATE_LOADING ? (
        <>
          <Customtext>
            <CustomImage src={LoaderIcon} alt="checked" />
            <CustomCreateSpan>{inProgressMessage}</CustomCreateSpan>
          </Customtext>
        </>
      ) : (
        ""
      )}
      {dialogState === STATE_DONE ? (
        <>
          <Customtext>
            <CustomImage
              src="https://img.icons8.com/cotton/64/000000/checked.png"
              alt="checked"
            />
            <CustomSpan>{completedMessage}</CustomSpan>
          </Customtext>

          <ModaDialogAction>
            <Button onClick={handleOk}>Okay</Button>
          </ModaDialogAction>
        </>
      ) : (
        " "
      )}

      {dialogState === STATE_SHOW_FORM ? (
        <CustomDialogAction>
          <Button onClick={handleSubmit}>{buttonLabel}</Button>
        </CustomDialogAction>
      ) : (
        ""
      )}
    </CustomDialog>
  );
}
export default ItemForm;
