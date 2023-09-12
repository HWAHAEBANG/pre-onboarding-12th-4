import React, { MouseEvent, FC } from "react";
import { CATEGORYS } from "../../constants/category";
import { styled } from "styled-components";

interface Props {
  selectCategory: (e: MouseEvent<HTMLButtonElement>) => void;
  selected: string;
}

const CategoryBtnList: FC<Props> = ({ selectCategory, selected }) => {
  return (
    <ButtonSection>
      {CATEGORYS.map((CATEGORY, index) => (
        <StyledButton
          key={index}
          className={CATEGORY === selected ? "seleted" : ""}
          onClick={selectCategory}
        >
          {CATEGORY}
        </StyledButton>
      ))}
    </ButtonSection>
  );
};

export default CategoryBtnList;

const ButtonSection = styled.div`
  padding: 20px 30px 0 20px;
`;

const StyledButton = styled.button`
  background-color: white;
  color: #a3b3bb;
  margin: 5px 5px 50px 5px;
  padding: 5px 10px;
  outline: none;
  border: 1px solid #a3b3bb;
  border-radius: 20px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  &.seleted {
    border: 1px solid #6092ee;
    color: #6092ee;
  }
`;
