import { PUBLIC_MAPBOX } from '$env/static/public';
import type { LngLatLike } from 'mapbox-gl';

export const revGeoCode = async (address: string): Promise<LngLatLike> => {
	const businessAndAddressRegex =
		/\b\d+\s+[a-zA-Z0-9\s.,-]+,\s*[a-zA-Z\s]+\s*,\s*[a-zA-Z]+\s*\d{5}(?:-\d{4})?\s*,\s*[a-zA-Z]+\b/;
	const parsedAddress: RegExpMatchArray | null = address.match(businessAndAddressRegex)
	if(parsedAddress !== null){
		const locationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ parsedAddress }.json?types=address&access_token=${PUBLIC_MAPBOX}`;	
		let req = await (await fetch(locationURL, { method: 'GET' })).json();
		return req.features[0].center as LngLatLike
	}

	return [29.951065, -90.071533] as LngLatLike;
};
