import { signupService } from "../signup/SignupService.js";

export default {
  async getAds() {
    const url = "http://localhost:8000/api/ads";
    let response;
    let ads;

    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error("No se puede recuperar el id del origen de datos");
    }

    if (!response.ok) {
      throw new Error("Anuncios no encontrados en el origen de datos");
    }

    try {
      ads = await response.json();
    } catch (error) {
      throw new Error(
        "No he podido transformar la respuesta a json del origen de datos"
      );
    }
    return ads;
  },

  async getAd(adId) {
    let url = `http://localhost:8000/api/ads/${adId}`;
    let response;
    let ad;
    try {
      // response = await fetch(url, {
      //   method: "GET",
      // });
      // console.log(response);
      const httpResponse = await fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await httpResponse.json();
    } catch (error) {
      throw new Error("No se puede recuperar el id del origen de datos");
    }

    if (!response.ok) {
      throw new Error("Anuncio no encontrados en el origen de datos");
    }

    try {
      ad = await response.json();
    } catch (error) {
      throw new Error(
        "no he podido transformar la respuesta a json del origen de datos"
      );
    }

    return ad[0];
  },

  async deleteAd(adId) {
    const url = `http://localhost:8000/api/ads/${adId}`;

    let response;

    try {
      response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + signupService.getLoggedUser(),
        },
      });
    } catch (error) {
      throw new Error("No he podido borrar el ads");
    }

    if (!response.ok) {
      throw new Error("Ads no encontrado");
    }
  },
};

/*

responsabilidad del modelo:

- abstraer al controlador y a la vista de la procedencia de los datos.

*/
