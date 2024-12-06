declare const Swal: any;

class WeatherApp {
  private donnees: {
    apiKey: string;
    latitude: number;
    longitude: number;
    timezone: number; // Décalage en secondes par rapport à UTC
    date: {
      annee: number;
      mois: number | string;
      jours: number | string;
      heures: number | string;
      minutes: number | string;
      secondes: number | string;
    };
    soleil: {
      leve: Date | number;
      couche: Date | number;
    };
  };
  

  constructor(apiKey: string) {
    this.donnees = {
      apiKey,
      latitude: 0,
      longitude: 0,
      timezone: 0,
      date: {
        annee: 0,
        mois: 0,
        jours: 0,
        heures: 0,
        minutes: 0,
        secondes: 0,
      },
      soleil: {
        leve: 0,
        couche: 0,
      },
    };

    setInterval(() => this.updateLocalTime(), 1000);
    this.setupSearchHandler();
  }

  private updateTimeDisplay() {
    const timeActElement = document.getElementById("time-act");
    if (timeActElement) {
      timeActElement.textContent = this.getTime().join(" : ");
    }
  }

  public getTime(): string[] {
    const date = new Date();
    this.donnees.date.annee = date.getFullYear();
    this.donnees.date.mois = date.getMonth() + 1;
    this.donnees.date.jours = date.getDate();
    this.donnees.date.heures = date.getHours();
    this.donnees.date.minutes = date.getMinutes();
    this.donnees.date.secondes = date.getSeconds();

    this.donnees.date.mois =
      this.donnees.date.mois < 10
        ? `0${this.donnees.date.mois}`
        : this.donnees.date.mois;
    this.donnees.date.jours =
      this.donnees.date.jours < 10
        ? `0${this.donnees.date.jours}`
        : this.donnees.date.jours;
    this.donnees.date.heures =
      this.donnees.date.heures < 10
        ? `0${this.donnees.date.heures}`
        : this.donnees.date.heures;
    this.donnees.date.minutes =
      this.donnees.date.minutes < 10
        ? `0${this.donnees.date.minutes}`
        : this.donnees.date.minutes;
    this.donnees.date.secondes =
      this.donnees.date.secondes < 10
        ? `0${this.donnees.date.secondes}`
        : this.donnees.date.secondes;

    return [
      this.donnees.date.heures as string,
      this.donnees.date.minutes as string,
      this.donnees.date.secondes as string,
    ];
  }

