import { error } from '@sveltejs/kit';
import { SERVER_URL } from '$env/static/private';
import type TVSeries from '$types/TVSeries';

export async function load({ params }) {
    const BASE_URL: String = SERVER_URL

    const response = await fetch(`${BASE_URL}/series/${params.id}`);
    const series: TVSeries = await response.json(); // Parses JSON response into TVSeries object, assuming the data conforms to the interface

    if (response.status !== 200) error(response.status);

    return {
        series
    };
}