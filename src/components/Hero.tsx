import React from "react";

interface IHeroProps {
  hero: string;
  children: JSX.Element;
}
const Hero = ({ hero, children }: IHeroProps) => {
  return <header className={hero}>{children}</header>;
};

Hero.defaultProps = {
  hero: "defaultHero"
};

export default Hero;
