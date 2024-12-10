import axios from 'axios';
import { Company } from '../interface/Company';

const API_URL = 'http://localhost:3001/api/items';
export const getItems = async (): Promise<Company[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data.items;
    } catch (error) {
        console.error('Error fetching companies data:', error);
        throw error;
    }
};
