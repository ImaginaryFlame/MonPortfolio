import { Col } from "react-bootstrap";

const ProjectCard = ({ title, description, imgUrl, link, category }) => {
  const handleClick = () => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <Col>
      <div className="proj-imgbx" onClick={handleClick} style={{ cursor: link ? 'pointer' : 'default' }}>
        <img src={imgUrl} alt={title} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
          {category && (
            <span className="category-badge" style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '5px 15px',
              borderRadius: '15px',
              marginTop: '10px',
              fontSize: '12px',
              fontWeight: '500',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {category}
            </span>
          )}
        </div>
      </div>
    </Col>
  );
};

export default ProjectCard;