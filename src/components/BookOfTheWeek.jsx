import { Link } from "react-router";

const bookOfTheWeek = [
  {
    id: 1,
    title: "The Silent Observer",
    author: "Lena Hart",
    genre: "Thriller",
    rating: 4.8,
    image: "https://i.postimg.cc/1tZLdXp5/The-Silent-Observer.jpg",
    description:
      "A gripping psychological thriller that uncovers hidden secrets buried deep inside a quiet suburban town.",
  },
  {
    id: 2,
    title: "Winds of Eternity",
    author: "Caleb Rowan",
    genre: "Fantasy",
    rating: 4.7,
    image: "https://i.postimg.cc/Y9wJP01C/Winds-of-Eternity.jpg",
    description:
      "An epic fantasy adventure filled with magic, ancient prophecies, and unforgettable characters.",
  },
 {
  id: 3,
  title: "Shadows Beneath the Lantern",
  author: "Harper Lin",
  genre: "Mystery / Suspense",
  rating: 4.9,
  image: "https://i.postimg.cc/0QqL4jp9/Shadows-Beneath-the-Lantern.jpg",
  description:
    "A tense and atmospheric mystery set in an old riverside town where secrets refuse to stay buried.",
}
];



const BookOfTheWeek = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="headline">
        Book of the Week
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 margin-top">
        {bookOfTheWeek.map((book) => (
          <div
            key={book.id}
            className="group bg-base-100 shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative h-72 overflow-hidden bg-white/50">
              <img
                src={book.image}
                className="py-4 mx-auto h-full  group-hover:scale-110 transition-transform duration-700"
                alt={book.title}
              />
              <span className="absolute top-3 left-3 bg-green-100 text-primary text-xs px-3 py-1 rounded-full shadow">
                ⭐ {book.rating}
              </span>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold group-hover:text-primary transition">
                {book.title}
              </h3>
              <p className="text-sm text-accent mt-1">By {book.author}</p>

              <p className="text-sm mt-3 text-accent line-clamp-3">
                {book.summary}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs px-2 py-1 bg-green-100 text-primary ">
                  {book.genre}
                </span>

                <Link
                 
                  className="btn btn-sm rounded-none btn-outline btn-primary"
                >
                 View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookOfTheWeek;
