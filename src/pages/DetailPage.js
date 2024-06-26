import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import newsAPI from "../services/newsAPI";

const DetailPage = () => {
  const { title } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Make an API call to fetch the article details
        const response = await newsAPI.get("/everything", {
          params: {
            q: title,
          },
        });

        if (response.data.articles.length > 0) {
          setArticle(response.data.articles[0]);
        } else {
          setError("Article not found");
        }
      } catch (error) {
        setError("Error fetching article details");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [title]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className='detail'>
      <h1>{article.title}</h1>
      <img src={article.urlToImage} alt={article.title} 
      />
      <p>{article.content}</p>
      <p>
        <a  className='read' href={article.url} target="_blank" rel="noopener noreferrer">
          Read the full article
        </a>
      </p>
    </div>
  );
};

export default DetailPage;
