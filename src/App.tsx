import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "./redux/apiSlice";
import { RootState } from "./redux/store";
import axiosInstance from "./utils/axiosInstance";
import { useAuth } from "./provider/authProvider";
import AddToDoForm from "./components/AddToDoForm";
import ToDoItem from "./components/ToDoItem";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [updateItem, setUpdateItem] = useState({id: -1, title: '', description: '', status: '' });
  const dispatch = useDispatch();
  const { items, error } = useSelector(
    (state: RootState) => state.api
  );
  const { token } = useAuth();

  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(fetchItems() as any);
  }, [dispatch, token]);

  const toggleForm = () => {
    setOpen(!open);
  };

  if(error) {
    return (<p>Error</p>)
  }

  return (
    <div
      className="flex flex-col items-center w-screen h-screen bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <h1 className="text-[19px] font-semibold mt-[26px] mb-8">My To-Do</h1>
      <div className="flex flex-col gap-y-[19px]">

      {items?.map((item, key) => <ToDoItem key={key} data={item} setItem={setUpdateItem} setOpenEdit={setOpen}/>)}
      </div>
      {open && <AddToDoForm closeForm={toggleForm} itemToUpdate={updateItem} />}
      <button
        className=" absolute bottom-0 mb-[35px] bg-[#5F33E1] rounded-full w-[50px] h-[50px] flex items-center justify-center "
        onClick={toggleForm}
      >
        <img src="/images/plus.png" alt="+"/>
      </button>
    </div>
  );
}

export default App;
