import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Create = () => {
    const [inputObject, setInputObject] = useState({
        Title: '',
        Price: '',
        Description: ''
    });
    const [errors, setErrors] = useState([]);

    const handleInputs = (e) => {
        setInputObject({
            ...inputObject,
            [e.target.name]: e.target.value
        });
    };

    const SubmitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/product/', inputObject)
            .then((res) => {
                console.log(res.data);
                //set post request to "" to clear our Form after sucessfully submission 
                setInputObject({
                    Title: '',
                    Price: '',
                    Description: '' 
                })
            })
            .catch((err) => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message);
                }
                setErrors(errorArr);
            });
    };

    return (
        <div>
            <Form onSubmit={SubmitHandler}>
                {errors.map((err, index) => (
                    <p key={index} className="text-danger">
                        {err}
                    </p>
                ))}
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control className="form-control" name="Title" onChange={handleInputs} value={inputObject.Title} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control className="form-control" name="Price" onChange={handleInputs} value={inputObject.Price} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control className="form-control" name="Description" onChange={handleInputs} value={inputObject.Description} />
                </Form.Group>

                <Button variant="primary" type="submit">Create</Button>
            </Form>
        </div>
    );
};

export default Create;
