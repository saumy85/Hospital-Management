import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReadMoreLess from "./ReadMore";
//import "../Css.css"
const ServiceDetails = () => {
  const mainData = [
    {
      id: 1,
      class: "",
      treatment: "Cardiology",
      price: 15000,
      description:
        "Keeping your heart strong and healthy is crucial to your overall well-being. Our cardiology services are here to help you manage and treat your heart health no matter what you might need.",
      icon: "https://i.ibb.co/DpVdYqQ/heart-2.png",
      service_img: "https://i.ibb.co/rG0TSwX/01.jpg",
    },
    {
      id: 2,
      class: "animation",
      treatment: "Neurology",
      price: 25000,
      description:
        "Neurology is the branch of medicine concerned with the study and treatment of disorders of the nervous system. The nervous system is a complex, sophisticated system that regulates and coordinates body activities. It has two major divisions: Central nervous system: the brain and spinal cord.",
      icon: "https://i.ibb.co/nzHc2t7/brain-2.png",
      service_img: "https://i.ibb.co/Bn2GG0N/06.jpg",
    },
    {
      id: 3,
      class: "",
      treatment: "Stomach",
      price: 3000,
      description:
        "What is the stomach? The stomach is a J-shaped organ that digests food. It produces enzymes (substances that create chemical reactions) and acids (digestive juices). This mix of enzymes and digestive juices breaks down food so it can pass to your small intestine. Your stomach is part of the gastrointestinal (GI) tract.",
      icon: "https://i.ibb.co/Ks1jsVf/stomach-2.png",
      service_img: "https://i.ibb.co/CK7Y2DD/03.jpg",
    },
    {
      id: 4,
      class: "",
      treatment: "Covid 19",
      price: 100,
      description:
        "Most people infected with the virus will experience mild to moderate respiratory illness and recover without requiring special treatment. However, some will become seriously ill and require medical attention. Older people and those with underlying medical conditions like cardiovascular disease, diabetes, chronic respiratory disease, or cancer are more likely to develop serious illness. Anyone can get sick with COVID-19 and become seriously ill or die at any age.",
      icon: "https://i.ibb.co/NWKjgmj/virus-2.png",
      service_img: "https://i.ibb.co/3FS3B8h/08.jpg",
    },
    {
      id: 5,
      class: "animation",
      treatment: "Lungs",
      price: 9000,
      description:
        "The lungs are a pair of spongy, air-filled organs located on either side of the chest (thorax). The trachea (windpipe) conducts inhaled air into the lungs through its tubular branches, called bronchi. The bronchi then divide into smaller and smaller branches (bronchioles), finally becoming microscopic.",
      icon: "https://i.ibb.co/w0Mh2Jf/lungs.png",
      service_img: "https://i.ibb.co/q9SM3XT/10.jpg",
    },
    {
      id: 6,
      class: "",
      treatment: "Bronchus",
      price: 1800,
      description:
        "(BRON-kus) A large airway that leads from the trachea (windpipe) to a lung. The plural of bronchus is bronchi. Enlarge. Anatomy of the respiratory system, showing the trachea and both lungs and their lobes and airways.",
      icon: "https://i.ibb.co/yyPd0N8/bronchus.png",
      service_img: "https://i.ibb.co/dDsVnnZ/09.jpg",
    },
    {
      id: 7,
      class: "",
      treatment: "Vaccine",
      price: 0,
      description:
        "Safe and effective vaccines are available that provide strong protection against serious illness, hospitalization and death from COVID-19. Billions of people have been vaccinated against COVID-19. Getting vaccinated is one of the most important things you can do to protect yourself against COVID-19, help end the pandemic and stop new variants emerging. Take all COVID-19 vaccine doses recommended to you by your health authority as soon as it is your turn, including a booster dose if recommended.",
      icon: "https://i.ibb.co/NWKjgmj/virus-2.png",
      service_img: "https://i.ibb.co/02FMz1F/02.jpg",
    },
  ];
  const { servId } = useParams();
  const [service, setServices] = useState([]);
  //const mainData = useData();
  let services = mainData;
  console.log(services);
  // handle undifined problem in mapping data
  useEffect(() => {
    setServices(services);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        color: "primary.main",
        p: 2,
        mb: 2,
        textAlign: "center",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          style={{
            color: "black",
            fontSize: "32px",
            fontFamily: "Montserrat, sans-serif ",
          }}
          sx={{ mt: 2, mb: 2, fontWeight: 600 }}
          variant="h6"
        >
          Why Choose Our Medical
        </Typography>
        <Typography
          style={{
            color: "black",
            fontFamily: "Montserrat, sans-serif",
            letterSpacing: "2px",
            fontSize: "20px",
          }}
          sx={{ mb: 8, fontWeight: 600 }}
          variant="h5"
        >
          Breakthrough in Comprehensive, Flexible Care Delivery Models
        </Typography>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          container
          spacing={5}
        >
          {services.map((service, idx) => {
            return (
              <Grid key={service.id} item xs={6} md={4} lg={4}>
                <Card
                  sx={{
                    mx: "auto",
                    maxWidth: 550,
                    transition: "0.5s all ease-in-out",
                    ":hover": {
                      boxShadow: 10,
                    },
                    img: { transition: "0.5s all ease-in-out" },
                    ":hover img": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      width="100%"
                      height="250px"
                      image={service?.service_img}
                      alt="card image of service"
                    />
                    <CardContent sx={{ display: "flex" }}>
                      <Avatar
                        width="50px"
                        hight="50px"
                        alt="service icon"
                        src={service?.icon}
                        sx={{
                          width: 40,
                          height: 40,
                        }}
                      />
                      <Typography variant="h5" component="div">
                        Consult for {service.treatment}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Typography
                      sx={{ p: 2 }}
                      align="justify"
                      gutterBottom
                      variant="p"
                      component="div"
                    >
                      <ReadMoreLess>{service.description}</ReadMoreLess>
                    </Typography>
                  </CardActions>
                  <Typography gutterBottom variant="h6" component="div">
                    Consult fee {service.price}
                  </Typography>
                  <HashLink smooth to="/appointment" className="text-style">
                    <Button
                      style={{ backgroundColor: " #0e8797" }}
                      sx={{ mt: 2, mb: 2 }}
                      variant="contained"
                      className="CheckButton"
                    >
                      Make an Appointment
                      <AddCircleIcon />
                    </Button>
                  </HashLink>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <HashLink smooth to="#" className="text-style">
          {" "}
          <Button
            style={{ backgroundColor: " #0e8797" }}
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            sx={{ mb: 5, mt: 5 }}
          >
            Back to Home
          </Button>
        </HashLink>
      </Container>
    </Box>
  );
};

export default ServiceDetails;
