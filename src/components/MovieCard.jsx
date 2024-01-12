import { useRef } from "react";
import { Link } from "react-router-dom"


const sizes = [
    {
        width: '7rem',
        height: '10.5rem',
        textMain: '0.7rem',
        textSub: '0.6rem',
        charLimit: 0,
    },
    {
        width: '9rem',
        height: '13.5rem',
        textMain: '1.0rem',
        textSub: '0.5rem',
        charLimit: 20,
    },
    {
        width: '11rem',
        height: '16.5rem',
        textMain: '1.2rem',
        textSub: '0.6rem',
        charLimit: 45,
    },
    {
        width: '13rem',
        height: '19.5rem',
        textMain: '1.5rem',
        textSub: '0.8rem',
        additionalInfo: "0.6rem",
        charLimit: 50
    },
]


const MovieCard = (params) => {
    const linkOveride = params.link;

    const getLink = () => {
        if(linkOveride !== undefined) {
            return {
                pathname: "/"+linkOveride
            }
        } else {
            return {
                pathname: `/details/${encodeURIComponent(getId())}`,
            }
        }
    }

    const size = params.size;

//     const getCover = () => {
//         return (params.cover == undefined || params.cover === null) ? noCover : params.cover;
//     }

    const getId = () => {
        return (params.id === undefined) ? "" : params.id;
    }

    const getTitle = () => {
        return (params.title === undefined || params.title == "") ? "No title" : params.title;
    }

    const getDefault = (data, def) => {
        if(data == "" || data === undefined || data == 0) {
            return def;
        } else {
            return data;
        }
    }

    const getDescription = () => {
        let dsc = params.description;
        if (dsc === undefined || dsc == "")
        return "";

        let words = dsc.split(' ');
        dsc = ""

        while(dsc.length < getSize().charLimit) {
            dsc += words[0] + " ";
            if(dsc.length >= params.description.length) return dsc;
            words = words.slice(1)
        }

        return dsc + '...'; // Shorten description
    }

    const getSize = (prop) => {
        return sizes[size];
    }

    return (
        <Link to={getLink()}
        onClick={() => {console.info(getId())}}>
            <div className="card text-bg-dark rounded-lg m-2 border-0" style={{width: getSize().width, height:getSize().height}}>
{/*                 <img src={getCover()} onError={({currentTarget}) => {currentTarget.onError = null; currentTarget.src=noCover}} className="card-img" style={{objectFit: "cover", width: '100%', height: "100%"}}></img> */}
                <div className="card-img-overlay d-flex flex-column justify-content-end gradient-bg">
                        <h4 className="m-0" style={{fontSize: getSize().textMain, margin:0, marginBottom:2, borderBlockEnd: "1px white"}}>{getTitle()}</h4>
                        {(size != 0) && <p className="mt-3" style={{fontSize: getSize().textSub, margin:-5,}}>{getDescription()}</p> }
                        {(size == 3) &&
                        <div>
                            <span style={{color:"#ababab", fontSize: getSize().additionalInfo}}>{getDefault(params.year, "-")} • {getDefault(params.genre, "-")} • {getDefault(params.rate, "No score")}</span>
                        </div>}
                </div>

            </div>
        </Link>
    )
}

export default MovieCard;
