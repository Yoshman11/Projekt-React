import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl } from 'react-bootstrap';

const Searchbar = (props: Props) => {
    return (
        <InputGroup className="mb-3">
            <FormControl
                className="searchbar"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="searchIcon"
                onChange={(e) => props.onChange(e)}
            />
        </InputGroup>
    );
}

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default Searchbar;
