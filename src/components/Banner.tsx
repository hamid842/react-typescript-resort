import React from "react";

interface IBannerProps {
  title: string;
  subtitle: string;
  children: JSX.Element;
}
const Banner = ({ title, subtitle, children }: IBannerProps) => {
  return (
    <div className="banner">
      <h1>{title}</h1>
      <div></div>
      <p>{subtitle}</p>
      {children}
    </div>
  );
};

export default Banner;
