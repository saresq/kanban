function ColumnContainer() {
  return (
    <div
      className="
        bg-blue-900
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
        "
    >
      <div
        className="
      bg-teal-900
      text-md
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none
      p-3
      font-bold
      flex
      items-center
      justify-between
      "
      >  Title
        <div className="flex gap-2">
          <div
            className="
        flex
        justify-center
        items-center
        bg-teal-700
        px-2
        py-1
        text-sm
        rounded-full
        "
          >
            COUNT
          </div>
        </div>
        <button
          className="
        stroke-gray-500
        hover:stroke-white
        hover:bg-columnBackgroundColor
        rounded
        px-1
        py-2
        "
        >
          Del
        </button>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        //task list
      </div>
      <button
        className="flex gap-2 items-center rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
      >
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
