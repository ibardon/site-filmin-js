import { pubSub } from "../shared/pubSub.js";
import AdsListService from "./AdListService.js";
import {
  buildAdView,
  buildAdListSpinnerView,
  buildNotFoundAdsView,
} from "./AdListView.js";

export class AdListController {
  adListElement = null;

  // constructor(adListElement, notificationController) {
  //   this.adListElement = adListElement;
  //   this.notificationController = notificationController;
  // }

  // TODO BORRAR
  constructor(adListElement) {
    this.adListElement = adListElement;
  }

  async showAds() {
    let ads;
    const spinnerTemplate = buildAdListSpinnerView();
    this.adListElement.innerHTML = spinnerTemplate;

    try {
      ads = await AdsListService.getAds();

      if (ads.length === 0) {
        this.adListElement.innerHTML = buildNotFoundAdsView();
      }

      for (const ad of ads) {
        const adArticleElement = document.createElement("section");
        const adTemplate = buildAdView(ad);

        adArticleElement.innerHTML = adTemplate;

        this.adListElement.appendChild(adArticleElement);
      }
    } catch (error) {
      // informar de error
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Error obteniendo los Anuncios de GualaPork"
      );
    } finally {
      const loader = this.adListElement.querySelector(".loader");
      loader.remove();
      // loader.classList.add("hidden");
    }
  }
}

/* 

misiones de un controlador:

- orquestación o intermediario entre vista y modelo.
- definir y manejar eventos
- validar datos
- gestinar errores
- desacoplamiento entre capas(vista y modelo)
- un controlador debe ocuparse de gestionar un nodo DOM
  en cuanto a datos que debe pintar y eventos que suceden
*/
