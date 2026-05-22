export const DEFAULT_TRIPS = [
  {
    id: 1,
    name: 'Taj Mahal Escape',
    destination: 'Agra, India',
    startDate: '2024-06-15',
    endDate: '2024-06-20',
    days: 5,
    budget: 120000,
    spent: 65000,
    status: 'Upcoming',
    description: 'A focused Agra getaway with sunrise views of the Taj Mahal, local food, and Mughal-era landmarks.',
    activities: [
      { date: '2024-06-15', activity: 'Arrive in Agra and check into hotel' },
      { date: '2024-06-16', activity: 'Sunrise visit to Taj Mahal and Mehtab Bagh' },
      { date: '2024-06-17', activity: 'Explore Agra Fort and local markets' },
      { date: '2024-06-18', activity: 'Visit Itimad-ud-Daulah and try local food' },
      { date: '2024-06-20', activity: 'Departure from Agra' },
    ],
  },
  {
    id: 2,
    name: 'Goa Beach Break',
    destination: 'Goa, India',
    startDate: '2024-07-20',
    endDate: '2024-07-30',
    days: 10,
    budget: 180000,
    spent: 90000,
    status: 'Planning',
    description: 'A relaxed beach trip across North Goa with cafes, forts, markets, and a flexible activity plan.',
    activities: [
      { date: '2024-07-20', activity: 'Arrive in Goa and check into beach stay' },
      { date: '2024-07-21', activity: 'Visit Baga Beach and Calangute cafes' },
      { date: '2024-07-23', activity: 'Explore Fort Aguada and Panaji' },
      { date: '2024-07-26', activity: 'Dudhsagar Falls day trip' },
      { date: '2024-07-30', activity: 'Departure from Goa' },
    ],
  },
  {
    id: 3,
    name: 'Rajasthan Roadtrip',
    destination: 'Jaipur, India',
    startDate: '2024-05-01',
    endDate: '2024-05-05',
    days: 4,
    budget: 90000,
    spent: 90000,
    status: 'Completed',
    description: 'A compact Jaipur roadtrip covering heritage forts, city landmarks, local bazaars, and regional food.',
    activities: [
      { date: '2024-05-01', activity: 'Arrive in Jaipur and check into heritage hotel' },
      { date: '2024-05-02', activity: 'Explore Amber Fort and Jal Mahal' },
      { date: '2024-05-03', activity: 'City Palace tour and Hawa Mahal visit' },
      { date: '2024-05-04', activity: 'Local markets and street food walk' },
      { date: '2024-05-05', activity: 'Departure from Jaipur' },
    ],
  },
]

const STORAGE_KEY = 'travelNestTrips'

export function getSavedTrips() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

export function getAllTrips() {
  return [...DEFAULT_TRIPS, ...getSavedTrips()]
}

export function saveTrip(trip) {
  const savedTrips = getSavedTrips()
  localStorage.setItem(STORAGE_KEY, JSON.stringify([trip, ...savedTrips]))
}

export function getTripDays(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  return Number.isNaN(diffInDays) ? 1 : Math.max(diffInDays + 1, 1)
}
