/**
 * Stripe Products Configuration
 * Define all digital products and their pricing
 */

export const stripeProducts = [
  {
    id: "discord_account",
    name: "Discord Account 2015",
    description: "Premium Discord account from 2015 with verified email",
    price: 5999, // in cents
    currency: "eur",
  },
  {
    id: "spotify_premium",
    name: "Spotify Premium 3 Months",
    description: "3 months of Spotify Premium subscription",
    price: 2999,
    currency: "eur",
  },
  {
    id: "roblox_robux",
    name: "Roblox 10,000 Robux",
    description: "10,000 Robux for your Roblox account",
    price: 7999,
    currency: "eur",
  },
  {
    id: "netflix_account",
    name: "Netflix Premium Account",
    description: "Netflix Premium account with 4K streaming",
    price: 4999,
    currency: "eur",
  },
];

export function getProductById(id: string) {
  return stripeProducts.find(p => p.id === id);
}

export function getAllProducts() {
  return stripeProducts;
}
