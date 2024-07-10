import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import NoteCard from "../../Components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";

const Home = () => {
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    title: "add",
    data: "null",
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="meeting on 7th April"
            date="3rd Apr 2024"
            content="meeting on 7th April meeting on 7th April"
            tags="#meeting"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModel({
            isShown: true,
            title: "add",
            data: "null",
          });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModel.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes />
      </Modal>
    </>
  );
};

export default Home;
