import React, {useRef, useState} from "react";
import uniqid from "uniqid";

import styled from "styled-components";

const StyledWrapper = styled.div`
  width: 1030px;
  height: 700px;
  padding: 0;
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    padding: 0;
    margin: 0;
  }
`;


// TOD: поправить так, как сделаны табы  (VisibleTab)
const StyledTabs = styled.div`
  width: 970px;
  margin-left: 30px;
  overflow: hidden;
  scroll-behavior: smooth;
  .wrapper {
    /* transform: ${(props) => {
      const index = props.arr.map((iter) => iter.id).indexOf(props.tab);
      const calc = (index + 1) * 205 - 970;
      if (calc > 0 && props.arr.length - 1 === index) {
        return `translateX(${-calc}px)`;
      }
    }}; */
    display: flex;
    align-items: center;
    list-style: none;
    height: 50px;
    li {
      display: flex;
      margin-left: 5px;
      background-color: #cccccc;
      border-radius: 5px 5px 0 0;
      :nth-child(1) {
        margin-left: 0;
      }
      &.${(props) => {
          const index = props.arr.map((iter) => iter.id).indexOf(props.tab);
          if (index === -1) {
            return `tab0`;
          }
          return `tab${props.tab}`;
        }} {
        background-color: #ffffff;
        margin-bottom: 0;
        .btn {
          font-size: 18px;
          font-weight: 700;
        }
      }
      .btn {
        height: 50px;
        width: 170px;
        padding: 0;
        background-color: rgba(255, 255, 255, 0);
        border: 0;
        font-size: 16px;
        font-weight: 400;
        outline: none;
      }
      .del {
        width: 30px;
      }
    }
  }
`;

const StyledCards = styled.ul`
  display: flex;
  li {
    display: none;
    width: 100%;
    height: 650px;
    background-color: #fff;
    &.visibleTab {
      display: block;
    }
`;

const StyledAdd = styled.button`
  height: 30px;
  width: 30px;
  font-size: 27px;
  border: 0;
  border-radius: 8px;
  background-color: #fff;
  outline: none;
  margin-left: 10px;
  box-shadow: 0 0 6px 4px rgb(255 255 255);
`;

const StyledNav = styled.button`
  /* display: ${(props) => (props.arr.length >= 6 ? "block" : "none")}; */
  position: absolute;
  top: 10px;
  height: 30px;
  width: 30px;
  border-radius: 5px;
  background-color: #fff;
  border: 0;
  outline: 0;
  opacity: 0.3;
  &:hover {
    opacity: 0.7;
  }
  &.left_arrow {
    left: 0;
  }
  &.right_arrow {
    right: 0;
  }
`;

const tabsArr = [
  { id: 0, value: "First tab" },
  { id: 1, value: "Second tab" },
  { id: 2, value: "Third tab" },
];

const tabsArr2 = () => {
  return [{ id: uniqid(), value: `${uniqid()} tab` }];
};

const scrollOptions = { behavior: "smooth", inline: "center", block:"center"}

export default function ModalPage({ setOpen }) {
  const [tabId, setTabId] = useState(0);
  const [arr, setArr] = useState(tabsArr);
  const t = useRef(null);
  const m  = useRef(null);
  const tabHandle = (id) => {
      m.current.childNodes[arr.map(({id})=>id).indexOf(id)].scrollIntoView(scrollOptions)
    setTabId(id);
  };




  const delHandle = (id) => {
    if (tabId === id) {
      if (arr.length <= 1) {
        setOpen(false);
        return;
      }
      const index = arr.map((iter) => iter.id).indexOf(id);
      if (index > 0) {
          setTabId(arr[index - 1].id);
      } else {
          setTabId(arr[index + 1].id);
      }
    }

    const filterArr = arr.filter((iter) => iter.id !== id);
    setArr(filterArr);
  };


    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

  const onData = (data)=> {
      if(data.data.length> arr.length) {
          //Try to find new Element
          const localIdMap = arr.map(id=>id)
          const remoteIdMap  = data.data.map(id=>id)

          const newId = remoteIdMap.filter(item=>localIdMap.indexOf(item) !== -1);
          const lastFoundElementPosition = remoteIdMap.indexOf(newId[newId.length-1]);
          setTimeout(()=>m.current.childNodes[lastFoundElementPosition].scrollIntoView(scrollOptions), 0)
      }
      setArr(data.data);
console.log(data.currentPosition)
      if(data.currentPosition){
          setTabId(data.data[data.currentPosition].id)
          setTimeout(()=>m.current.childNodes[data.currentPosition].scrollIntoView(scrollOptions), 0)
      }

  }



  return (
    <>
      <StyledWrapper>
        <StyledTabs tab={tabId} arr={arr} ref={t} onWheel={(e)=> {
            const spd = parseInt(e.nativeEvent.wheelDelta);
            t.current.scrollLeft += e.nativeEvent.wheelDelta;
        }}>
          <div className="wrapper" ref={m}>
            {arr.map((item, count) => (
              <li key={count.toString()} className={`tab${item.id}`}>
                <button
                  type="button"
                  onClick={() => tabHandle(item.id)}
                  className="btn"
                >
                  {item.value}
                </button>
                <button
                  type="button"
                  onClick={() => delHandle(item.id)}
                  className="del btn"
                >
                  x
                </button>
              </li>
            ))}
            <StyledAdd
              type="button"
              onClick={() => {
                  const newArray = [...arr, ...tabsArr2()]
                setArr(newArray);
                setTabId(newArray[newArray.length-1].id)
                setTimeout(()=>m.current.childNodes[newArray.length].scrollIntoView(scrollOptions), 0)

              }}
            >
              +
            </StyledAdd>
          </div>
          <StyledNav
            arr={arr}
            className="left_arrow"
            type="button"
            onClick={(e) => {
             t.current.scrollLeft -= 300;
            }}
          >
            {`<`}
          </StyledNav>
          <StyledNav
            arr={arr}
            className="right_arrow"
            type="button"
            onClick={(e) => {
              t.current.scrollLeft += 300;
            }}
          >
            {`>`}
          </StyledNav>
        </StyledTabs>
        <StyledCards>
          {arr.map((item, index) => (
            <li key={index.toString()} className={item.id === tabId? `visibleTab`: index=== 0 &&  !tabId? "visibleTab": ""}>
              <div>{item.value}</div>
            </li>
          ))}
        </StyledCards>
      </StyledWrapper>
      <div>
        <button type="button" onClick={() => onData({
            currentPosition: null,
            data: [
                ...arr, ...tabsArr2()
            ]
        })}>
          Add arr
        </button>
          <button type="button" onClick={() => onData({
              currentPosition: arr.length,
              data: [
                  ...arr, ...tabsArr2()
              ]
          })}>
              Add arr with scroll to it
          </button>
          <button type="button" onClick={() => onData({
              currentPosition: getRandomInt(0,Object.keys(arr).length),
              data: [
                  ...arr,
              ]
          })}>
              Switch to Random
          </button>
        <button type="button" onClick={() => setArr([...tabsArr])}>
          Default arr
        </button>
        <button type="button" onClick={() => tabHandle(1)}>
          select
        </button>
      </div>
    </>
  );
}
