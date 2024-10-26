import clsx from "clsx";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchItems, deleteItem, updateItemStatus } from "../redux/apiSlice";

interface Item {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface Props {
  data: Item;
  setItem: (item: Item) => void;
  setOpenEdit: (status: boolean) => void;
}

const ToDoItem: React.FC<Props> = ({ data, setItem, setOpenEdit }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleEditItem = () => {
    setItem(data);
    setOpenEdit(true);
  };

  const handleDeleteItem = async () => {
    await dispatch(deleteItem(data.id) as any);
    dispatch(fetchItems() as any);
  };

  const handleUpdateStatus = async (value: string) => {
    await dispatch(updateItemStatus({ id: data.id, status: value }) as any);
    dispatch(fetchItems() as any);
  };

  return (
    <div
      className={clsx({
        "bg-white shadow-custom w-[331px] rounded-2xl relative flex flex-col":
          true,
        "h-[63px]": !open,
        "h-[125px]": open,
      })}
    >
      <div
        className=" absolute z-10 w-full h-full"
        onClick={() => setOpen(!open)}
      ></div>
      <div
        className={clsx({
          "rounded-full shadow-circles w-4 h-4 absolute left-2 top-2": true,
          "bg-[#588157]": data.status === "done",
          "bg-[#FCBF49]": data.status === "pending",
          "bg-[#D62828]": data.status === "wontdo",
        })}
      />
      <div className="flex flex-col absolute left-8 top-4">
        <p className="text-[9px] text-[#6E6A7C]">{data.title}</p>
        <p className="text-[14px] text-[#24252C]">{data.description}</p>
      </div>
      <div className="flex absolute z-20 right-5 top-5 gap-x-4">
        <img
          src="/images/edit.png"
          alt="edit"
          className="w-5 h-5"
          onClick={handleEditItem}
        />
        <img
          src="/images/delete.png"
          alt="delete"
          className="w-5 h-5"
          onClick={handleDeleteItem}
        />
      </div>
      {open && (
        <div className="flex absolute z-20 mt-[70px] px-[13px]">
          <button
            className={clsx({
              "rounded-[72px] w-[80px] py-[9px] flex justify-center text-sm":
                true,
              "bg-[#FCBF49] text-white": data.status === "pending",
              "border border-solid border-[#FCBF49]": data.status !== "pending",
            })}
            onClick={() => handleUpdateStatus("pending")}
          >
            Pending
          </button>
          <button
            className={clsx({
              "rounded-[72px] w-[80px] py-[9px] flex justify-center text-sm ml-[31px] mr-[20px]":
                true,
              "bg-[#588157] text-white": data.status === "done",
              "border border-solid border-[#588157]": data.status !== "done",
            })}
            onClick={() => handleUpdateStatus("done")}
          >
            Done
          </button>
          <button
            className={clsx({
              "rounded-[72px] w-[80px] py-[9px] flex justify-center text-sm":
                true,
              "bg-[#D62828] text-white": data.status === "wontdo",
              "border border-solid border-[#D62828]":
                data.status !== "wontdo",
            })}
            onClick={() => handleUpdateStatus("wontdo")}
          >
            Won’t do
          </button>
        </div>
      )}
    </div>
  );
};

export default ToDoItem;
