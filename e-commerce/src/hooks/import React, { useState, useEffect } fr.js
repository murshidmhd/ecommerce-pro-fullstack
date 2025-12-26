// import React, { useState, useEffect } from "react";
// import slide1 from "../assets/slide images/1.png";
// import slide2 from "../assets/slide images/2.png";
// import slide3 from "../assets/slide images/3.png";

// const images = [slide1, slide2, slide3];

// const ImageSlider = () => {
//   const [current, setCurrent] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   // Auto-advance every 5 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       nextSlide();
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const prevSlide = () => {
//     setIsTransitioning(true);
//     setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1));
//     setTimeout(() => setIsTransitioning(false), 1000);
//   };

//   const nextSlide = () => {
//     setIsTransitioning(true);
//     setCurrent(prev => (prev + 1) % images.length);
//     setTimeout(() => setIsTransitioning(false), 1000);
//   };

//   const goToSlide = (index) => {
//     if (index === current) return;
//     setIsTransitioning(true);
//     setCurrent(index);
//     setTimeout(() => setIsTransitioning(false), 1000);
//   };

//   return (
//     <div className="relative w-full max-w-6xl mx-auto h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl">
//       {/* Slides with gradient overlay */}
//       {images.map((img, idx) => (
//         <div
//           key={idx}
//           className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
//             idx === current ? "opacity-100 z-20" : "opacity-0 z-10"
//           }`}
//         >
//           <img
//             src={img}
//             alt={`slide-${idx + 1}`}
//             className="w-full h-full object-cover"
//           />
//           {/* Gradient overlay for better text readability */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//         </div>
//       ))}

//       {/* Content Overlay */}
//       <div className="absolute inset-0 z-30 flex items-center">
//         <div className="container mx-auto px-8 text-white">
//           <div className="max-w-2xl">
//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
//               Discover Your Next Favorite Book
//             </h2>
//             <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-delayed">
//               Explore our curated collection of bestsellers, classics, and hidden gems
//             </p>
//             <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-more-delayed">
//               Shop Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Prev/Next Buttons */}
//       <button
//         onClick={prevSlide}
//         disabled={isTransitioning}
//         className="absolute left-6 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110 disabled:opacity-50"
//         aria-label="Previous Slide"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>
//       <button
//         onClick={nextSlide}
//         disabled={isTransitioning}
//         className="absolute right-6 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110 disabled:opacity-50"
//         aria-label="Next Slide"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>

//       {/* Progress Bar */}
//       <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-48 h-1 bg-white/30 rounded-full overflow-hidden">
//         <div 
//           className="h-full bg-cyan-400 transition-all duration-5000 ease-linear"
//           style={{ width: isTransitioning ? '100%' : '0%' }}
//           key={current}
//         ></div>
//       </div>

//       {/* Dot Indicators */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex space-x-3">
//         {images.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => goToSlide(idx)}
//             disabled={isTransitioning}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               idx === current 
//                 ? "bg-cyan-400 scale-125" 
//                 : "bg-white/60 hover:bg-white/80 hover:scale-110"
//             }`}
//             aria-label={`Go to slide ${idx + 1}`}
//           />
//         ))}
//       </div>

//       {/* Slide Counter */}
//       <div className="absolute bottom-8 right-8 z-40 text-white/80 text-sm font-medium">
//         {current + 1} / {images.length}
//       </div>

//       {/* Custom animations */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in {
//           animation: fadeIn 1s ease-out;
//         }
//         .animate-fade-in-delayed {
//           animation: fadeIn 1s ease-out 0.3s both;
//         }
//         .animate-fade-in-more-delayed {
//           animation: fadeIn 1s ease-out 0.6s both;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ImageSlider;