import React, { Component } from "react";
import items from "./data";

const RoomContext = React.createContext({} as any);

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    pets: false,
    breakfast: false
  };
  // Get data
  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter((room: any) => room.featured === true);
    let maxPrice = Math.max(...rooms.map((item: any) => item.price));
    let maxSize = Math.max(...rooms.map((item: any) => item.size));
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
    });
  }

  formatData(elements: any) {
    let tempItems = elements.map((item: any) => {
      let id = item.sys.id;
      let images = item.fields.images.map(
        (image: any) => image.fields.file.url
      );
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = (slug: any) => {
    const tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room: any) => room.slug === slug);
    return room;
  };

  handleChange = (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    this.setState(
      {
        [name]: value
      },
      this.filterRoom
    );
  };

  filterRoom = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    // All the rooms
    let tempRooms = [...rooms];

    // Transform value
    capacity = parseInt(capacity.toString());
    price = parseInt(price.toString());

    // Filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room: any) => room.type === type);
    }

    // Filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room: any) => room.capacity >= capacity);
    }

    // Filter by price
    tempRooms = tempRooms.filter((room: any) => room.price <= price);

    // Filter by size
    tempRooms = tempRooms.filter(
      (room: any) => room.size >= minSize && room.size <= maxSize
    );

    // Filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room: any) => room.breakfast === true);
    }

    // Filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room: any) => room.pets === true);
    }
    // Change state
    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

export const withRoomConsumer = (Component: any) => {
  return function ConsumerWrapper(props: any) {
    return (
      <RoomConsumer>
        {(value: any) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
};

const RoomConsumer = RoomContext.Consumer;
export { RoomConsumer, RoomProvider, RoomContext };
