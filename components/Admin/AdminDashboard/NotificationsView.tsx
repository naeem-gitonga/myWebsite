'use client';

import { useState } from 'react';
import { articles } from '@/utils/articles';
import useEnvConfig from '@/hooks/useEnvConfig';
import styles from './NotificationsView.module.scss';

type SendState = 'idle' | 'sending' | 'success' | 'error';

export function NotificationsView() {
  const envConfig = useEnvConfig();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [sendState, setSendState] = useState<SendState>('idle');
  const [resultMessage, setResultMessage] = useState('');

  const siteUrl = envConfig.SITE_URL ?? 'https://www.naeemgitonga.com';

  function selectArticle(slug: string) {
    const article = articles.find((a) => a.articleUrl === slug);
    if (!article) return;
    setSelectedSlug(slug);
    setTitle(article.title);
    setUrl(`${siteUrl}${article.articleUrl}`);
    setDescription(`Published ${article.publishedDate} · ${article.lengthInMinutes} min read`);
    setSendState('idle');
    setResultMessage('');
  }

  async function handleSend() {
    if (!title || !url || !description) return;
    setSendState('sending');
    setResultMessage('');
    try {
      const res = await fetch('/api/admin/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url, description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      setSendState('success');
      if (data.sent === 0) {
        setResultMessage('No subscribers to notify.');
      } else {
        setResultMessage(`Sent to ${data.sent} subscriber${data.sent === 1 ? '' : 's'}.`);
      }
    } catch (e) {
      setSendState('error');
      setResultMessage(e instanceof Error ? e.message : 'Something went wrong.');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.columns}>
        <div className={styles.articleList}>
          <h2 className={styles.sectionTitle}>Select Article</h2>
          {articles.map((article) => (
            <button
              key={article.articleUrl}
              className={`${styles.articleItem} ${selectedSlug === article.articleUrl ? styles.selected : ''}`}
              onClick={() => selectArticle(article.articleUrl)}
            >
              <span className={styles.articleTitle}>{article.title}</span>
              <span className={styles.articleMeta}>{article.publishedDate} · {article.lengthInMinutes} min</span>
            </button>
          ))}
        </div>

        <div className={styles.compose}>
          <h2 className={styles.sectionTitle}>Compose Notification</h2>
          {!selectedSlug ? (
            <p className={styles.placeholder}>Select an article to compose a notification.</p>
          ) : (
            <>
              <div className={styles.field}>
                <label htmlFor="notify-title">Title</label>
                <input
                  id="notify-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="notify-url">URL</label>
                <input
                  id="notify-url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="notify-description">Message</label>
                <textarea
                  id="notify-description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                className={styles.sendBtn}
                onClick={handleSend}
                disabled={sendState === 'sending' || !title || !url || !description}
              >
                {sendState === 'sending' ? 'Sending…' : 'Send Notification'}
              </button>
              {sendState === 'success' && <p className={styles.success}>{resultMessage}</p>}
              {sendState === 'error' && <p className={styles.error}>{resultMessage}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
