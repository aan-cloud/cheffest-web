# Cheffest Frontend Documentation

## Overview
Cheffest Frontend is a web application built with React and TailwindCSS. It provides a seamless user experience for browsing food items, adding them to the cart, and managing orders.

## Tech Stack
- **Framework:** React (Vite)
- **UI Library:** TailwindCSS
- **State Management:** React Context (if applicable)
- **Routing:** React Router v7
- **Animations:** Framer Motion (if used)
- **API Communication:** Fetch API with JWT authentication
- **Notifications:** React-toastify

## Project Structure
```
cheffest-frontend/
│── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components for routing
│   ├── hooks/             # Custom hooks
│   ├── context/           # Context providers
│   ├── utils/             # Utility functions
│   ├── assets/            # Images and static assets
│   ├── App.tsx            # Main application file
│   ├── main.tsx           # Entry point
│   ├── routes.tsx         # React Router configuration
│── public/                # Static files
│── package.json           # Dependencies and scripts
│── tailwind.config.js     # TailwindCSS configuration
│── vite.config.ts         # Vite configuration
```

## Installation & Setup
### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Steps to Run Locally
```sh
git clone https://github.com/your-repo/cheffest-frontend.git
cd cheffest-frontend
npm install  # or yarn install
npm run dev  # or yarn dev
```
The app will be available at `http://localhost:5173/` (default Vite port).

## Features
### 1. Authentication
- JWT-based authentication.
- Users can log in and maintain session via cookies.

### 2. Product Listing
- Fetches food items from the API.
- Displays name, price, description, and image.

### 3. Cart Management
- Users can add food to the cart.
- `addFoodToCart` function sends a POST request to the API:
  ```ts
  async function addFoodToCart(product: Food) {
      const token = document.cookie
        ?.split('; ')
        .find((row) => row.startsWith('jwt='))
        ?.split('=')[1];
    
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/${product.id}`, {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ sum: 1 })
      });
      
      if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
      }
      
      const data: FoodToCart = await res.json();
      toast(`${data.productName} added to cart.`);
  }
  ```
- The cart updates after successful API response.

### 4. Navigation
- Uses `NavLink` from React Router v7 to maintain active styles:
  ```tsx
  <NavLink to="/cart" className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-gray-300"}>
      Cart
  </NavLink>
  ```

### 5. Animations
- Components fade in when entering the viewport using Framer Motion:
  ```tsx
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <ProductCard product={product} />
  </motion.div>
  ```

## Environment Variables
Create a `.env` file in the root directory and add:
```
VITE_API_URL=https://your-api-url.com
```

## Deployment
- Hosted on **Vercel** (or any other platform).
- Use `npm run build` to create a production-ready build.

## Troubleshooting
- **Animation not triggering?** Ensure Framer Motion is installed and correctly wrapped.
- **API requests failing?** Check `VITE_API_URL` in `.env` and browser console errors.
- **JWT authentication not working?** Ensure the token is stored and sent correctly.

## License
MIT License

