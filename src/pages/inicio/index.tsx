import { Grid, Typography, Paper, Box, Card, CardContent, CardMedia, Button } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';  // Importamos Swiper y SwiperSlide
import 'swiper/swiper-bundle.css';  // Importamos los estilos de Swiper

import snickerImage from 'assets/snicker.jpg';
import cremaImage from 'assets/crema.jpg';
import dulceImage from 'assets/dulce.jpg';
import yogurtImage from 'assets/yogurt.jpg';
import biancaflorgImage from 'assets/biancaflorg.jpg';
import acaiImage from 'assets/acai.jpg';

const Inicio = () => {
  return (
    <Grid container spacing={3} mb={3}>
      {/* ------------- Sección de Bienvenida ---------------- */}
      <Grid item xs={12}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            textAlign: "center",
            backgroundColor: "#f3f4f6",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              color: "#2b2b2b",
              fontWeight: "600", // Fuente más negrita para darle más impacto
            }}
          >
            ¡Bienvenido a Biancaflor!
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            sx={{ fontStyle: "italic", fontFamily: "'Poppins', sans-serif" }}
          >
            Sabor y tradición artesanal en cada bocado.
          </Typography>
        </Paper>
      </Grid>

      {/* ------------- Sección de Productos Destacados ---------------- */}
      <Grid item xs={12}>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: "#00796b", fontWeight: "600", fontFamily: "'Poppins', sans-serif" }}
          >
            Explora nuestros productos
          </Typography>

          {/* Usamos Swiper para hacer un carrusel deslizable */}
          <Swiper
            spaceBetween={10}  // Espacio entre los elementos del slider
            slidesPerView={3}  // Número de productos visibles en el slider
            loop={true}  // Hace que el slider sea infinito
            pagination={{ clickable: true }}  // Habilita la paginación
            breakpoints={{
              320: {
                slidesPerView: 1,  // Muestra un producto a la vez en pantallas pequeñas
              },
              600: {
                slidesPerView: 2,  // Muestra dos productos en pantallas medianas
              },
              900: {
                slidesPerView: 3,  // Muestra tres productos en pantallas grandes
              },
              1200: {
                slidesPerView: 4,  // Muestra cuatro productos en pantallas muy grandes
              }
            }}
          >
            {/* Aquí agregamos cada producto dentro de un SwiperSlide */}
            <SwiperSlide>
              <Card sx={{ width: 250 }}>
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: "cover", borderRadius: "10px" }}
                  image={snickerImage}  // Asegúrate de reemplazar con la ruta de la imagen
                  alt="Gelato Snicker"
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Gelato Snicker
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card sx={{ width: 250 }}>
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: "cover", borderRadius: "10px" }}
                  image={biancaflorgImage}  // Asegúrate de reemplazar con la ruta de la imagen
                  alt="Gelato Biancaflor"
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Gelato Biancaflor
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card sx={{ width: 250 }}>
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: "cover", borderRadius: "10px" }}
                  image={dulceImage}  // Asegúrate de reemplazar con la ruta de la imagen
                  alt="Gelato Dulce de Leche"
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Gelato Dulce de Leche
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card sx={{ width: 250 }}>
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: "cover", borderRadius: "10px" }}
                  image={cremaImage}  // Asegúrate de reemplazar con la ruta de la imagen
                  alt="Gelato Crema Americana"
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Gelato Crema Americana
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card sx={{ width: 250 }}>
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: "cover", borderRadius: "10px" }}
                  image={yogurtImage}  // Asegúrate de reemplazar con la ruta de la imagen
                  alt="Gelato Yogurt Griego"
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Gelato Yogurt Griego
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card sx={{ width: 250 }}>
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: "cover", borderRadius: "10px" }}
                  image={acaiImage}  // Asegúrate de reemplazar con la ruta de la imagen
                  alt="Gelato Açaí"
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Gelato Açaí
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          </Swiper>
        </Box>
      </Grid>

      {/* ------------- Sección de Promociones ---------------- */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#f3f4f6", textAlign: "center" }}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ color: "#00796b", fontWeight: "600", fontFamily: "'Poppins', sans-serif" }}
          >
            Promociones Especiales
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontFamily: "'Poppins', sans-serif" }}>
            Mantente al tanto de nuestras promociones especiales y eventos donde podrás disfrutar de descuentos exclusivos y ofertas irresistibles.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href="#promociones"
            sx={{ padding: "10px 20px", fontFamily: "'Poppins', sans-serif" }}
          >
            Ver promociones
          </Button>
        </Paper>
      </Grid>

      {/* ------------- Sección de Testimonios ---------------- */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#f3f4f6", textAlign: "center" }}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ color: "#00796b", fontWeight: "600", fontFamily: "'Poppins', sans-serif" }}
          >
            Lo que dicen nuestros clientes
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontFamily: "'Poppins', sans-serif" }}>
            "El mejor helado que he probado. Los sabores son únicos y deliciosos. ¡Totalmente recomendado!" – Cliente satisfecho
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Inicio;
