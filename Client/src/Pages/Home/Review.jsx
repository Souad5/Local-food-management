import React from "react";
import Marquee from "react-fast-marquee";


// Example demo data
const reviews = [
  { id: 1, name: "John Doe", message: "Amazing platform!", avatar: "https://i.pravatar.cc/100?img=1", rating: 5 },
  { id: 2, name: "Jane Smith", message: "Highly recommend!", avatar: "https://i.pravatar.cc/100?img=2", rating: 4 },
  { id: 3, name: "Mike Johnson", message: "Very user-friendly.", avatar: "https://i.pravatar.cc/100?img=3", rating: 5 },
  { id: 4, name: "Anna Brown", message: "Excellent support!", avatar: "https://i.pravatar.cc/100?img=4", rating: 5 },
  { id: 5, name: "Tom Hanks", message: "Great initiative.", avatar: "https://i.pravatar.cc/100?img=5", rating: 4 },
  { id: 6, name: "Emma Watson", message: "Loved it!", avatar: "https://i.pravatar.cc/100?img=6", rating: 5 },
  { id: 7, name: "Chris Evans", message: "Very helpful.", avatar: "https://i.pravatar.cc/100?img=7", rating: 4 },
  { id: 8, name: "Sophia Lee", message: "Fantastic experience.", avatar: "https://i.pravatar.cc/100?img=8", rating: 5 },
  { id: 9, name: "Robert Downey", message: "Superb platform.", avatar: "https://i.pravatar.cc/100?img=9", rating: 5 },
  { id: 10, name: "Scarlett Johanson", message: "I loved contributing!", avatar: "https://i.pravatar.cc/100?img=10", rating: 5 },
];


const ReviewCard = ({ review }) => (
  <div className="flex-shrink-0 w-64  shadow-lg rounded-2xl p-4 m-2 flex flex-col items-center text-center border">
    <img src={review.avatar} alt={review.name} className="w-16 h-16 rounded-full mb-3 border-2 border-primary" />
    <h3 className="font-semibold ">{review.name}</h3>
    <div className="flex gap-1 mb-2">
      {Array.from({ length: review.rating }).map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.783.57-1.838-.197-1.538-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.044 9.384c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
    <p className="text-sm">{review.message}</p>
  </div>
);

const ReviewsMarquee = () => (
  <section className="py-16 ">
    <h2 className="text-3xl font-bold text-center  mb-8">
      ⭐ What People Say
    </h2>
    <div className="overflow-x-hidden">
        <Marquee>
      <div className="flex animate-marquee whitespace-nowrap">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
        {/* Repeat to create infinite scroll effect */}
        {reviews.map((review) => (
          <ReviewCard key={review.id + 10} review={review} />
        ))}
      </div></Marquee>
    </div>
  </section>
);

export default ReviewsMarquee;