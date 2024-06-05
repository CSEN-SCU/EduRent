import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const NEXT = "NEXT";
export const PREV = "PREV";

interface ItemProps {
  img: string;
}

export const Item = styled.div<ItemProps>`
  text-align: center;
  padding: 100px;
  background-image: ${(props) => `url(${props.img})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100vh;
  height: 60vh;
`;

interface CarouselContainerProps {
  sliding: boolean;
  dir: string;
}

export const CarouselContainer = styled.div<CarouselContainerProps>`
  display: flex;
  transition: ${(props) => (props.sliding ? "none" : "transform 1s ease")};
  transform: ${(props) => {
    if (!props.sliding) return "translateX(calc(-100vh))"; /* Adjust for new width */
    if (props.dir === PREV) return "translateX(calc(2 * (-100vh)))";
    return "translateX(0%)";
  }};
`;

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  box-shadow: 5px 5px 20px 7px rgba(168, 168, 168, 1);
`;

interface CarouselSlotProps {
  order: number;
}

export const CarouselSlot = styled.div<CarouselSlotProps>`
  flex: 0 0 auto;
  // margin-right: 20px;
  order: ${(props) => props.order};
`;

export const AppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
  width: 75%;
  height: 75%;
`;

export const Code = styled.code`
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  margin: 0;
  padding: 0.2em 0.4em;
`;
