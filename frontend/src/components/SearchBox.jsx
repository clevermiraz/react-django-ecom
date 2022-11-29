/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function SearchBox() {
    const [keyword, setKeyword] = useState('');

    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();

        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`);
        } else {
            history.push(history.push(history.location.pathname));
        }
    };

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                className="mr-sm-2 ml-sm-5"
            />
            <Button type="submit" variant="outline-success" className="p-2">
                Submit
            </Button>
        </Form>
    );
}