  public getWeatherNow() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.donnees.latitude}&lon=${this.donnees.longitude}&appid=${this.donnees.apiKey}&units=metric&lang=fr`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: any) => {
        document.getElementById(
          "location"
        )!.textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById(
          "temperature"
        )!.textContent = `${data.main.temp}°C`;
        document.getElementById("description")!.textContent =
          data.weather[0].description[0].toUpperCase() +
          data.weather[0].description.substr(1);
  
        const icon = data.weather[0].icon;
        document.title = `Météo - ${data.name}`;
        document
          .getElementById("weather_icon")!
          .setAttribute(
            "src",
            `https://openweathermap.org/img/wn/${icon}@2x.png`
          );
  
        this.donnees.soleil.leve = new Date(data.sys.sunrise * 1000);
        this.donnees.soleil.couche = new Date(data.sys.sunset * 1000);
  
        document.getElementById(
          "h_leve"
        )!.textContent = `${this.donnees.soleil.leve.getHours()}:${this.donnees.soleil.leve.getMinutes()}`;
        document.getElementById(
          "h_couche"
        )!.textContent = `${this.donnees.soleil.couche.getHours()}:${this.donnees.soleil.couche.getMinutes()}`;
  
        // Stockez le timezone pour ajuster l'heure locale
        this.donnees.timezone = data.timezone;
  
        this.updateSunPosition();
        this.updateLocalTime(); // Mettez à jour l'heure locale
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }

  private updateLocalTime() {
    const currentTime = new Date();
    
    // Décalage local en millisecondes
    const localOffset = this.donnees.timezone * 1000;
  
    // Ajustez l'heure à partir d'UTC
    const localTime = new Date(currentTime.getTime() + localOffset);
  
    // Formatez l'heure
    const hours = localTime.getUTCHours().toString().padStart(2, "0");
    const minutes = localTime.getUTCMinutes().toString().padStart(2, "0");
    const seconds = localTime.getUTCSeconds().toString().padStart(2, "0");
  
    // Affichez l'heure locale
    const timeActElement = document.getElementById("time-act");
    if (timeActElement) {
      timeActElement.textContent = `${hours} : ${minutes} : ${seconds}`;
    }
  }  

  public getWeatherForecast() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.donnees.latitude}&lon=${this.donnees.longitude}&appid=${this.donnees.apiKey}&units=metric&cnt=8&lang=fr`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: any) => {
        const prevision = data.list.map((elem: any) => {
          const date = new Date(elem.dt * 1000);
          const desc = elem.weather[0].description;
          return `<li>
                        <img src="${`https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`}"/>
                        <div class="secondaire"><p>${
                          date.getUTCDate() === this.donnees.date.jours
                            ? "Aujourd'hui"
                            : "Demain"
                        } - ${
            date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
          }:00</p><p>${elem.main.temp}°C</p><p>${
            desc[0].toUpperCase() + desc.substr(1)
          }</p>
                      </li>`;
        });

        document.getElementById("previsions")!.innerHTML = prevision.join("");
      });
  }

  /**
   * Gestion du cadrant solaire
   */
  private updateSunPosition() {
    const currentTime = new Date();
    const sunrise = this.donnees.soleil.leve as Date;
    const sunset = this.donnees.soleil.couche as Date;
  
    const sunriseTime = sunrise.getTime();
    const sunsetTime = sunset.getTime();
    const currentTimeValue = currentTime.getTime();
  
    let angle = 0;
  
    if (currentTimeValue >= sunriseTime && currentTimeValue <= sunsetTime) {
      const totalDaylightMinutes = (sunsetTime - sunriseTime) / 60000;
      const elapsedMinutes = (currentTimeValue - sunriseTime) / 60000;
  
      angle = (elapsedMinutes / totalDaylightMinutes) * 180;
    } else if (currentTimeValue > sunsetTime) {
      angle = 180;
    } else if (currentTimeValue < sunriseTime) {
      angle = 0;
    }
  
    const needle = document.getElementById("aiguille");
    if (needle) {
      needle.style.transform = `rotate(${angle}deg)`;
      needle.style.opacity = "1";
    }
  }
  

  /**
   * Météo a partir du nom
   * @param city 
   */
  public searchCityWeather(city: string) {
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.donnees.apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: any) => {
        if (data.length > 0) {
          this.donnees.latitude = data[0].lat;
          this.donnees.longitude = data[0].lon;
          this.getWeatherNow();
          this.getWeatherForecast();
        } else {
          Swal.fire({
            title: "Erreur",
            text: "Ville introuvable.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => console.error("Error searching city:", error));
  }

  /**
   * Pour la recherche de ville
   */
  private setupSearchHandler() {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input") as HTMLInputElement;
  
    if (searchButton && searchInput) {
      searchButton.addEventListener("click", () => {
        const city = searchInput.value.trim();
        if (city) {
          this.searchCityWeather(city);
        } else {
          Swal.fire({
            title: "Erreur",
            text: "Veuillez entrer une ville.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
  
      searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const city = searchInput.value.trim();
          if (city) {
            this.searchCityWeather(city);
          } else {
            // Swal parceque c'est jolie
            Swal.fire({
              title: "Erreur",
              text: "Veuillez entrer une ville.",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        }
      });
    }
  }
  
  /**
   * Récuperer la position actuel du client
   */
  public getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.donnees.latitude = position.coords.latitude;
          this.donnees.longitude = position.coords.longitude;
          this.getWeatherNow();
          this.getWeatherForecast();
        },
        (error) => {
          console.error("Error getting location:", error);
          Swal.fire({
            title: "Erreur!",
            text: "La géolocalisation n'est pas supportée et/ou autorisée.",
            icon: "error",
            confirmButtonText: "Je comprend",
          });
        }
      );
    } else {
      console.error("La géolocalisation n'est pas supportée et/ou autorisée.");
    }
  }
}

/**
 * Necessite que tous les elem html soit chargé
 */
document.addEventListener("DOMContentLoaded", () => {
  const app = new WeatherApp("93f4f2f761fd03a1c2b9fb32651a6994"); //Clé perso faite pas de la merde
  app.getLocation();
});
