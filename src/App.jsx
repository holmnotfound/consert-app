import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/icons.js'
import LandingPage from './Pages/LandingPage/LandingPage';
import EventPage from './Pages/EventsPage/EventsPage';
import OrderPage from './Pages/OrderPage/OrderPage';
import EventDetailPage from './Pages/EventDetailPage/EventDetailPage.jsx';
import TicketPage from './Pages/TicketPage/TicketPage.jsx';

function App() {

  return (
    <Router>
      <Routes>
      <Route path='/' element={<LandingPage />} />
        <Route path='/Events' element={<EventPage />} />
        <Route path='/Events/:id' element={<EventDetailPage />} />
        <Route path='/Order' element={<OrderPage />} />
        <Route path='/Ticket' element={<TicketPage />} />
      </Routes>
    </Router>
  )
}

export default App
