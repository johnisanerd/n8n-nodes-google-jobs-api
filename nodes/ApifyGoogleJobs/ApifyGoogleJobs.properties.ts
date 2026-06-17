import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only the real Actor inputs are sent; the Output / Fields parameters shape the
 * data we return, they are not part of the Actor input. Optional text fields are
 * only sent when the user provides a value so the Actor keeps its own defaults.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	const input: Record<string, any> = {
		...defaultInput,
		query: context.getNodeParameter('query', itemIndex),
		num_results: context.getNodeParameter('num_results', itemIndex),
		max_pagination: context.getNodeParameter('max_pagination', itemIndex),
	};

	const location = context.getNodeParameter('location', itemIndex, '') as string;
	const country = context.getNodeParameter('country', itemIndex, '') as string;
	const language = context.getNodeParameter('language', itemIndex, '') as string;
	const googleDomain = context.getNodeParameter('google_domain', itemIndex, '') as string;

	if (location) input.location = location;
	if (country) input.country = country;
	if (language) input.language = language;
	if (googleDomain) input.google_domain = googleDomain;

	return input;
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Job',
				value: 'job',
			},
		],
		default: 'job',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['job'],
			},
		},
		options: [
			{
				name: 'Search',
				value: 'search',
				action: 'Search job listings',
				description: 'Search job listings and return jobs with companies, locations, and apply links',
			},
		],
		default: 'search',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'Search Query',
		name: 'query',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. software engineer',
		description: 'Job title, keywords, or company to search for',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Location',
		name: 'location',
		type: 'string',
		default: '',
		placeholder: 'e.g. Austin, TX',
		description: 'City, state, or region to search within. Leave empty to search everywhere.',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Country Code',
		name: 'country',
		type: 'string',
		default: '',
		placeholder: 'e.g. us',
		description: 'Two-letter country code that sets which country the search runs from',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Language Code',
		name: 'language',
		type: 'string',
		default: '',
		placeholder: 'e.g. en',
		description: 'Two-letter language code for the results',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Google Domain',
		name: 'google_domain',
		type: 'string',
		default: 'google.com',
		placeholder: 'e.g. google.com',
		description: 'Which Google domain to query',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Number of Results',
		name: 'num_results',
		type: 'number',
		default: 10,
		typeOptions: {
			minValue: 1,
		},
		description: 'How many job listings to return',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Maximum Pages',
		name: 'max_pagination',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		description: 'How many additional result pages to follow. Use 0 for the first page only.',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['search'],
			},
		},
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['search'],
			},
		},
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the API produces for each job',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return a compact set of the most useful job fields',
			},
		],
		default: 'simplified',
		description: 'How much data to return for each job',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['search'],
				output: ['selected'],
			},
		},
		options: [
			{ name: 'Apply Options', value: 'apply_options' },
			{ name: 'Company Name', value: 'company_name' },
			{ name: 'Country', value: 'country' },
			{ name: 'Description', value: 'description' },
			{ name: 'Detected Extensions', value: 'detected_extensions' },
			{ name: 'Extensions', value: 'extensions' },
			{ name: 'Google Domain', value: 'google_domain' },
			{ name: 'Job ID', value: 'job_id' },
			{ name: 'Job Title', value: 'job_title' },
			{ name: 'Language', value: 'language' },
			{ name: 'Location', value: 'location' },
			{ name: 'Pages Processed', value: 'pages_processed' },
			{ name: 'Query', value: 'query' },
			{ name: 'Search Timestamp', value: 'search_timestamp' },
			{ name: 'Share Link', value: 'share_link' },
			{ name: 'Source Link', value: 'source_link' },
			{ name: 'Title', value: 'title' },
			{ name: 'Total Jobs Found', value: 'total_jobs_found' },
			{ name: 'Via', value: 'via' },
		],
		default: ['title', 'company_name', 'location', 'via'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
