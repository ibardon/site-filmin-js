export function buildAdView(ad) {
  const adDetailView = buildAdDetailView(ad);
  let adTemplate = `
    <a href="/ad-detail.html?id=${ad.id}">
      ${adDetailView}
    </a>
  `;
  return adTemplate;
}

export function buildAdDetailView(ad) {
  const currentTime = new Date(ad.updatedAt).toLocaleString();
  const adTemplate = `
    <h1>${ad.title || "Sin Título"} </h1>
    <p>${ad.slugline || "No Slugline"}</p>
    <p>${ad.description || "Sin Descripción"}</p>
    <p>${
      ad.image ||
      `<img src="https://ibaru.es/wp-content/uploads/logo.png" width="75" height="75">`
    }</p>
    <p>${currentTime || 0}</p>
  `;
  return adTemplate;
}

export function buildAdListSpinnerView() {
  return `<div class="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`;
}

export function buildNotFoundAdsView() {
  return `
    <h1>Ooops!!! no hay ningún ads!!! =(</h1>
  `;
}
