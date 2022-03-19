import "./category-item.styles.scss";

const CategoryItem = ({ category: { id, title, imageUrl } }) => (
  <div className="category-item-container" key={id}>
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className="category-body-container">
      <h2>{title}</h2>
      <p>Showp Now</p>
    </div>
  </div>
);

export default CategoryItem;
