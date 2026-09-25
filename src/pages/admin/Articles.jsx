import React, { useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { ArticleReview } from '../../components/admin/ArticleReview';
import { INITIAL_ARTICLE_REVIEWS } from '../../data/mockData';

export const Articles = () => {
  const [reviewArticles, setReviewArticles] = useState(INITIAL_ARTICLE_REVIEWS);

  const handleUpdateStatus = (id, status, feedback) => {
    setReviewArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, reviewStatus: status, reviewFeedback: feedback } : a))
    );
  };

  return (
    <div className="flex-1 flex max-w-7xl w-full mx-auto py-6">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-6 sm:p-8 space-y-6">
        <ArticleReview
          articles={reviewArticles.filter((a) => a.reviewStatus === 'pending')}
          onUpdateStatus={handleUpdateStatus}
        />
      </main>
    </div>
  );
};

export default Articles;
