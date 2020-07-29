import React, { useState } from "react";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
} from "@material-ui/core";
import { EXECUTE } from "@nostack/no-stack";
import compose from "@shopify/react-compose";
import { graphql } from "@apollo/react-hoc";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import ItemEditForm from "../ItemEditForm";
import { blue } from "@material-ui/core/colors";

import {
  UPDATE_ITEM_FOR_LIST_ACTION_ID,
  DELETE_ITEM_FOR_LIST_ACTION_ID,
} from "../../config";
import DeleteItemModal from "./deleteItemModal";

const ItemWrapper = styled.div`
  width: 100%;
`;

const CustomAccordion = styled(Accordion)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const CustomAccordionDetails = styled(AccordionDetails)`
  justify-content: space-between;
`;

const CustomTypography = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 400;
`;

const CircleIndex = styled.span`
  background: #18a0fb;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  color: #ffffff;
  display: inline-block;
  line-height: 40px;
  margin-right: 5px;
  text-align: center;
  width: 40px;
`;
function SimpleAccordion({
  item,
  index,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
}) {
  const [itemValue, updateItemValue] = useState(item.value);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteState, setDeleteState] = useState(0); // 0-> not delete started 1 -> delete in progress 3 -> delete completed

  function handleItemValueChange(e) {
    updateItemValue(e.target.value);
  }

  async function handleItemValueSave() {
    setIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          value: itemValue,
          instanceId: item.id,
        }),
      },
      refetchQueries,
    });
    setOpenEdit(false);
    setIsSaving(false);
  }

  async function handleDelete() {
    setDeleteState(1);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_ITEM_FOR_LIST_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: item.id,
          }),
          unrestricted: false,
        },
        refetchQueries,
      });
      setDeleteState(2);
    } catch (e) {
      setIsDeleting(false);
    }
  }

  function handleCancelDelete() {
    setOpenDelete(false);
  }

  return (
    <ItemWrapper>
      <CustomAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: blue[500] }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <CustomTypography>
            <CircleIndex> {index + 1}</CircleIndex> {itemValue}
          </CustomTypography>
        </AccordionSummary>
        <Divider />
        <CustomAccordionDetails>
          <Button startIcon={<EditIcon />} onClick={() => setOpenEdit(true)}>
            Edit
          </Button>

          <Button
            startIcon={<DeleteIcon color="secondary" />}
            onClick={() => setOpenDelete(true)}
          >
            Delete
          </Button>
        </CustomAccordionDetails>
        <ItemEditForm
          id={item.id}
          value={itemValue}
          onChange={handleItemValueChange}
          onSave={handleItemValueSave}
          onClose={() => setOpenEdit(false)}
          open={openEdit}
          disabled={isSaving}
          refetchQueries={refetchQueries}
        />
        <DeleteItemModal
          value={itemValue}
          open={openDelete}
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          onClose={() => setOpenDelete(false)}
          disabled={isDeleting}
          deleteState={deleteState}
          setDeleteState={setDeleteState}
        />
      </CustomAccordion>
    </ItemWrapper>
  );
}
export default compose(
  graphql(EXECUTE, { name: "updateInstance" }),
  graphql(EXECUTE, { name: "deleteInstance" })
)(SimpleAccordion);
