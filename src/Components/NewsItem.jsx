import image from '../assets/news.jpg';
const NewsItem = ({title,description,src,url}) => {
  return (
    <div
      className="card bg-dark text-light mb-4 d-inline-block my-4 mx-4 px-3 py-3"
      style={{ maxWidth: "350px" }}
    >
      <img
        src={src?src:image}
        style={{ height: "200px", width: "320px" }}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{title.slice(0, 50)}</h5>
        <p className="card-text">
          {description
            ? description.slice(0, 90)
            : "Stay informed with our concise news updates, delivering a snapshot of the latest events worldwide."}
        </p>
        <a href={url} className="btn btn-primary">
          Read More
        </a>
      </div>
    </div>
  );
}

export default NewsItem