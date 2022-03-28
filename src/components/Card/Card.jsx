import React from "react";
import { Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { formatPrice } from "../../utils/format";

import './styles.css'

export default class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      img: props.img,
      title: props.title,
      author: props.author,
      rating: props.rating,
      price: props.price,
      sold: props.sold,
      onClick: props.onClick,
      avalationSums: props.avalationSums,
      avaliationsQuantity: props.avaliationsQuantity,
    };
  }

  render() {
    return (
      <>
        <Card
          style={{
            width: "14rem",
            margin: "16px",
            height: "auto",
            borderRadius: "4px 4px 4px 4px",
            boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
            marginTop: "16px",
            cursor: "pointer",
          }}
          onClick={this.state.onClick}
        >
          <Card.Img
            variant="top"
            src={this.state.img}
            style={{ borderRadius: "4px 4px 0px 0px", height: "10em", objectFit: "cover", }}
          />
          <Card.Body>
            <Card.Title style={{ fontSize: "14px" }}>
              {this.state.title}
            </Card.Title>
            <Card.Text style={{ fontSize: "12px" }}>
              {this.state.author}
            </Card.Text>
            <Card.Text style={{ fontSize: "12px" }}>
              { this.state.sold ? this.state.sold : 0 } vendidos
            </Card.Text>

            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ReactStars
              value={
                this.state.avalationSums / this.state.avaliationsQuantity
              }
              edit={false} size={18} />
              <Card.Text
                style={{
                  fontSize: "16px",
                  color: "#6CB1CF",
                  fontWeight: "600",
                }}
              >
                {formatPrice(this.state.price)}
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}
