import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import { RoomContext } from "../context";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import StyledHero from "../components/styledHero";

interface IProps {
  slug?: string;
  match?: any;
}

interface IState {
  slug?: string;
  defaultBcg?: any;
}

export default class SingleRoom extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    };
  }
  static contextType = RoomContext;
  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    if (!room) {
      return (
        <div className="error">
          <h3>
            no such room could be found ...no such room could be found ...
          </h3>
          <Link to="/rooms/" className="btn-primary">
            back to rooms
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      pets,
      size,
      price,
      extras,
      images,
      breakfast
    } = room;
    const [mainImg, ...defaultImg] = images;
    return (
      <>
        <StyledHero img={mainImg[0] || this.state.defaultBcg}>
          <Banner title={`${name} room`} subtitle="">
            <Link to="/rooms" className="btn-primary">
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((item: any, index: any) => {
              return <img src={item} key={index} alt={name} />;
            })}
          </div>
          <div className="single-roon-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size : ${size} SQFT</h6>
              <h6>
                max capacity :
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
              <h6>{breakfast && "free breakfast included"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>Extras</h6>
          <ul className="extras">
            {extras.map((item: any, index: any) => {
              return <li key={index}> - {item}</li>;
            })}
          </ul>
        </section>
      </>
    );
  }
}
