import { error } from '@sveltejs/kit';

interface TVSeries {
    id: number
    title: string
    type: string
    isMiniseries: boolean
    status: string
    poster_path: string
}
  
export async function load({ params }) {
    const BASE_URL: String = "http://localhost:3000"
    
    const response = await fetch(`${BASE_URL}/series/${params.id}`);
    const series: TVSeries = await response.json(); // Parses JSON response into TVSeries object, assuming the data conforms to the interface

	if (response.status !== 200) error(response.status);

	return {
		series
	};
}