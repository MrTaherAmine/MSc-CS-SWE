import { searchOpenLibrary } from '../services/openLibraryService.js';

export async function searchBooks(req, res, next) {
  try {
    const result = await searchOpenLibrary({
      query: req.query.q,
      type: req.query.type || 'all',
      limit: req.query.limit || 20
    });

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    if (
      error.message.includes('at least 2 characters') ||
      error.message.includes('Search type')
    ) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    next(error);
  }
}
