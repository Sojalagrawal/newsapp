import React, { Component } from "react";

export default class NewsItem extends Component {

  render() {
    let {title,description,imageUrl,newsUrl,author,date}=this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={imageUrl?imageUrl:"https://www.hindustantimes.com/ht-img/img/2023/08/03/1600x900/Chandrayaan-3-latest_update_1691035364333_1691035364544.jpg"} className="card-img-top"  alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title+"...."}</h5>
            <p className="card-text">{description+"...."}</p>
            <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl}  rel="noreferrer" target="_blank" className="btn btn-primary btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
// c303a4c7937b4cbcab2bee17c88ec25d
