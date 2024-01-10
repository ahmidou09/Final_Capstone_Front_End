import React from 'react';
import PropTypes from 'prop-types';
import { GoTriangleRight, GoTriangleLeft } from 'react-icons/go';

const CustomArrow = ({ onClick, direction }) => (
  <button
    type="button"
    className={`custom-${direction}-arrow`}
    aria-label={`${direction} arrow`}
    onClick={onClick}
  >
    {direction === 'left' ? <GoTriangleLeft /> : <GoTriangleRight />}
  </button>
);

CustomArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default CustomArrow;
