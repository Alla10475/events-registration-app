import { useEffect, useState } from 'react';
import { getParticipants } from '../../apiService/register';
import { useParams } from 'react-router-dom';
import ParticipantsList from '../../components/ParticipantsList/ParticipantsList';
import Loader from '../../components/Loader/Loader';

const EventsParticipantsPage = () => {
  const { id } = useParams();
  console.log(`ViewID: ${id}`)

  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const results = await getParticipants();
        const data = results.filter(item => item.eventId === id)
        setParticipants(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <h2>&apos;Awesome Event&apos; participants</h2>
      {isLoading && <Loader />}
      {error && <p>Ops something wrong...</p>}
      {participants.length > 0 && (
        <ParticipantsList participants={participants} />
      )}
    </>
  );
};

export default EventsParticipantsPage;
