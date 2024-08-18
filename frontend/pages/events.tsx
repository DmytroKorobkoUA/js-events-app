import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '@/store/slices/eventsSlice';
import { RootState } from '@/store';
import Navbar from '@/components/Navbar';

const Events = () => {
    const isAuthenticated = useAuth();
    const dispatch = useDispatch();
    const events = useSelector((state: RootState) => state.events.events);
    const eventStatus = useSelector((state: RootState) => state.events.status);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchEvents({ city: 'London', date: '2024-09-01' }) as any);
        }
    }, [dispatch, isAuthenticated]);

    return (
        <div>
            <Navbar />
            <h1>Events in London</h1>
            {eventStatus === 'loading' && <p>Loading...</p>}
            {eventStatus === 'succeeded' && (
                <ul>
                    {events.map((event: any) => (
                        <li key={event.id}>{event.name}</li>
                    ))}
                </ul>
            )}
            {eventStatus === 'failed' && <p>Failed to fetch events</p>}
        </div>
    );
};

export default Events;
