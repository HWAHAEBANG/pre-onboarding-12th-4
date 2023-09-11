import React,{MouseEvent,FC} from "react";
import { CATEGORYS } from "../../constants/category";
import {styled} from "styled-components"

interface Props {
    selectCategory:(e: MouseEvent<HTMLButtonElement>) => void; 
    selected : string;
}

const CategoryBtnList:FC<Props> = ({selectCategory,selected}) => {
    return(
        <ButtonSection>
         {CATEGORYS.map((CATEGORY)=><StyledButton className={CATEGORY === selected?'seleted':''} onClick={selectCategory}>{CATEGORY}</StyledButton>)}
         </ButtonSection>
    )
}

export default CategoryBtnList;

const ButtonSection = styled.div`
    padding: 20px 30px 0 20px;
` 

const StyledButton = styled.button`
background-color: white;
color: #A3B3BB;
margin: 5px 5px 50px 5px;
padding: 5px 10px;
outline: none;
border: 1px solid #A3B3BB;
border-radius: 20px;
font-weight: 900;
cursor: pointer;

&:hover {
    transform: scale(1.1);
}

&.seleted {
    border: 1px solid #6092EE;
    color: #6092EE;
}
`