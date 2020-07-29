import React, { useState } from "react";
import { graphql } from "@apollo/react-hoc";
import styled from "styled-components";
import { withNoStack, EXECUTE } from "@nostack/no-stack";
import compose from "@shopify/react-compose";
import ItemForm from "../ItemForm";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";
import { CREATE_ITEM_FOR_LIST_ACTION_ID } from "../../config";



// change styling here
const Form = styled.div`
  text-align: end;
`;
const StyleButton = styled(Button)`
  && {
    border-radius: 25px;
    border: 2px solid;
  }
`;

function ItemCreationForm({ userId, createItem, refetchQueries }) {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  async function handleSubmit(itemValue) {
    if (!itemValue) {
      return;
    }
    const createItemResponse = await createItem({
      variables: {
        actionId: CREATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: userId,
          value: itemValue,
        }),
        unrestricted: false,
      },
      refetchQueries,
    });
  }

  return (
    <Form>
      <StyleButton size="medium" variant="outlined" onClick={setOpen}>
        <AddIcon />
        ADD TASK
      </StyleButton>
      <ItemForm
        open={open}
        onSave={handleSubmit}
        title={"Create Task"}
        buttonLabel={"Add"}
        onClose={close}
        inProgressMessage={"Creating task..."}
        completedMessage={"Task successfully created."}
      />
    </Form>
  );
}

export default compose(graphql(EXECUTE, { name: "createItem" }))(
  ItemCreationForm
);
