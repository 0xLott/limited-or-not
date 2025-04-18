import { SERVER_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type TVSeries from '$types/TVSeries';

export async function load({ params }) {
    const BASE_URL: String = SERVER_URL

    const query = decodeURIComponent(params.query)
    const response = await fetch(`${BASE_URL}/search/${query})}`);
    const searchResults: TVSeries[] = await response.json();

    if (response.status !== 200) error(response.status);

    return {
        query,
        searchResults
    };
}