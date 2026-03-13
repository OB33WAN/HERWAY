// Bespoke example journey catalogue data for Wanderlust
'use strict';

const TRAVEL_PACKAGES = [
    {
        id: 101,
        slug: 'japan-spring-culture-route',
        detailPage: 'packages/japan-spring-culture-route.html',
        title: 'Japan Spring Culture Route',
        destination: 'Tokyo, Hakone, Kyoto',
        region: 'Asia',
        type: 'culture',
        durationDays: 10,
        travellers: 'Couples, solo, small groups',
        priceFrom: 3890,
        priceLabel: 'From 3,890 GBP pp',
        image: '../assets/images/property-1.svg',
        badge: 'Most Requested',
        highlights: [
            'Private tea ceremony with local host in Kyoto',
            'Guided market food walk in Tokyo',
            'Ryokan stay with onsen experience in Hakone'
        ],
        sampleItinerary: [
            'Days 1-3: Tokyo neighborhoods, food tour, design district visit',
            'Days 4-5: Hakone scenic rail and mountain views',
            'Days 6-10: Kyoto temples, crafts quarter, day trip to Nara'
        ],
        description: 'A bespoke example itinerary for first-time Japan, balancing city energy, cultural depth, and restful pacing.',
        schema: {
            '@type': 'TouristTrip',
            'name': 'Japan Spring Culture Route',
            'description': '10-day bespoke example route through Tokyo, Hakone, and Kyoto with cultural highlights and local-led experiences.',
            'itinerary': 'Tokyo, Hakone, Kyoto',
            'offers': {
                '@type': 'Offer',
                'price': '3890',
                'priceCurrency': 'GBP'
            }
        }
    },
    {
        id: 102,
        slug: 'amalfi-coast-slow-luxury',
        detailPage: 'packages/amalfi-coast-slow-luxury.html',
        title: 'Amalfi Coast Slow Luxury',
        destination: 'Naples, Positano, Ravello',
        region: 'Europe',
        type: 'coastal',
        durationDays: 8,
        travellers: 'Couples, honeymooners',
        priceFrom: 4290,
        priceLabel: 'From 4,290 GBP pp',
        image: '../assets/images/property-2.svg',
        badge: 'Romantic',
        highlights: [
            'Private boat day along the coast',
            'Chef-led cooking class in Ravello',
            'Boutique cliffside hotel stays'
        ],
        sampleItinerary: [
            'Days 1-2: Naples old quarter and culinary highlights',
            'Days 3-5: Positano coastal villages and sailing day',
            'Days 6-8: Ravello gardens, wine tasting, relaxed departures'
        ],
        description: 'A bespoke coastal example designed for easy elegance, refined stays, and intimate local experiences.',
        schema: {
            '@type': 'TouristTrip',
            'name': 'Amalfi Coast Slow Luxury',
            'description': '8-day bespoke coastal journey through Naples, Positano, and Ravello with private and culinary-led experiences.',
            'itinerary': 'Naples, Positano, Ravello',
            'offers': {
                '@type': 'Offer',
                'price': '4290',
                'priceCurrency': 'GBP'
            }
        }
    },
    {
        id: 107,
        slug: 'maldives-atoll-dive-escape',
        detailPage: 'packages/maldives-atoll-dive-escape.html',
        title: 'Maldives Atoll Dive Escape',
        destination: 'Male, South Ari Atoll, Baa Atoll',
        region: 'Indian Ocean',
        type: 'scuba',
        durationDays: 9,
        travellers: 'Couples, certified divers, honeymooners',
        soloFriendly: true,
        priceFrom: 4980,
        priceLabel: 'From 4,980 GBP pp (experience-only)',
        image: '../assets/images/property-2.svg',
        badge: 'Scuba Escape',
        highlights: [
            'Guided manta and whale shark dive planning with seasonal timing',
            'Split-stay design pairing house-reef ease with advanced channel dives',
            'Private sandbank sunset dinner between dive days'
        ],
        sampleItinerary: [
            'Days 1-2: Arrival in Male, seaplane transfer, reef orientation dives',
            'Days 3-5: South Ari Atoll marine life dives with optional nitrox support',
            'Days 6-9: Baa Atoll luxury stay, relaxed snorkeling, departure logistics'
        ],
        description: 'A bespoke scuba example journey built around marine encounters, luxury-standard stays, and best-value sourcing for experience-only pricing.',
        schema: {
            '@type': 'TouristTrip',
            'name': 'Maldives Atoll Dive Escape',
            'description': '9-day bespoke scuba diving example through Male, South Ari Atoll, and Baa Atoll with marine-life-led routing.',
            'itinerary': 'Male, South Ari Atoll, Baa Atoll',
            'offers': {
                '@type': 'Offer',
                'price': '4980',
                'priceCurrency': 'GBP'
            }
        }
    },
    {
        id: 103,
        slug: 'morocco-colors-and-desert',
        detailPage: 'packages/morocco-colors-and-desert.html',
        title: 'Morocco Colors and Desert',
        destination: 'Marrakech, Atlas, Agafay',
        region: 'Africa',
        type: 'adventure',
        durationDays: 9,
        travellers: 'Friends, couples, families',
        priceFrom: 2790,
        priceLabel: 'From 2,790 GBP pp',
        image: '../assets/images/property-3.svg',
        badge: 'New',
        highlights: [
            'Design riad in Marrakech medina',
            'Atlas Mountains guided day hike',
            'Desert camp evening under the stars'
        ],
        sampleItinerary: [
            'Days 1-3: Marrakech souks, artisan visits, gardens',
            'Days 4-6: Atlas mountain village and trails',
            'Days 7-9: Desert camp, hammam, departure support'
        ],
        description: 'A vibrant bespoke example mixing cultural immersion, landscape, and soft adventure with comfortable logistics.',
        schema: {
            '@type': 'TouristTrip',
            'name': 'Morocco Colors and Desert',
            'description': '9-day bespoke Morocco route through Marrakech, Atlas Mountains, and Agafay desert camp.',
            'itinerary': 'Marrakech, Atlas, Agafay',
            'offers': {
                '@type': 'Offer',
                'price': '2790',
                'priceCurrency': 'GBP'
            }
        }
    },
    {
        id: 108,
        slug: 'raja-ampat-reef-expedition',
        detailPage: 'packages/raja-ampat-reef-expedition.html',
        title: 'Raja Ampat Reef Expedition',
        destination: 'Sorong, Waigeo, Misool',
        region: 'Southeast Asia',
        type: 'scuba',
        durationDays: 11,
        travellers: 'Certified divers, adventurous couples, small groups',
        soloFriendly: true,
        priceFrom: 6890,
        priceLabel: 'From 6,890 GBP pp (experience-only)',
        image: '../assets/images/property-5.svg',
        badge: 'Dive Signature',
        highlights: [
            'Liveaboard-style routing without sacrificing premium land stays',
            'Biodiversity-focused dives with current and certification matching',
            'Photographer-friendly pacing with hidden lagoon and village access'
        ],
        sampleItinerary: [
            'Days 1-3: Sorong arrival, Waigeo warm-up dives, gear and guide briefing',
            'Days 4-7: Dampier Strait and limestone islets with advanced dive windows',
            'Days 8-11: Misool reefs, conservation visit, flexible weather contingency plan'
        ],
        description: 'A bespoke scuba expedition example for travelers who want world-class reefs, a luxury standard, and value-conscious supplier sourcing.',
        schema: {
            '@type': 'TouristTrip',
            'name': 'Raja Ampat Reef Expedition',
            'description': '11-day bespoke scuba expedition example through Sorong, Waigeo, and Misool with premium reef-focused routing.',
            'itinerary': 'Sorong, Waigeo, Misool',
            'offers': {
                '@type': 'Offer',
                'price': '6890',
                'priceCurrency': 'GBP'
            }
        }
    },
    {
        id: 110,
        slug: 'adriatic-luxury-coastal-cruise',
        detailPage: 'packages/adriatic-luxury-coastal-cruise.html',
        title: 'Adriatic Luxury Coastal Cruise',
        destination: 'Split, Hvar, Dubrovnik',
        region: 'Europe',
        type: 'cruise',
        durationDays: 5,
        travellers: 'Solo travelers, couples, small groups',
        soloFriendly: true,
        priceFrom: 3790,
        priceLabel: 'From 3,790 GBP pp (experience-only)',
        image: '../assets/images/property-4.svg',
        badge: 'Marine Cruise',
        highlights: [
            'Boutique yacht experience with luxury-standard cabins',
            'Curated island swim stops and optional guided shoreline walks',
            'Best-rate partner sourcing without compromising service quality'
        ],
        sampleItinerary: [
            'Day 1: Split embarkation and harbor sunset dinner',
            'Days 2-4: Hvar and island-hopping route with flexible marine activities',
            'Day 5: Dubrovnik arrival and private transfer support'
        ],
        description: 'A marine cruise example that blends boutique luxury standards with smart, best-price partner sourcing for experience components.',
        schema: {
            '@type': 'TouristTrip',
            'name': 'Adriatic Luxury Coastal Cruise',
            'description': '5-day bespoke marine cruise example through Split, Hvar, and Dubrovnik with luxury-standard service.',
            'itinerary': 'Split, Hvar, Dubrovnik',
            'offers': {
                '@type': 'Offer',
                'price': '3790',
                'priceCurrency': 'GBP'
            }
        }
    }
];

if (typeof window !== 'undefined') {
    window.TRAVEL_PACKAGES = TRAVEL_PACKAGES;
    window.PROPERTIES_DATA = TRAVEL_PACKAGES;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TRAVEL_PACKAGES;
}
