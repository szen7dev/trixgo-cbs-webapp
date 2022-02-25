/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, { LatLngExpression, icon, Marker as MarketDefault } from 'leaflet'
import 'leaflet/dist/leaflet.css';

import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'

const iconDefault = icon({
	iconRetinaUrl,
	iconUrl,
	shadowUrl,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	tooltipAnchor: [16, -28],
	shadowSize: [41, 41]
});
MarketDefault.prototype.options.icon = iconDefault;

const DatahubProjectMap: FC = () => {
	const position: LatLngExpression = [21.030653, 105.847130];
	return (
		<MapContainer className="h-full" center={position} zoom={8}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
			<Marker position={[20.959902, 107.042542]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
};

export default DatahubProjectMap