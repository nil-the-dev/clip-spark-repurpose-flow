
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="text-2xl font-bold">
        <span className="gradient-text">Clip</span>
        <span className="text-brand-dark">Spark</span>
      </div>
    </Link>
  );
};

export default Logo;
