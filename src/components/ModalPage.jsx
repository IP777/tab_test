import React, { useState } from "react";
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

const StyledTabs = styled.div`
  width: 970px;
  margin-left: 30px;
  overflow: hidden;
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
    &.${(props) => {
        const index = props.arr.map((iter) => iter.id).indexOf(props.tab);
        if (index === -1) {
          return `tab0`;
        }
        return `tab${props.tab}`;
      }} {
      display: block;
    }
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
  box-shadow: 0px 0px 6px 4px rgb(255 255 255);
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

export default function ModalPage({ setOpen }) {
  const [tab, setTab] = useState(0);
  const [arr, setArr] = useState(tabsArr);

  const tabHandle = (id) => {
    setTab(id);
  };

  const delHandle = (id) => {
    if (tab === id) {
      if (arr.length <= 1) {
        setOpen(false);
        return;
      }
      const index = arr.map((iter) => iter.id).indexOf(id);
      if (index > 0) {
        setTab(arr[index - 1].id);
      } else {
        setTab(arr[index + 1].id);
      }
    }

    const filterArr = arr.filter((iter) => iter.id !== id);
    setArr(filterArr);
  };

  return (
    <>
      <StyledWrapper>
        <StyledTabs tab={tab} arr={arr}>
          <div className="wrapper">
            {arr.map((iter, count) => (
              <li key={count.toString()} className={`tab${iter.id}`}>
                <button
                  type="button"
                  onClick={() => tabHandle(iter.id)}
                  className="btn"
                >
                  {iter.value}
                </button>
                <button
                  type="button"
                  onClick={() => delHandle(iter.id)}
                  className="del btn"
                >
                  x
                </button>
              </li>
            ))}
            <StyledAdd
              type="button"
              onClick={(e) => {
                setArr([...arr, ...tabsArr2()]);
                e.target.parentElement.scrollLeft += 200;
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
              e.target.parentElement.scrollLeft -= 200;
            }}
          >
            {`<`}
          </StyledNav>
          <StyledNav
            arr={arr}
            className="right_arrow"
            type="button"
            onClick={(e) => {
              e.target.parentElement.scrollLeft =
                e.target.parentElement.scrollLeft + 200;
            }}
          >
            {`>`}
          </StyledNav>
        </StyledTabs>
        <StyledCards tab={tab} arr={arr}>
          {arr.map((iter, count) => (
            <li key={count.toString()} className={`tab${iter.id}`}>
              <div>{iter.value}</div>
            </li>
          ))}
        </StyledCards>
      </StyledWrapper>
      <div>
        <button type="button" onClick={() => setArr([...arr, ...tabsArr2()])}>
          Add arr
        </button>
        <button type="button" onClick={() => setArr([...tabsArr])}>
          Default arr
        </button>
        <button type="button" onClick={() => setTab(1)}>
          select
        </button>
      </div>
    </>
  );
}
