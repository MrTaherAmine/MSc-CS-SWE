import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  addRecommendationComment,
  getRecommendationComments,
  recordRecommendationShare,
  toggleRecommendationLike
} from '../services/api.js';

const DATE_FORMATTER = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

function formatDate(value) {
  return DATE_FORMATTER.format(new Date(value));
}

export default function FeedCard({ recommendation, onChange }) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [commentBody, setCommentBody] = useState('');
  const [busyAction, setBusyAction] = useState('');
  const [status, setStatus] = useState('');

  async function handleLike() {
    setBusyAction('like');
    setStatus('');
    try {
      const response = await toggleRecommendationLike(recommendation._id);
      onChange({
        likedByMe: response.data.liked,
        likesCount: response.data.likesCount
      });
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusyAction('');
    }
  }

  async function toggleComments() {
    const nextOpen = !commentsOpen;
    setCommentsOpen(nextOpen);

    if (nextOpen && !commentsLoaded) {
      setBusyAction('comments');
      try {
        const response = await getRecommendationComments(recommendation._id);
        setComments(response.data || []);
        setCommentsLoaded(true);
      } catch (error) {
        setStatus(error.message);
      } finally {
        setBusyAction('');
      }
    }
  }

  async function submitComment(event) {
    event.preventDefault();
    const body = commentBody.trim();
    if (!body) return;

    setBusyAction('comment');
    setStatus('');
    try {
      const response = await addRecommendationComment(recommendation._id, body);
      setComments(current => [response.data.comment, ...current]);
      setCommentBody('');
      onChange({ commentsCount: response.data.commentsCount });
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusyAction('');
    }
  }

  async function handleShare() {
    const bookTitle = recommendation.book?.title || 'a BookSphere recommendation';
    const shareUrl = `${window.location.origin}/books/${recommendation.book?._id}`;
    setStatus('');

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${bookTitle} on BookSphere`,
          text: recommendation.recommendationText,
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setStatus('Book link copied to your clipboard.');
      }

      const response = await recordRecommendationShare(recommendation._id);
      onChange({ sharesCount: response.data.sharesCount });
    } catch (error) {
      if (error.name !== 'AbortError') setStatus(error.message);
    }
  }

  return (
    <article className="feed-card">
      <header className="feed-card-header">
        <Link className="feed-avatar" to={`/profiles/${recommendation.user?._id}`}>
          {recommendation.user?.avatarUrl ? (
            <img src={recommendation.user.avatarUrl} alt="" />
          ) : (
            <span>{recommendation.user?.name?.slice(0, 1).toUpperCase() || 'B'}</span>
          )}
        </Link>
        <div>
          <Link to={`/profiles/${recommendation.user?._id}`}>
            {recommendation.user?.name || 'BookSphere reader'}
          </Link>
          <small>{formatDate(recommendation.createdAt)}</small>
        </div>
        {recommendation.personalization?.reason ? (
          <span className="reason-chip">{recommendation.personalization.reason}</span>
        ) : null}
      </header>

      <div className="feed-book">
        <Link className="feed-cover" to={`/books/${recommendation.book?._id}`}>
          {recommendation.book?.coverUrl ? (
            <img src={recommendation.book.coverUrl} alt={`Cover of ${recommendation.book.title}`} />
          ) : (
            <span>No cover</span>
          )}
        </Link>
        <div>
          <p className="result-source">Reader recommendation</p>
          <Link className="feed-title" to={`/books/${recommendation.book?._id}`}>
            {recommendation.book?.title}
          </Link>
          <p className="book-author">
            {recommendation.book?.authors?.join(', ') || 'Unknown author'}
          </p>
          <span className="feed-stars">{'★'.repeat(recommendation.rating)}</span>
          <blockquote>{recommendation.recommendationText}</blockquote>
        </div>
      </div>

      <div className="feed-actions" aria-label="Recommendation actions">
        <button
          type="button"
          className={recommendation.likedByMe ? 'active' : ''}
          aria-pressed={recommendation.likedByMe}
          disabled={busyAction === 'like'}
          onClick={handleLike}
        >
          ♥ {recommendation.likesCount || 0}
        </button>
        <button type="button" onClick={toggleComments}>
          Comment {recommendation.commentsCount || 0}
        </button>
        <button type="button" onClick={handleShare}>
          Share {recommendation.sharesCount || 0}
        </button>
      </div>

      {commentsOpen ? (
        <section className="comments-panel">
          <form onSubmit={submitComment}>
            <input
              required
              maxLength="1000"
              value={commentBody}
              onChange={event => setCommentBody(event.target.value)}
              placeholder="Add a thoughtful comment…"
              aria-label="Comment text"
            />
            <button disabled={busyAction === 'comment'}>
              {busyAction === 'comment' ? 'Posting…' : 'Post'}
            </button>
          </form>

          {busyAction === 'comments' ? <p className="muted">Loading comments…</p> : null}
          <div className="comment-list">
            {comments.map(comment => (
              <article key={comment._id}>
                <Link to={`/profiles/${comment.user?._id}`}>
                  {comment.user?.name || 'Reader'}
                </Link>
                <p>{comment.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {status ? <p className="feed-status" role="status">{status}</p> : null}
    </article>
  );
}
