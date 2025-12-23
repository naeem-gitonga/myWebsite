import { useState } from 'react';

export default function useModal(): [boolean, () => void] {
  const [isOpen, setIsOpen] = useState(false);
  const setModalOpen = () => {
    setIsOpen(!isOpen);
  };
  return [isOpen, setModalOpen];
}
