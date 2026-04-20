/**
 * Structured Data (JSON-LD) Utility Functions
 * 
 * Generates Schema.org JSON-LD structured data for SEO.
 * All schemas follow Google's structured data guidelines.
 */

export interface FaqItem {
	question: string;
	answer: string;
}

export interface BreadcrumbItem {
	name: string;
	url: string;
}

export interface BlogPostData {
	headline: string;
	description: string;
	url: string;
	datePublished: string;
	dateModified?: string;
	authorName?: string;
	imageUrl?: string;
}

/**
 * Business information used across all schemas.
 * Update this object with actual business details.
 */
export const BUSINESS_INFO = {
	name: 'Site Name',
	legalName: 'Site Legal Name',
	description: 'Replace this structured data with the current business description before launch.',
	url: 'https://site.com',
	logo: 'https://site.com/assets/logo.png',
	telephone: '+1-000-000-0000',
	email: 'info@site.com',
	address: {
		streetAddress: '123 Main St',
		addressLocality: 'City',
		addressRegion: 'ST',
		postalCode: '00000',
		addressCountry: 'US'
	},
	geo: {
		latitude: 0,
		longitude: 0
	},
	areaServed: [
		'Primary Service Area'
	],
	serviceArea: {
		'@type': 'GeoCircle',
		'geoMidpoint': {
			'@type': 'GeoCoordinates',
			'latitude': 25.5961,
			'longitude': -80.3797
		},
		'geoRadius': '50'
	},
	priceRange: '$$$',
	openingHours: [
		'Mo-Fr 08:00-18:00',
		'Sa 09:00-15:00'
	],
	sameAs: [
		// TODO: Add social media profiles
		// 'https://www.facebook.com/your-brand',
		// 'https://www.instagram.com/your-brand',
		// 'https://www.linkedin.com/company/your-brand'
	]
};

/**
 * Generates LocalBusiness schema (sitewide).
 * Should be included on every page to establish the primary business entity.
 */
export function generateLocalBusinessSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		'@id': `${BUSINESS_INFO.url}#organization`,
		name: BUSINESS_INFO.name,
		legalName: BUSINESS_INFO.legalName,
		description: BUSINESS_INFO.description,
		url: BUSINESS_INFO.url,
		logo: BUSINESS_INFO.logo,
		image: BUSINESS_INFO.logo,
		telephone: BUSINESS_INFO.telephone,
		email: BUSINESS_INFO.email,
		priceRange: BUSINESS_INFO.priceRange,
		address: {
			'@type': 'PostalAddress',
			...BUSINESS_INFO.address
		},
		geo: {
			'@type': 'GeoCoordinates',
			...BUSINESS_INFO.geo
		},
		areaServed: BUSINESS_INFO.areaServed.map(area => ({
			'@type': 'City',
			name: area
		})),
		serviceArea: BUSINESS_INFO.serviceArea,
		openingHoursSpecification: BUSINESS_INFO.openingHours.map(hours => {
			const [days, times] = hours.split(' ');
			const [opens, closes] = times.split('-');
			
			return {
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: expandDayRange(days),
				opens,
				closes
			};
		}),
		...(BUSINESS_INFO.sameAs.length > 0 && { sameAs: BUSINESS_INFO.sameAs })
	};
}

/**
 * Helper to expand day ranges like "Mo-Fr" to individual days.
 */
function expandDayRange(dayRange: string): string | string[] {
	const dayMap: Record<string, string> = {
		'Mo': 'Monday',
		'Tu': 'Tuesday',
		'We': 'Wednesday',
		'Th': 'Thursday',
		'Fr': 'Friday',
		'Sa': 'Saturday',
		'Su': 'Sunday'
	};

	if (dayRange.includes('-')) {
		const [start, end] = dayRange.split('-');
		const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
		const startIdx = days.indexOf(start);
		const endIdx = days.indexOf(end);
		
		return days.slice(startIdx, endIdx + 1).map(d => dayMap[d]);
	}

	return dayMap[dayRange] || dayRange;
}

