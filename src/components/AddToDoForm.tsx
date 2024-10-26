import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchItems, createItem, updateItem } from "../redux/apiSlice";

interface Item {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface AddToDoProps {
  closeForm: () => void;
  itemToUpdate: Item;
}

const AddToDoForm: React.FC<AddToDoProps> = ({ closeForm, itemToUpdate }) => {
  const [title, setTitle] = useState<string>(
    itemToUpdate.id > 0 ? itemToUpdate.title : ""
  );
  const [description, setDescription] = useState<string>(
    itemToUpdate.id > 0 ? itemToUpdate.description : ""
  );
  const dispatch = useDispatch();

  const handleCreateItem = async () => {
    if (title && description && itemToUpdate.id === -1) {
      await dispatch(
        createItem({
          id: 0,
          title: title,
          description: description,
          status: "pending",
        }) as any
      );
      dispatch(fetchItems() as any);
      closeForm();
    } else if (title && description && itemToUpdate.id > 0) {
      const updatedItem = {
        id: itemToUpdate.id,
        title: title,
        description: description,
        status: "pending",
      };
      await dispatch(
        updateItem({
          id: itemToUpdate.id,
          updatedItem: updatedItem,
        }) as any
      );
      dispatch(fetchItems() as any);
      closeForm();
    }
  };

  return (
    <div className="w-[331px] h-[392px] absolute z-10 bottom-0 mb-[90px] bg-white rounded-2xl shadow-custom  flex items-center justify-center flex-col gap-y-[11px]">
      <input
        type="text"
        className="bg-[#FCFAFF] w-[296px] h-10 rounded-lg px-4 py-3"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        id="description"
        name="description"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="bg-[#FCFAFF] w-[296px] h-[255px] rounded-lg px-4 py-3"
        placeholder="Description"
      />
      <div className="flex w-[296px] justify-between">
        <button
          className="rounded-[72px] w-[121px] border border-solid border-[#5F33E1] py-1.5 px-8 text-[#5F33E1]"
          onClick={closeForm}
        >
          Cancel
        </button>
        <button
          className="rounded-[72px] w-[121px] bg-[#5F33E1] py-1.5 px-8 text-white"
          onClick={handleCreateItem}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AddToDoForm;
