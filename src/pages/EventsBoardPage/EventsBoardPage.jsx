import { getEvents } from '../../apiService/events';
import EventsList from '../../components/EventsList/EventsList';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';

const EventsBoardPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const results = await getEvents(page, limit);
        setEvents(results);
        const totalEvents = 30; 
        setTotalPages(Math.ceil(totalEvents / limit)); 
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h1>Events</h1>
      {isLoading && <Loader />}
      {error && <p>Ops something wrong...</p>}
      {events.length > 0 && (
        <div>
          <EventsList events={events} />

          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page}</span>
            <button onClick={handleNextPage} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsBoardPage;
