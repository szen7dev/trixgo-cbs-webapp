/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { LatLngExpression, icon, Marker as MarketDefault } from 'leaflet'
import 'leaflet/dist/leaflet.css';

import useDatahubProjects from 'services/hooks/datahub/useDatahubProjects';

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

function Markers() {
	const map = useMap();
	const { data } = useDatahubProjects(['datahub_projects_maps', ""], {
		limit: 10,
		select: '_id name location note'
	}, {
		onSuccess: (data) => {
			const locations = data.data.listRecords
				.filter(item => item.location && item.location.split(', ').length === 2)
				.map(item => item.location.split(', ').map(Number) as [number, number]);
			map.flyToBounds(locations, { duration: 1 });
		},
		refetchOnMount: true
	});

	return (
		<>
			{
				data?.data.listRecords.map((item, index) => {
					if (!item.location) return null;
					const location = item.location.split(', ').map(Number);
					if (location.length !== 2) return null;
					return (
						<Marker
							key={index}
							eventHandlers={{
								click: () => map.setView(location as LatLngExpression, 16)
							}}
							position={location as LatLngExpression}
						>
							<Popup>
								<span>{item.name}</span>
								<p>{item.note}</p>
							</Popup>
						</Marker>
					);
				})
			}
		</>
	);
}

const DatahubProjectMap: FC = () => {
	const position: LatLngExpression = [21.030653, 105.847130];
	return (
		<MapContainer className="h-full z-0" center={position} zoom={13} zoomAnimation >
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Markers />
		</MapContainer>
	);
};

export default DatahubProjectMap