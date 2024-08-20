import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '@/store/slices/eventsSlice';
import { RootState, AppDispatch } from '@/store';
import Navbar from '@/components/Navbar';
import EventFilter from '@/components/EventFilter';

interface Filters {
    city: string;
    date: string;
    eventType: string;
}

const getTomorrowDate = (): string => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
};

const Events = () => {
    const isAuthenticated = useAuth();
    const dispatch = useDispatch<AppDispatch>();
    const events = useSelector((state: RootState) => state.events.events);
    const eventStatus = useSelector((state: RootState) => state.events.status);
    const errorMessage = useSelector((state: RootState) => state.events.error);
    const [filters, setFilters] = useState<Filters>({
        city: 'London',
        date: getTomorrowDate(),
        eventType: '',
    });

    const [displayFilters, setDisplayFilters] = useState<Filters>(filters);

    const handleFilter = (newFilters: Filters) => {
        setFilters(newFilters);
    };

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchEvents(filters));
        }
    }, [dispatch, isAuthenticated]);

    const applyFilters = () => {
        setDisplayFilters(filters); // Обновляем отображаемые фильтры
        dispatch(fetchEvents(filters));
    };

    const handleErrorMessage = () => {
        if (eventStatus === 'failed') {
            return errorMessage || 'Failed to fetch events';
        }
        return null;
    };

    const filterMessage = () => {
        const { city, date, eventType } = displayFilters;
        let message = `Showing events in ${city} on ${date}`;

        if (eventType) message += `, for ${eventType} events`;

        return message;
    };

    return (
        <div className="events-container">
            <Navbar />
            <h1>Events</h1>

            <EventFilter onFilter={handleFilter} />

            <button onClick={applyFilters} disabled={eventStatus === 'loading'}>
                Apply Filter
            </button>

            <p>{filterMessage()}</p>
            {eventStatus === 'loading' && <p>Loading...</p>}
            {eventStatus === 'succeeded' && (
                <ul>
                    {events.map((event: any) => (
                        <li key={event.id}>{event.name}</li>
                    ))}
                </ul>
            )}
            {handleErrorMessage() && <p>{handleErrorMessage()}</p>}
        </div>
    );
};

export default Events;