/**
 * Generates WebSite schema (homepage only).
 * Enables sitelinks search box in Google results.
 */
export function generateWebSiteSchema(siteUrl: string = BUSINESS_INFO.url) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${siteUrl}#website`,
		url: siteUrl,
		name: BUSINESS_INFO.name,
		description: BUSINESS_INFO.description,
		publisher: {
			'@id': `${BUSINESS_INFO.url}#organization`
		},
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${siteUrl}/search?q={search_term_string}`
			},
			'query-input': 'required name=search_term_string'
		}
	};
}

/**
 * Generates WebPage schema.
 * Should be included on all pages except the homepage (which uses WebSite).
 */
export function generateWebPageSchema({
	url,
	name,
	description,
	datePublished,
	dateModified
}: {
	url: string;
	name: string;
	description: string;
	datePublished?: string;
	dateModified?: string;
}) {
	const schema: any = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${url}#webpage`,
		url,
		name,
		description,
		isPartOf: {
			'@id': `${BUSINESS_INFO.url}#website`
		},
		about: {
			'@id': `${BUSINESS_INFO.url}#organization`
		},
		primaryImageOfPage: {
			'@type': 'ImageObject',
			url: BUSINESS_INFO.logo
		}
	};

	if (datePublished) {
		schema.datePublished = datePublished;
	}

	if (dateModified) {
		schema.dateModified = dateModified;
	}

	return schema;
}

/**
 * Generates BreadcrumbList schema.
 * Should match the visible breadcrumb navigation exactly.
 */
export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbs.map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.name,
			item: crumb.url
		}))
	};
}

/**
 * Generates BlogPosting schema for blog posts.
 * Includes article metadata for editorial content.
 */
export function generateBlogPostingSchema({
	headline,
	description,
	url,
	datePublished,
	dateModified,
	authorName = BUSINESS_INFO.name,
	imageUrl = BUSINESS_INFO.logo
}: BlogPostData) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		'@id': `${url}#article`,
		headline,
		description,
		url,
		datePublished,
		dateModified: dateModified || datePublished,
		author: {
			'@type': 'Organization',
			'@id': `${BUSINESS_INFO.url}#organization`,
			name: authorName
		},
		publisher: {
			'@type': 'Organization',
			'@id': `${BUSINESS_INFO.url}#organization`,
			name: BUSINESS_INFO.name,
			logo: {
				'@type': 'ImageObject',
				url: BUSINESS_INFO.logo
			}
		},
		image: {
			'@type': 'ImageObject',
			url: imageUrl
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url
		}
	};
}

/**
 * Generates FAQPage schema.
 * ONLY use this where FAQ content is visible on the page.
 * Every Q/A in schema MUST be present in visible content.
 */
export function generateFAQPageSchema(faqs: FaqItem[], pageUrl: string) {
	if (!faqs || faqs.length === 0) {
		return null;
	}

	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'@id': `${pageUrl}#faqpage`,
		mainEntity: faqs.map(faq => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		}))
	};
}

/**
 * Generates Service schema for service pages.
 * Describes a specific service offered by the business.
 */
export function generateServiceSchema({
	name,
	description,
	url,
	serviceType,
	areaServed = BUSINESS_INFO.areaServed
}: {
	name: string;
	description: string;
	url: string;
	serviceType: string;
	areaServed?: string[];
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		'@id': `${url}#service`,
		name,
		description,
		serviceType,
		url,
		provider: {
			'@id': `${BUSINESS_INFO.url}#organization`
		},
		areaServed: areaServed.map(area => ({
			'@type': 'City',
			name: area
		}))
	};
}

/**
 * Helper function to combine multiple schemas into a single array.
 * Use this to pass to the Layout component's jsonLd prop.
 */
export function combineSchemas(...schemas: (object | null | undefined)[]): object[] {
	return schemas.filter((schema): schema is object => schema !== null && schema !== undefined);
}