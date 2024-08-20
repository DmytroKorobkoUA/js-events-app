import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '@/store/slices/eventsSlice';
import { RootState, AppDispatch } from '@/store';
import Navbar from '@/components/Navbar';
import EventFilter from '@/components/EventFilter';
import { Event } from '@/store/slices/eventsSlice';

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
    const events = useSelector((state: RootState) => state.events.events as Event[]); // Убедитесь, что тип данных правильный
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
        setDisplayFilters(filters);
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
                    {events.map((event: Event) => (
                        <li key={event.id}>
                            <h3>{event.name}</h3>
                            <p><strong>Date:</strong> {event.date}</p>
                            <p><strong>City:</strong> {event.city}</p>
                            <p><strong>Type:</strong> {event.eventType}</p>
                            {event.description && <p><strong>Description:</strong> {event.description}</p>}
                            {event.venue && <p><strong>Venue:</strong> {event.venue}</p>}
                            {event.url && <a href={event.url} target="_blank" rel="noopener noreferrer">More Info</a>}
                            {event.imageUrl && <img src={event.imageUrl} alt={event.name} width={200} />}
                            {event.priceRange && <p><strong>Price Range:</strong> {event.priceRange}</p>}
                            {event.audience && <p><strong>Audience:</strong> {event.audience}</p>}
                        </li>
                    ))}
                </ul>
            )}
            {handleErrorMessage() && <p>{handleErrorMessage()}</p>}
        </div>
    );
};

export default Events;
