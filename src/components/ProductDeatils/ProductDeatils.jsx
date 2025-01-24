// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const ProductDetail = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [quantity, setQuantity] = useState(1);

//   const product = {
//     id,
//     name: 'Premium Almonds',
//     weight: '100g',
//     price: 249,
//     originalPrice: 299,
//     image: '/api/placeholder/400/400',
//     description: 'Premium quality almonds, rich in nutrients and perfect for snacking.',
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 text-gray-600 hover:text-gray-800"
//       >
//         ← Back to products
//       </button>
//       <div className="grid md:grid-cols-2 gap-8">
//         <div>
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full rounded-lg shadow-md"
//           />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//           <p className="text-gray-600 mb-4">{product.description}</p>
//           <div className="flex items-center gap-4 mb-6">
//             <span className="text-2xl font-bold text-red-500">₹{product.price}</span>
//             {product.originalPrice && (
//               <span className="text-xl text-gray-400 line-through">
//                 ₹{product.originalPrice}
//               </span>
//             )}
//           </div>
//           <div className="flex items-center gap-4 mb-6">
//             <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
//             <span>{quantity}</span>
//             <button onClick={() => setQuantity((q) => q + 1)}>+</button>
//           </div>
//           <button
//             className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
//             onClick={() => alert(`Added ${quantity} ${product.name} to cart!`)}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
