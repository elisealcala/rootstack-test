import React from 'react';

type TypePoint = {
  label: string;
  onClick(): void;
  selected: boolean;
};

export default function Point({ label, onClick, selected }: TypePoint) {
  return (
    <button
      type="button"
      className={`${
        selected ? `bg-red-700` : `bg-gray-700`
      } text-white px-2 rounded`}
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  );
}
