import { error } from '@sveltejs/kit';
import { SERVER_URL } from '$env/static/private';
import type TVSeries from '$types/TVSeries';

export async function load({ params }) {
    const BASE_URL: String = SERVER_URL

    const response = await fetch(`${BASE_URL}/series/${params.id}`);

    if (response.status !== 200) error(response.status);

    const series: TVSeries = await response.json();

    return {
        series
    };
}