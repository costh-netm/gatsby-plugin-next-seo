import { assertSchema } from '@cypress/schema-tools';
import { ElementHandle } from 'puppeteer';

import { launch, props, testIterator } from '../helpers';
import schemas from '../schema';

const articleLdJsonIndex = 0;
const breadcrumbLdJsonIndex = 1;
const blogLdJsonIndex = 2;
const courseLdJsonIndex = 3;
const localBusinessLdJsonIndex = 4;
const logoLdJsonIndex = 5;
const productLdJsonIndex = 6;
const socialProfileLdJsonIndex = 7;
const corporateContactIndex = 8;
const newsArticleLdJsonIndex = 9;

let $document: ElementHandle;

describe.each(testIterator)('JSON LD - %s', (_, disableJavascript) => {
  beforeAll(async () => {
    $document = await launch({ path: '/jsonld', disableJavascript });
  });

  it('Article', async () => {
    await props<string>($document.$$('head script[type="application/ld+json"]'), 'innerHTML').then(
      content => {
        const jsonLD = JSON.parse(content[articleLdJsonIndex]);
        assertSchema(schemas)('Article', '1.0.0')(jsonLD);
        expect(jsonLD).toEqual({
          '@context': 'http://schema.org',
          '@type': 'Article',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://example.com/article',
          },
          headline: 'Article headline',
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          datePublished: '2015-02-05T08:00:00+08:00',
          dateModified: '2015-02-05T09:00:00+08:00',
          author: {
            '@type': 'Person',
            name: 'Jane Blogs',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Gary Meehan',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.example.com/photos/logo.jpg',
            },
          },
          description: 'This is a mighty good description of this article.',
        });
      },
    );
  });

  it('Breadcrumb', async () => {
    await props<string>($document.$$('head script[type="application/ld+json"]'), 'innerHTML').then(
      content => {
        const jsonLD = JSON.parse(content[breadcrumbLdJsonIndex]);
        assertSchema(schemas)('Breadcrumb', '1.0.0')(jsonLD);
        expect(jsonLD).toEqual({
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': 'https://example.com/books',
                name: 'Books',
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@id': 'https://example.com/books/authors',
                name: 'Authors',
              },
            },
            {
              '@type': 'ListItem',
              position: 3,
              item: {
                '@id': 'https://example.com/books/authors/annleckie',
                name: 'Ann Leckie',
              },
            },
            {
              '@type': 'ListItem',
              position: 4,
              item: {
                '@id': 'https://example.com/books/authors/annleckie/ancillaryjustice',
                name: 'Ancillary Justice',
              },
            },
          ],
        });
      },
    );
  });

  it('Blog', async () => {
    await props<string>($document.$$('head script[type="application/ld+json"]'), 'innerHTML').then(
      content => {
        const jsonLD = JSON.parse(content[blogLdJsonIndex]);
        assertSchema(schemas)('Blog', '1.0.0')(jsonLD);
        expect(jsonLD).toEqual({
          '@context': 'http://schema.org',
          '@type': 'Blog',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://example.com/blog',
          },
          headline: 'Blog headline',
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          datePublished: '2015-02-05T08:00:00+08:00',
          dateModified: '2015-02-05T09:00:00+08:00',
          author: {
            '@type': 'Person',
            name: 'Jane Blogs',
          },
          description: 'This is a mighty good description of this blog.',
        });
      },
    );
  });

  it('Course', async () => {
    await props<string>($document.$$('head script[type="application/ld+json"]'), 'innerHTML').then(
      content => {
        const jsonLD = JSON.parse(content[courseLdJsonIndex]);
        assertSchema(schemas)('Course', '1.0.0')(jsonLD);
        expect(jsonLD).toEqual({
          '@context': 'http://schema.org',
          '@type': 'Course',
          name: 'Course Name',
          description: 'Course description goes right here',
          provider: {
            '@type': 'Organization',
            name: 'Course Provider',
            sameAs: 'https//www.example.com/provider',
          },
        });
      },
    );
  });

  it('Local Business', async () => {
    await props<string>($document.$$('head script[type="application/ld+json"]'), 'innerHTML').then(
      content => {
        const jsonLD = JSON.parse(content[localBusinessLdJsonIndex]);
        assertSchema(schemas)('Local Business', '1.0.0')(jsonLD);
        expect(jsonLD).toEqual({
          '@context': 'http://schema.org',
          '@type': 'Store',
          '@id': 'http://davesdeptstore.example.com',
          name: "Dave's Department Store",
          description: "Dave's latest department store in San Jose, now open",
          url: 'http://www.example.com/store-locator/sl/San-Jose-Westgate-Store/1427',
          telephone: '+14088717984',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '1600 Saratoga Ave',
            addressLocality: 'San Jose',
            addressRegion: 'CA',
            postalCode: '95129',
            addressCountry: 'US',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '37.293058',
            longitude: '-121.988331',
          },
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
        });
      },
    );
  });

  it('Logo', async () => {
    await props<string>($document.$$('head script[type="application/ld+json"]'), 'innerHTML').then(
      content => {
        const jsonLD = JSON.parse(content[logoLdJsonIndex]);
        assertSchema(schemas)('Logo', '1.0.0')(jsonLD);
        expect(jsonLD).toEqual({
          '@context': 'http://schema.org',
          '@type': 'Organization',
          url: 'http://www.your-site.com',
          logo: 'http://www.your-site.com/images/logo.jpg',
        });
      },
    );
  });

  it('Product', async () => {
    await props<string>($document.$$('head script[type="application/ld+json"]'), 'innerHTML').then(
      content => {
        const jsonLD = JSON.parse(content[productLdJsonIndex]);
        assertSchema(schemas)('Product', '1.0.0')(jsonLD);
        expect(jsonLD).toEqual({
          '@context': 'http://schema.org/',
          '@type': 'Product',
          name: 'Executive Anvil',
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          description:
            "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
          mpn: '925872',
          brand: {
            '@type': 'Thing',
            name: 'ACME',
          },
          review: [
            {
              '@type': 'Review',
              author: 'Jim',
              datePublished: '2017-01-06T03:37:40Z',
              reviewBody:
                'This is my favorite product yet! Thanks Nate for the example products and reviews.',
              name: 'So awesome!!!',
              reviewRating: {
                '@type': 'Rating',
                bestRating: '5',
                ratingValue: '5',
                worstRating: '1',
              },
            },
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.4',
            reviewCount: '89',
          },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: '119.99',
            priceValidUntil: '2020-11-05',
            itemCondition: 'http://schema.org/UsedCondition',
            availability: 'http://schema.org/InStock',
            url: 'https://www.example.com/executive-anvil',
            seller: {
              '@type': 'Organization',
              name: 'Executive Objects',
            },
          },
        });
      },
    );
  });

  it('Social Profile', async () => {
    await props<string>($document.$$('head script[type="application/ld+json"]'), 'innerHTML').then(
      content => {
        const jsonLD = JSON.parse(content[socialProfileLdJsonIndex]);
        assertSchema(schemas)('Social Profile', '1.0.0')(jsonLD);
        expect(jsonLD).toEqual({
          '@context': 'http://schema.org',
          '@type': 'Person',
          name: 'your name',
          url: 'http://www.your-site.com',
          sameAs: [
            'http://www.facebook.com/your-profile',
            'http://instagram.com/yourProfile',
            'http://www.linkedin.com/in/yourprofile',
            'http://plus.google.com/your_profile',
          ],
        });
      },
    );
  });

  it('Corporate Contact', async () => {
    await props<string>($document.$$('head script[type="application/ld+json"]'), 'innerHTML').then(
      content => {
        const jsonLD = JSON.parse(content[corporateContactIndex]);
        assertSchema(schemas)('Corporate Contact', '1.0.0')(jsonLD);
        expect(jsonLD).toEqual({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          url: 'http://www.your-company-site.com',
          logo: 'http://www.example.com/logo.png',
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: '+1-401-555-1212',
              contactType: 'customer service',
              areaServed: 'US',
              availableLanguage: ['English', 'Spanish', 'French'],
            },
            {
              '@type': 'ContactPoint',
              telephone: '+1-877-746-0909',
              contactType: 'customer service',
              contactOption: 'TollFree',
              availableLanguage: 'English',
            },
            {
              '@type': 'ContactPoint',
              telephone: '+1-877-453-1304',
              contactType: 'technical support',
              contactOption: 'TollFree',
              areaServed: ['US', 'CA'],
              availableLanguage: ['English', 'French'],
            },
          ],
        });
      },
    );
  });

  it('NewsArticle', async () => {
    await props<string>($document.$$('head script[type="application/ld+json"]'), 'innerHTML').then(
      content => {
        const jsonLD = JSON.parse(content[newsArticleLdJsonIndex]);
        assertSchema(schemas)('NewsArticle', '1.0.0')(jsonLD);
        expect(jsonLD).toEqual({
          '@context': 'http://schema.org',
          '@type': 'NewsArticle',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://example.com/newsarticle',
          },
          headline: 'News Article headline',
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          articleSection: 'politics',
          keywords: 'prayuth, taksin, thai',
          dateCreated: '2015-02-05T08:00:00+08:00',
          datePublished: '2015-02-05T08:00:00+08:00',
          dateModified: '2015-02-05T09:00:00+08:00',
          author: {
            '@type': 'Person',
            name: 'Jane Blogs',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Gary Meehan',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.example.com/photos/logo.jpg',
            },
          },
          description: 'This is a mighty good description of this news article.',
          articleBody: 'This is article body of news article',
        });
      },
    );
  });
});
