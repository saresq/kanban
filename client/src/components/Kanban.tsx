import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import ColumnContainer from "./ColumnContainer";

const API_URL = 'http://localhost:5000/api';

function Kanban() {
  const [data, setData] = useState([]);

  // Get data from DB
  const fetchData = useCallback(async () => {
    try {
      const result = await axios.get(`${API_URL}/tasks`);
      setData(result.data);
      console.log(data);
    } catch (e) {
      console.log('Error while fetching data from api endpoint /api/scores');
    }
  }, [setData]);

  useEffect(() => {
    // Bring data for the first time
    fetchData();
    // Set an interval for refreshing data every 10 sec
    // const interval = setInterval(() => {
    //   fetchData();
    // }, 10000);

    // return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
      "
    >

      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {data.map((col)=>{
            return (
            <p> 
              {col.descripcion}
            </p>
              )
          })}
          <ColumnContainer/>
        </div>
        <button
          className="
            h-[60px]
            w-[350px]
            min-w-[350px]
            cursor-pointer
            rounded-lg
            bg-mainBackgroundColor
            border-2
            border-columnBackgroundColor
            p-4
            ring-rose-500
            hover:ring-2
            flex
            gap-2
            "
        >
          Add Column
        </button>
      </div>
  </div>
  )
}

export default Kanban