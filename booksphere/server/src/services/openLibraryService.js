const SEARCH_BASE_URL = 'https://openlibrary.org/search.json';
const SUBJECT_BASE_URL = 'https://openlibrary.org/subjects';
const COVER_BASE_URL = 'https://covers.openlibrary.org/b/id';

const DEFAULT_LIMIT = 20;
const ALLOWED_SEARCH_TYPES = new Set(['all', 'title', 'author', 'genre']);

function cleanString(value = '') {
  return String(value).trim();
}

function normalizeSearchDocument(doc) {
  const coverId = Number.isFinite(doc.cover_i) ? doc.cover_i : null;
  const workKey = cleanString(doc.key);

  return {
    externalId: workKey,
    source: 'open-library',
    title: cleanString(doc.title) || 'Untitled',
    authors: Array.isArray(doc.author_name) ? doc.author_name : [],
    description: '',
    coverUrl: coverId
      ? `${COVER_BASE_URL}/${coverId}-M.jpg`
      : '',
    firstPublishYear: doc.first_publish_year || null,
    isbn10: Array.isArray(doc.isbn)
      ? doc.isbn.find(value => String(value).length === 10) || ''
      : '',
    isbn13: Array.isArray(doc.isbn)
      ? doc.isbn.find(value => String(value).length === 13) || ''
      : '',
    genres: Array.isArray(doc.subject)
      ? doc.subject.slice(0, 8)
      : []
  };
}

function normalizeSubjectWork(work) {
  const coverId = Number.isFinite(work.cover_id) ? work.cover_id : null;

  return {
    externalId: cleanString(work.key),
    source: 'open-library',
    title: cleanString(work.title) || 'Untitled',
    authors: Array.isArray(work.authors)
      ? work.authors.map(author => author.name).filter(Boolean)
      : [],
    description: '',
    coverUrl: coverId
      ? `${COVER_BASE_URL}/${coverId}-M.jpg`
      : '',
    firstPublishYear: work.first_publish_year || null,
    isbn10: '',
    isbn13: '',
    genres: []
  };
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'BookSphere/1.0 (educational software engineering project)'
    }
  });

  if (!response.ok) {
    throw new Error(`Open Library request failed with status ${response.status}.`);
  }

  return response.json();
}

export async function searchOpenLibrary({
  query,
  type = 'all',
  limit = DEFAULT_LIMIT
}) {
  const normalizedQuery = cleanString(query);
  const normalizedType = cleanString(type).toLowerCase() || 'all';
  const safeLimit = Math.min(Math.max(Number(limit) || DEFAULT_LIMIT, 1), 40);

  if (normalizedQuery.length < 2) {
    throw new Error('Search query must contain at least 2 characters.');
  }

  if (!ALLOWED_SEARCH_TYPES.has(normalizedType)) {
    throw new Error('Search type must be all, title, author, or genre.');
  }

  if (normalizedType === 'genre') {
    const subjectSlug = encodeURIComponent(
      normalizedQuery
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
    );

    const url = new URL(`${SUBJECT_BASE_URL}/${subjectSlug}.json`);
    url.searchParams.set('limit', String(safeLimit));

    const data = await fetchJson(url);

    return {
      source: 'Open Library Subjects API',
      query: normalizedQuery,
      type: normalizedType,
      total: Number(data.work_count || 0),
      results: Array.isArray(data.works)
        ? data.works.map(normalizeSubjectWork)
        : []
    };
  }

  const url = new URL(SEARCH_BASE_URL);
  url.searchParams.set('limit', String(safeLimit));
  url.searchParams.set(
    'fields',
    'key,title,author_name,first_publish_year,cover_i,isbn,subject'
  );

  if (normalizedType === 'title') {
    url.searchParams.set('title', normalizedQuery);
  } else if (normalizedType === 'author') {
    url.searchParams.set('author', normalizedQuery);
  } else {
    url.searchParams.set('q', normalizedQuery);
  }

  const data = await fetchJson(url);

  return {
    source: 'Open Library Search API',
    query: normalizedQuery,
    type: normalizedType,
    total: Number(data.num_found || data.numFound || 0),
    results: Array.isArray(data.docs)
      ? data.docs.map(normalizeSearchDocument)
      : []
  };
}
