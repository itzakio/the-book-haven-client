import React from 'react';
import { Link } from 'react-router';

const MyTableRow = ({book, index}) => {
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

                <td className="text-center space-x-4">
                  <Link
                    to={`/book-details/${book?.id}`}
                    className="btn btn-sm rounded-none btn-outline btn-primary"
                  >
                    Update
                  </Link>
                  <button className="btn btn-sm rounded-none hover:text-white btn-outline btn-error">
                    Delete
                  </button>
                </td>
              </tr>
    );
};

export default MyTableRow;