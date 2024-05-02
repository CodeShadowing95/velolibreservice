/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"

const Station = ({ info }) => {
  const [stationObj, setStationObj] = useState({});

  useEffect(() => {
    if (info) {
      setStationObj(info);
    }
  }, [info]);

  return (
    <div className={`absolute top-[100px] ${stationObj?.name ? "translate-x-[340px]" : "-translate-x-full"} flex flex-col items-center transition-transform bg-white w-56 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 z-10`}>
      <div className="flex flex-col w-full p-2 gap-2">
        <div className="flex justify-center items-center p-2 w-10 h-10 rounded-full hover:bg-gray-50 self-end" onClick={() => setStationObj(null)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain" viewBox="0 0 24 24"><path fill="#000000" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"/></svg>
        </div>

        <div className="w-full flex flex-col px-2">
          <p className="font-bold text-lg">{stationObj?.name}</p>
          <p className="text-sm text-gray-500">{stationObj?.address}</p>

          <p className="text-xs font-bold mt-4 mb-1">Description</p>
          <p className="text-[10px] leading-5">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quod eaque aspernatur praesentium dolorem aliquam officiis similique alias consequuntur atque fugit voluptas, possimus nulla ullam omnis pariatur corrupti est temporibus!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Station