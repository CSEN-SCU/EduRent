import React, { ReactNode, useReducer } from "react";
import { useSwipeable, SwipeableHandlers } from "react-swipeable";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  Wrapper,
  CarouselContainer,
  CarouselSlot,
  PREV,
  NEXT
} from "./components";

interface CarouselProps {
  children: ReactNode;
}

interface State {
  pos: number;
  sliding: boolean;
  dir: string;
}

interface Action {
  type: string;
  numItems?: number;
}

const getOrder = ({ index, pos, numItems }: { index: number; pos: number; numItems: number }): number => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
};

const initialState: State = { pos: 0, sliding: false, dir: NEXT };

const Carousel: React.FC<CarouselProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numItems = React.Children.count(props.children);

  const slide = (dir: string) => {
    dispatch({ type: dir, numItems });
    setTimeout(() => {
      dispatch({ type: "stopSliding" });
    }, 50);
  };

  const handlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    preventScrollOnSwipe: true, // Updated option based on latest documentation
    trackMouse: true
  });

  return (
    <div {...handlers}>
      <Wrapper>
        <CarouselContainer dir={state.dir} sliding={state.sliding}>
          {React.Children.map(props.children, (child, index) => (
            <CarouselSlot
              key={index}
              order={getOrder({ index, pos: state.pos, numItems })}
            >
              {child}
            </CarouselSlot>
          ))}
        </CarouselContainer>
      </Wrapper>
      <div 
        onClick={() => slide(PREV)} 
        className="absolute bottom-14 left-5 cursor-pointer text-5xl text-[#862633] z-12"
      >
        <IoIosArrowBack className="bg-white rounded-full"/>
      </div>
      <div 
        onClick={() => slide(NEXT)} 
        className="absolute bottom-14 right-5 cursor-pointer text-5xl text-[#862633] z-12"
      >
        <IoIosArrowForward className="bg-white rounded-full"/>
      </div>
    </div>
  );
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case PREV:
      return {
        ...state,
        dir: PREV,
        sliding: true,
        pos: state.pos === 0 ? (action.numItems as number) - 1 : state.pos - 1
      };
    case NEXT:
      return {
        ...state,
        dir: NEXT,
        sliding: true,
        pos: state.pos === (action.numItems as number) - 1 ? 0 : state.pos + 1
      };
    case "stopSliding":
      return { ...state, sliding: false };
    default:
      return state;
  }
}

export default Carousel;
