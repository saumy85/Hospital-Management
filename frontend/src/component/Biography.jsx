import React from "react";
// import "../Css.css";
const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="about image" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
            facere aliquam perferendis, repellat saepe recusandae ipsam sapiente
            vero, suscipit odit amet? Eveniet ut tempore magni ab praesentium.
            Optio earum ipsam inventore blanditiis adipisci perspiciatis fuga,
            voluptates quia tempore quod ipsa, obcaecati rem explicabo
            asperiores quae natus ut, maiores iusto aliquam?
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sit
            perspiciatis dolorem aperiam labore eius doloremque magnam fugit hic
            quod, provident odit dolorum commodi quibusdam aspernatur quas.
            Commodi fugiat veritatis dignissimos porro, vero ut minima.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit,
            dolores!
          </p>
          <p>Lorem, ipsum dolor.</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
