import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import axiosInstance from '../axiosInstance';

const getTomorrowDate = (): string => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
};

interface OptionType {
    value: string;
    label: string;
}

const EventFilter = ({ onFilter }: { onFilter: (filters: any) => void }) => {
    const [city, setCity] = useState<string>('');
    const [date, setDate] = useState<string>(getTomorrowDate());
    const [eventType, setEventType] = useState<string>('');
    const [eventTypesOptions, setEventTypesOptions] = useState<OptionType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const response = await axiosInstance.get('/events/filters');
                const { eventTypes } = response.data;

                setEventTypesOptions(eventTypes.map((type: string) => ({ value: type, label: type })));
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setErrorMessage(error.response?.data?.message || 'An error occurred');
                } else {
                    setErrorMessage('An unexpected error occurred');
                }
            }
        };

        fetchFilters();
    }, []);

    const handleCityChange = async (selectedOption: OptionType | null) => {
        const selectedCity = selectedOption ? selectedOption.value : '';
        setCity(selectedCity);

        try {
            await axiosInstance.get('/events', {
                params: { city: selectedCity, date, eventType }
            });
            setErrorMessage(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data?.message || 'An error occurred');
            } else {
                setErrorMessage('An unexpected error occurred');
            }
        }

        onFilter({ city: selectedCity, date, eventType });
    };

    const handleEventTypeChange = (selectedOption: OptionType | null) => {
        const selectedEventType = selectedOption ? selectedOption.value : '';
        setEventType(selectedEventType);
        onFilter({ city, date, eventType: selectedEventType });
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value || getTomorrowDate();
        setDate(newDate);
        onFilter({ city, date: newDate, eventType });
    };

    return (
        <div>
            <h2>Filter Events</h2>
            <input
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => handleCityChange({ value: e.target.value, label: e.target.value })}
            />
            {errorMessage && <p>{errorMessage}</p>}
            <Select
                placeholder="Select Event Type"
                options={eventTypesOptions}
                onChange={handleEventTypeChange}
                value={eventTypesOptions.find(option => option.value === eventType) || null}
            />
            <input
                type="date"
                value={date}
                onChange={handleDateChange}
            />
            <button onClick={() => onFilter({ city, date, eventType })}>Apply Filter</button>
        </div>
    );
};

export default EventFilter;