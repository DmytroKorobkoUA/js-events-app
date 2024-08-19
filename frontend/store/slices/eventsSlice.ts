import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface FetchEventsFilters {
    city: string;
    date: string;
    eventType?: string;
}

interface EventResponse {
    events: any[];
}

interface FetchEventsError {
    message: string;
}

export const fetchEvents = createAsyncThunk<any[], FetchEventsFilters, { rejectValue: FetchEventsError }>(
    'events/fetchEvents',
    async (filters: FetchEventsFilters, thunkAPI) => {
        const { city, date, eventType } = filters;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const queryParams = new URLSearchParams({
            city,
            date,
            eventType: eventType || '',
        }).toString();

        try {
            const response = await axios.get<any[]>(`${apiUrl}/events?${queryParams}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data?.message || 'An error occurred' });
            }
            return thunkAPI.rejectWithValue({ message: 'An unexpected error occurred' });
        }
    }
);

interface EventState {
    events: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: EventState = {
    events: [],
    status: 'idle',
    error: null,
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'An unexpected error occurred';
            });
    },
});

export default eventsSlice.reducer;