import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import EventPage from './Pages/EventsPage/EventsPage';
import OrderPage from './Pages/OrderPage/OrderPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/Events' element={<EventPage/>} />
        <Route path='/Order' element={<OrderPage/>} />
      </Routes>
    </Router>
  )
}

export default App
