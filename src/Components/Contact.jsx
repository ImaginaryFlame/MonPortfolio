import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import contactImg from '../assets/img/contact-img.svg';

export const Contact = () => {
    const formInitialDetails = {
        nom: '',
        prenom: '',
        email: '',
        téléphone: '',
        sujet: '',
        message: '',
    });

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Envoyer');
    const [status, setStatus] = useState({});;

    const onFormUpdate = (category, value) => {
    setFormDetails({
        ...formDetails,
        [category]: value
    });
};

const handleSubmit = () => {

    return (
        <section className="contact" id="contact">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                    <img src={contactImg} alt="Contactez-moi" />
                    </Col>
                    <Col md={6}>
                    <h2> Get In Touch</h2>
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                              <input type="text" value={formDetails.firstName} placeholder="Nom" onChange={(e) => setFormDetails({...formDetails, 'firstName', e.target.value})} />
                            </Col>
                            <Col sm={6} className="px-1">
                                <input type="text" value={formDetails.lastName} placeholder="Prénom" onChange={(e) => setFormDetails({...formDetails, 'lastName', e.target.value})} />
                            </Col>
                            <Col md={6}>
                                <input type="email" value={formDetails.email} placeholder="Email" onChange={(e) => setFormDetails({...formDetails, 'email', e.target.value})} />
                            </Col>
                            <Col md={6}>
                                <input type="tel" value={formDetails.phone} placeholder="Téléphone" onChange={(e) => setFormDetails({...formDetails, 'phone', e.target.value})} />
                            </Col>
                            <Col 
                             <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => setFormDetails({...formDetails, 'message', e.target.value})} />
                             <button type="submit"><span>{buttonText}</span></button>
                            </Col>
                            }

                            status.message &&
                            <Col>
                                <p className={status.status === false ? "danger" : "success"}>{status.message}</p>
                            </Col>
                        </Row>
                    </form>
                    </p>
                    <Form>
                        
                    </Col>
                </Row>
            </Container>
        </section>
        <div>
            <h1>Contact</h1>
        </div>
    );
};