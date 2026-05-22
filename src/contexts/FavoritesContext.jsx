import { createContext } from 'react'

const FavoritesContext = createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  toggleVisited: () => {},
  isFavorite: () => false,
})

export default FavoritesContext
