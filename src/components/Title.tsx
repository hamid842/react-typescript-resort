import React from "react";
interface ITitleProps {
  title: string;
}

const Title = ({ title }: ITitleProps) => {
  return (
    <div className="section-title">
      <h4>{title}</h4>
      <div />
    </div>
  );
};

export default Title;
