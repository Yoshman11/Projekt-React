import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Image } from 'react-bootstrap'; // Import Image component from Bootstrap
import noImgIcon from '../../assets/icons/noImgIcon.png'

const MoviePreview = (props: Props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    {props.img ? (
                        <Image className="img-fluid" src={props.img} alt={props.name} />
                    ) : (
                        <Image className="img-fluid" src={noImgIcon} alt="No Image" />
                    )}
                </div>
                <div className="col-md-4">
                    <span>{props.name ? props.name : '[no title]'}</span>
                </div>
            </div>
        </div>
    );
};

export default MoviePreview;

interface Props {
    id?: number | undefined;
    name?: string | undefined;
    img?: string | undefined;
}
