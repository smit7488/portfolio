import React from "react";

interface BasicHeroProps {
  title: string;
  className?: string; // Optional extra classes
}

const BasicHero: React.FC<BasicHeroProps> = ({ title, className = "" }) => {
  return (
    <section className={`bg-light py-5 px-4 ${className}`}>
      <h1 className="text-center mb-0 text-uppercase text-wrap">{title}</h1>
    </section>
  );
};

export default BasicHero;
