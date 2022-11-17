import axios from 'axios';
import { LocationResponse } from '../interfaces';

class LocationService {
    url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address';

    async getCity(): Promise<string> {
        const res = await axios.get<LocationResponse>(this.url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + process.env.NEXT_PUBLIC_DADATA_API_KEY
            }
        });
        return res.data.location ? res.data.location.value : 'г Санкт-Петербург';
    }
}

export default new LocationService();