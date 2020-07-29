import React, { useState } from "react";
import { graphql } from "@apollo/react-hoc";
import styled from "styled-components";
import { withNoStack, EXECUTE } from "@nostack/no-stack";
import compose from "@shopify/react-compose";
import ItemForm from "../ItemForm";
import AddIcon from "@material-ui/icons/Add";
import {
  UPDATE_ITEM_FOR_LIST_ACTION_ID,
  DELETE_ITEM_FOR_LIST_ACTION_ID,
} from "../../config";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import { CREATE_ITEM_FOR_LIST_ACTION_ID } from "../../config";
const StyleButton = styled(Button)`
  && {
    border-radius: 25px;
    border: 2px solid;
  }
`;
const STATE_SHOW_FORM = 0;
const STATE_LOADING = 1;
const STATE_DONE = 2;
// change styling here
const Form = styled.div`
  // margin: 2em;
  // padding: 1.5em;
  // border: none;
  // border-radius: 5px;
  // background-color: #F5F5F5;
  text-align: end;
`;

function ItemEditForm({
  id,
  value,
  userId,
  updateInstance,
  refetchQueries,
  item,
  open,
  onClose,
  
}) {
  if (!open) {
    return null;
  }

  async function handleSubmit(itemValue) {
    await updateInstance({
      variables: {
        actionId: UPDATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          value: itemValue,
          instanceId: id,
        }),
      },
      refetchQueries,
    });
  }

  return (
    <Form>
      <ItemForm
        key={id}
        id={id}
        open={open}
        onSave={handleSubmit}
        title={"Edit Task"}
        value={value}
        buttonLabel={"Save"}
        onClose={onClose}
        inProgressMessage={"Saving changes..."}
        completedMessage={"Changes saved."}

      />
    </Form>
  );
}

export default compose(
  graphql(EXECUTE, { name: "updateInstance" }),
  graphql(EXECUTE, { name: "deleteInstance" })
)(ItemEditForm);
