import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const Card = ({ book }) => {
  return (
    <StyledWrapper>
      <div className="card rounded-none h-full relative group">
        <img
          className="w-80 h-full object-cover brightness-50 xl:brightness-100 xl:group-hover:brightness-50"
          src={book.coverImage}
          alt=""
        />
        <div className="flex flex-col items-center absolute top-2/3 left-1/2 -translate-1/2 space-y-4 xl:opacity-0 group-hover:opacity-100 transition-all duration-200">
          <h2 className="text-xl font-semibold text-center">{book.title}</h2>
          <Link
            to={`/book-details/${book?._id}`}
            className="btn btn-sm rounded-none btn-outline"
          >
            View Details
          </Link>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    background-color: #4158d0;
    color: white;
    overflow: hidden;
    position: relative;
    transform-style: preserve-3d;
    perspective: 1000px;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    cursor: pointer;
  }

  .card-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: white;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
  }

  .card-content .card-title {
    font-size: 24px;
    font-weight: 700;
    color: inherit;
    text-transform: uppercase;
  }

  .card-content .card-para {
    color: inherit;
    opacity: 0.8;
    font-size: 14px;
  }

  .card:hover {
    transform: rotateY(10deg) rotateX(10deg) scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .card:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
  }

  .card:hover:before {
    transform: translateX(-100%);
  }

  .card:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
  }

  .card:hover:after {
    transform: translateX(100%);
  }
`;

export default Card;
