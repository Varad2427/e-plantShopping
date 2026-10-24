
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b87?w=500', description: 'Easy-care plant for indoor spaces.', cost: '$15.00' },
      { name: 'Peace Lily', image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=500', description: 'Elegant foliage for your home.', cost: '$18.00' },
      { name: 'Spider Plant', image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=500', description: 'A classic, adaptable houseplant.', cost: '$12.00' },
      { name: 'Areca Palm', image: 'https://images.unsplash.com/photo-1597055181300-a8e1c7b2c2c4?w=500', description: 'Adds a tropical touch indoors.', cost: '$22.00' },
      { name: 'Rubber Plant', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500', description: 'Glossy leaves and bold character.', cost: '$20.00' },
      { name: 'Boston Fern', image: 'https://images.unsplash.com/photo-1597055181300-a8e1c7b2c2c4?w=500', description: 'Lush greenery for bright rooms.', cost: '$16.00' },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=500', description: 'Fragrant foliage and purple blooms.', cost: '$14.00' },
      { name: 'Rosemary', image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=500', description: 'Aromatic herb for sunny windowsills.', cost: '$10.00' },
      { name: 'Mint', image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=500', description: 'Fresh fragrance and bright leaves.', cost: '$8.00' },
      { name: 'Basil', image: 'https://images.unsplash.com/photo-1618375569909-3c8616b7f5e2?w=500', description: 'A useful and fragrant kitchen herb.', cost: '$9.00' },
      { name: 'Jasmine', image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=500', description: 'Delicate flowers with sweet fragrance.', cost: '$17.00' },
      { name: 'Lemon Balm', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500', description: 'Fresh citrus-scented leaves.', cost: '$11.00' },
    ],
  },
  {
    category: 'Medicinal Plants',
    plants: [
      { name: 'Aloe Vera', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500', description: 'A popular succulent for sunny spots.', cost: '$13.00' },
      { name: 'Tulsi', image: 'https://images.unsplash.com/photo-1618375569909-3c8616b7f5e2?w=500', description: 'A fragrant plant traditionally valued in gardens.', cost: '$10.00' },
      { name: 'Chamomile', image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=500', description: 'A flowering plant with a gentle appearance.', cost: '$12.00' },
      { name: 'Calendula', image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=500', description: 'Bright flowers for a sunny spot.', cost: '$11.00' },
      { name: 'Lemongrass', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500', description: 'Aromatic grass with a citrus scent.', cost: '$14.00' },
      { name: 'Echinacea', image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b87?w=500', description: 'A colorful flowering plant.', cost: '$16.00' },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((previous) => ({
      ...previous,
      [plant.name]: true,
    }));
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  const handleCartClick = (event) => {
    event.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (event) => {
    event.preventDefault();
    setShowCart(false);
  };

  const handleHome = (event) => {
    event.preventDefault();
    onHomeClick();
  };

  return (
    <div className="product-list-page">
      <nav className="navbar">
        <div className="navbar-title">
          <a href="#" onClick={handleHome}>Paradise Nursery</a>
        </div>

        <div className="navbar-links">
          <a href="#" onClick={handleHome}>Home</a>
          <a href="#" onClick={handlePlantsClick}>Plants</a>
          <a href="#" onClick={handleCartClick}>
            <span role="img" aria-label="shopping cart">🛒</span>
            <span className="cart-count">{cartQuantity}</span>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        <main className="product-grid">
          {plantsArray.map((category) => (
            <section className="plant-category" key={category.category}>
              <h2>{category.category}</h2>

              <div className="category-grid">
                {category.plants.map((plant) => {
                  const isAdded =
                    cartItems.some((item) => item.name === plant.name) ||
                    addedToCart[plant.name];

                  return (
                    <article className="plant-card" key={plant.name}>
                      <img
                        className="plant-image"
                        src={plant.image}
                        alt={plant.name}
                      />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p className="plant-cost">{plant.cost}</p>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(plant)}
                        disabled={Boolean(isAdded)}
                      >
                        {isAdded ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}

export default ProductList;
