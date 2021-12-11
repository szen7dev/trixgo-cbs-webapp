export interface IPackage {
	id: number | string
	title: string | number
}
export interface IProjects {
	id: number|string
	content: string
	publisher: string
	created_by: string
	created_at: string
	code: string
	count: number
	signed: boolean
	require_response: boolean
	note: string | null | undefined
	address: string
}