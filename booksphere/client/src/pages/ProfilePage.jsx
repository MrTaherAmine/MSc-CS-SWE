import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  getUserProfile,
  toggleUserFollow,
  updateMyPreferences
} from '../services/api.js';
import LoadingState from '../components/LoadingState.jsx';

export default function ProfilePage() {
  const { userId } = useParams();
  const { user: currentUser, authenticated, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followingBusy, setFollowingBusy] = useState(false);
  const [editingPreferences, setEditingPreferences] = useState(false);
  const [preferenceDraft, setPreferenceDraft] = useState({ bio: '', genres: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return undefined;
    const controller = new AbortController();
    setLoading(true);
    setError('');

    getUserProfile(userId, { signal: controller.signal })
      .then(response => setProfile(response.data))
      .catch(loadError => {
        if (loadError.name !== 'AbortError') setError(loadError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [userId, authLoading, authenticated]);

  async function handleFollow() {
    setFollowingBusy(true);
    setError('');
    try {
      const response = await toggleUserFollow(userId);
      setProfile(current => ({
        ...current,
        isFollowing: response.data.following,
        counts: {
          ...current.counts,
          followers: response.data.followersCount
        }
      }));
    } catch (followError) {
      setError(followError.message);
    } finally {
      setFollowingBusy(false);
    }
  }

  function startPreferenceEdit() {
    setPreferenceDraft({
      bio: profile.user.bio || '',
      genres: (profile.user.favoriteGenres || []).join(', ')
    });
    setEditingPreferences(true);
  }

  async function savePreferences(event) {
    event.preventDefault();
    setFollowingBusy(true);
    setError('');

    try {
      const favoriteGenres = preferenceDraft.genres
        .split(',')
        .map(value => value.trim())
        .filter(Boolean);
      const response = await updateMyPreferences({
        bio: preferenceDraft.bio,
        favoriteGenres
      });
      setProfile(current => ({ ...current, user: response.data.user }));
      setEditingPreferences(false);
    } catch (preferenceError) {
      setError(preferenceError.message);
    } finally {
      setFollowingBusy(false);
    }
  }

  if (loading || authLoading) return <LoadingState label="Loading reader profile…" />;

  if (error && !profile) {
    return <div className="details-error"><h1>Profile unavailable</h1><p>{error}</p></div>;
  }

  const ownProfile = String(currentUser?.id) === String(profile.user._id);

  return (
    <section className="profile-page">
      <header className="profile-hero">
        <div className="profile-avatar-large">
          {profile.user.avatarUrl ? (
            <img src={profile.user.avatarUrl} alt="" />
          ) : (
            <span>{profile.user.name.slice(0, 1).toUpperCase()}</span>
          )}
        </div>
        <div className="profile-copy">
          <p className="eyebrow purple">BookSphere reader</p>
          <h1>{profile.user.name}</h1>
          <p>{profile.user.bio || 'Discovering and sharing books with the BookSphere community.'}</p>
          <div className="profile-genres">
            {profile.user.favoriteGenres?.map(genre => <span key={genre}>{genre}</span>)}
          </div>
        </div>
        {authenticated && !ownProfile ? (
          <button
            className={profile.isFollowing ? 'follow-button following' : 'follow-button'}
            disabled={followingBusy}
            onClick={handleFollow}
          >
            {followingBusy ? 'Saving…' : profile.isFollowing ? 'Following' : 'Follow reader'}
          </button>
        ) : ownProfile ? (
          <button className="follow-button" onClick={startPreferenceEdit}>
            Edit preferences
          </button>
        ) : null}
      </header>

      {error ? <p className="error">{error}</p> : null}

      {editingPreferences ? (
        <form className="preferences-form" onSubmit={savePreferences}>
          <div>
            <p className="eyebrow purple">Personalize your feed</p>
            <h2>Reading preferences</h2>
          </div>
          <label>
            Short bio
            <textarea
              maxLength="500"
              rows="3"
              value={preferenceDraft.bio}
              onChange={event => setPreferenceDraft(current => ({
                ...current,
                bio: event.target.value
              }))}
            />
          </label>
          <label>
            Favorite genres
            <input
              value={preferenceDraft.genres}
              onChange={event => setPreferenceDraft(current => ({
                ...current,
                genres: event.target.value
              }))}
              placeholder="Technology, History, Science Fiction"
            />
            <small>Separate up to 10 genres with commas.</small>
          </label>
          <div className="preferences-actions">
            <button className="primary-button" disabled={followingBusy}>Save preferences</button>
            <button type="button" onClick={() => setEditingPreferences(false)}>Cancel</button>
          </div>
        </form>
      ) : null}

      <div className="profile-stats">
        <div><strong>{profile.counts.followers}</strong><span>Followers</span></div>
        <div><strong>{profile.counts.following}</strong><span>Following</span></div>
        <div><strong>{profile.counts.likedBooks}</strong><span>Liked books</span></div>
        <div><strong>{profile.counts.comments}</strong><span>Comments</span></div>
      </div>

      <section className="profile-section">
        <div className="panel-heading">
          <div><p className="eyebrow purple">Reading taste</p><h2>Liked books</h2></div>
          <strong>{profile.likedBooks.length}</strong>
        </div>
        {profile.likedBooks.length ? (
          <div className="liked-books-grid">
            {profile.likedBooks.map(item => (
              <Link className="liked-book" key={item.book._id} to={`/books/${item.book._id}`}>
                <div>
                  {item.book.coverUrl ? <img src={item.book.coverUrl} alt="" /> : <span>No cover</span>}
                </div>
                <strong>{item.book.title}</strong>
                <small>{item.book.authors?.join(', ') || 'Unknown author'}</small>
              </Link>
            ))}
          </div>
        ) : <div className="empty"><p>No liked books yet.</p></div>}
      </section>

      <div className="profile-lower-grid">
        <section className="profile-section">
          <div className="panel-heading">
            <div><p className="eyebrow purple">Conversation</p><h2>Recent comments</h2></div>
          </div>
          <div className="profile-comment-list">
            {profile.comments.map(comment => (
              <article key={comment._id}>
                <p>{comment.body}</p>
                <Link to={`/books/${comment.recommendation.book?._id}`}>
                  On {comment.recommendation.book?.title || 'a recommendation'} →
                </Link>
              </article>
            ))}
            {!profile.comments.length ? <p className="muted">No comments yet.</p> : null}
          </div>
        </section>

        <section className="profile-section">
          <div className="panel-heading">
            <div><p className="eyebrow purple">Community</p><h2>Followers</h2></div>
          </div>
          <div className="follower-list">
            {profile.followers.map(follower => (
              <Link key={follower._id} to={`/profiles/${follower._id}`}>
                <span>{follower.name.slice(0, 1).toUpperCase()}</span>
                <div><strong>{follower.name}</strong><small>{follower.bio || 'BookSphere reader'}</small></div>
              </Link>
            ))}
            {!profile.followers.length ? <p className="muted">No followers yet.</p> : null}
          </div>
        </section>
      </div>
    </section>
  );
}
