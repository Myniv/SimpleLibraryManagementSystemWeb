/* eslint-disable react/prop-types */
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CardBook = ({
  cardTitle,
  cardAuthor,
  cardCategory,
  cardIsbn,
  cardId,
}) => {
  const cardStyle = {
    width: "18rem",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
  };

  const cardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  };

  const imageStyle = {
    height: "200px",
    objectFit: "contain",
    backgroundColor: "#E8E8E8",
  };

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#343a40",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    border: "none",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const navigate = useNavigate();

  return (
    <Card
      style={cardStyle}
      className="book-card"
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
    >
      <Card.Img
        variant="top"
        src="/img/bookIcon.png"
        alt="Book Icon"
        style={imageStyle}
      />
      <Card.Body>
        <Card.Title style={titleStyle}>{cardTitle}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{cardAuthor}</Card.Subtitle>
        <Card.Text>
          <strong>Category:</strong> {cardCategory}
        </Card.Text>
        <Card.Text>
          <strong>ISBN:</strong> {cardIsbn}
        </Card.Text>
        <Button
          variant="primary"
          style={buttonStyle}
          onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => navigate(`/searchbooks/${cardId}`)}
        >
          Learn More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardBook;
