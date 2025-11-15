import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router";

const MyTableRow = ({ book, index, location }) => {
  return (
    <tr key={book?.id || index} className="hover">
      <th>{index + 1}</th>

      <td>
        <img
          src={book?.coverImage}
          alt={book?.title}
          className="w-14 h-20 object-cover rounded-md shadow"
        />
      </td>

      <td className="font-semibold">{book?.title}</td>

      <td>{book?.author}</td>

      <td>
        <span className="badge badge-primary badge-sm text-white">
          {book?.genre}
        </span>
      </td>

      <td className="font-semibold">{book?.rating} ⭐</td>

      <td>
        <div className="flex justify-center items-center gap-6 text-primary">
          <Link state={location.pathname} className="tooltip" data-tip="View Details" to={`/book-details/${book?._id}`}>
            <TbListDetails size={24}/>
          </Link>
          <Link state={location.pathname} className="tooltip" data-tip="Edit Book" to={`/update-book/${book?._id}`}>
            <FaEdit size={24} />
          </Link>
          <button data-tip="Delete Book" className="text-red-500 cursor-pointer tooltip">
            <MdDeleteForever size={30} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MyTableRow;
