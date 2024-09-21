// import css from'./App.css';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Container from './components/Container/Container';
// import EventsBoardPage from './pages/EventsBoardPage/EventsBoardPage';

const EventsBoardPage = lazy(() => import('./pages/EventsBoardPage/EventsBoardPage'));
const EventsRegistrationPage = lazy(() => import('./pages/EventsRegistrationPage/EventsRegistrationPage'));
const EventsParticipantsPage = lazy(() => import('./pages/EventsParticipantsPage/EventsParticipantsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));


function App() {
  return (
    <Container>
      {''}
      <Routes>
        <Route path='/' element={<EventsBoardPage/>} />
        <Route path='/register/:id' element={<EventsRegistrationPage/> } />
        <Route path='/view/:id' element={<EventsParticipantsPage/> } />
        <Route path='*' element={<NotFoundPage/> } />
      </Routes>
    </Container>
  );
}

export default App;
