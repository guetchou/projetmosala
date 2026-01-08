import React, { useEffect, useState } from "react";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";

const API_URL = "http://localhost:4002/jobs"; // Adapter si besoin

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", company: "", location: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setJobs(data);
    } catch (e) {
      setError("Erreur lors du chargement des jobs.");
    }
    setLoading(false);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.status === 201 || data.demo) {
        setSuccess("Job ajouté (mode démo)");
        setForm({ title: "", company: "", location: "", type: "" });
        fetchJobs();
      } else {
        setError("Erreur lors de l'ajout du job.");
      }
    } catch (e) {
      setError("Erreur lors de l'ajout du job.");
    }
  };

  return (
    <>
      <DemoNavbar />
      <main ref={React.createRef()}>
        <Container className="mt-5">
          <h2>Offres d'emploi</h2>
          {loading && <p>Chargement...</p>}
          {error && <Alert color="danger">{error}</Alert>}
          {success && <Alert color="success">{success}</Alert>}
          <Row>
            {jobs.map((job, idx) => (
              <Col md="4" key={idx} className="mb-4">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{job.title}</CardTitle>
                    <CardText>
                      <b>Entreprise :</b> {job.company}<br />
                      <b>Lieu :</b> {job.location}<br />
                      <b>Type :</b> {job.type}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <h3 className="mt-5">Ajouter une offre</h3>
          <Form onSubmit={handleSubmit} className="mb-5">
            <FormGroup>
              <Label for="title">Titre</Label>
              <Input name="title" value={form.title} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="company">Entreprise</Label>
              <Input name="company" value={form.company} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="location">Lieu</Label>
              <Input name="location" value={form.location} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="type">Type</Label>
              <Input name="type" value={form.type} onChange={handleChange} required />
            </FormGroup>
            <Button color="primary" type="submit">Ajouter</Button>
          </Form>
        </Container>
        <CardsFooter />
      </main>
    </>
  );
} 