import React from "react";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import { withRoomConsumer } from "../context";
import Loading from "../components/Loading";

const RoomsContainer = ({ context }: any) => {
  const { loading, sortedRooms, rooms } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </>
  );
};

export default withRoomConsumer(RoomsContainer);

// const RoomsContainer = () => {
//   return (
//     <RoomConsumer>
//       {(value: any) => {
//         const {loading , sortedRooms , rooms} = value
//         if(loading){
//           return <Loading />
//         }
//         return (
//           <div>
//             hello from room container
//             <RoomsFilter rooms={rooms}/>
//             <RoomsList rooms={sortedRooms}/>
//           </div>
//         );
//       }}
//     </RoomConsumer>
//   );
// };

// export default RoomsContainer;
