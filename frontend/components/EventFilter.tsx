import axios from 'axios';
import { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import styles from '@/styles/eventFilter.module.css';
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

const customStyles: StylesConfig<OptionType, false> = {
    control: (provided) => ({
        ...provided,
        backgroundColor: '#444',
        borderColor: '#555',
        minHeight: '40px',
        boxShadow: 'none',
        borderRadius: '5px',
        padding: 0,
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#444',
        color: '#f5f5f5',
        borderRadius: '5px',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#555' : '#444',
        color: '#f5f5f5',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#f5f5f5',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#f5f5f5',
    }),
};

const EventFilter = ({ onFilter }: { onFilter: (filters: any) => void }) => {
    const [city, setCity] = useState<string>('London');
    const [date, setDate] = useState<string>(getTomorrowDate());
    const [eventType, setEventType] = useState<string>('');
    const [eventTypesOptions, setEventTypesOptions] = useState<OptionType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const response = await axiosInstance.get('/events/filters');
                const { eventTypes } = response.data;

                setEventTypesOptions([
                    { value: '', label: 'Any types' },
                    ...eventTypes.map((type: string) => ({ value: type, label: type })),
                ]);
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

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCity = e.target.value;
        setCity(newCity);
        onFilter({ city: newCity, date, eventType });
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
        <div className={styles['filter-container']}>
            <h2>Filter Events</h2>
            <input
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={handleCityChange}
                className={styles['filter-input']}
            />
            {errorMessage && <p>{errorMessage}</p>}
            <Select
                placeholder="Select Event Type"
                options={eventTypesOptions}
                onChange={handleEventTypeChange}
                value={eventTypesOptions.find(option => option.value === eventType) || null}
                className={styles['filter-select']}
                classNamePrefix="react-select"
                styles={customStyles}
            />
            <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className={styles['filter-input']}
            />
        </div>
    );
};

export default EventFilter;
