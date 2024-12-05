"use strict";
class WeatherApp {
    donnees;
    constructor(apiKey) {
        this.donnees = {
            apiKey,
            latitude: 0,
            longitude: 0,
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
        setInterval(() => this.updateTimeDisplay(), 500);
    }
    updateTimeDisplay() {
        const timeActElement = document.getElementById("time-act");
        if (timeActElement) {
            timeActElement.textContent = this.getTime().join(" : ");
        }
    }
    getTime() {
        const date = new Date();
        this.donnees.date.annee = date.getFullYear();
        this.donnees.date.mois = date.getMonth() + 1;
        this.donnees.date.jours = date.getDate();
        this.donnees.date.heures = date.getHours();
        this.donnees.date.minutes = date.getMinutes();
        this.donnees.date.secondes = date.getSeconds();
        // Beautification
        this.donnees.date.mois =
            this.donnees.date.mois < 10 ? `0${this.donnees.date.mois}` : this.donnees.date.mois;
        this.donnees.date.jours =
            this.donnees.date.jours < 10 ? `0${this.donnees.date.jours}` : this.donnees.date.jours;
        this.donnees.date.heures =
            this.donnees.date.heures < 10 ? `0${this.donnees.date.heures}` : this.donnees.date.heures;
        this.donnees.date.minutes =
            this.donnees.date.minutes < 10 ? `0${this.donnees.date.minutes}` : this.donnees.date.minutes;
        this.donnees.date.secondes =
            this.donnees.date.secondes < 10 ? `0${this.donnees.date.secondes}` : this.donnees.date.secondes;
        return [
            this.donnees.date.heures,
            this.donnees.date.minutes,
            this.donnees.date.secondes,
        ];
    }
    getWeatherNow() {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.donnees.latitude}&lon=${this.donnees.longitude}&appid=${this.donnees.apiKey}&units=metric&lang=fr`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
            document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").textContent = `${data.main.temp}°C`;
            document.getElementById("description").textContent =
                data.weather[0].description[0].toUpperCase() +
                    data.weather[0].description.substr(1);
            const icon = data.weather[0].icon;
            document.title = `Météo - ${data.name}`;
            document.getElementById("weather_icon").setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
            this.donnees.soleil.leve = new Date(data.sys.sunrise * 1000);
            this.donnees.soleil.couche = new Date(data.sys.sunset * 1000);
            document.getElementById("h_leve").textContent = `${this.donnees.soleil.leve.getHours()}:${this.donnees.soleil.leve.getMinutes()}`;
            document.getElementById("h_couche").textContent = `${this.donnees.soleil.couche.getHours()}:${this.donnees.soleil.couche.getMinutes()}`;
            this.updateSunPosition();
        })
            .catch((error) => console.error("Error fetching weather data:", error));
    }
    getWeatherForecast() {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.donnees.latitude}&lon=${this.donnees.longitude}&appid=${this.donnees.apiKey}&units=metric&cnt=8&lang=fr`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
            const prevision = data.list.map((elem) => {
                const date = new Date(elem.dt * 1000);
                const desc = elem.weather[0].description;
                return `<li>
                        <img src="${`https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`}"/>
                        <div class="secondaire"><p>${date.getUTCDate() === this.donnees.date.jours
                    ? "Aujourd'hui"
                    : "Demain"} - ${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:00</p><p>${elem.main.temp}°C</p><p>${desc[0].toUpperCase() + desc.substr(1)}</p>
                      </li>`;
            });
            document.getElementById("previsions").innerHTML = prevision.join("");
        });
    }
    updateSunPosition() {
        const act = new Date();
        if (act < this.donnees.soleil.leve || act > this.donnees.soleil.couche) {
            document.getElementById("aiguille").style.opacity = "0";
        }
        else {
            const heure = act.getHours() - this.donnees.soleil.leve.getHours();
            const minute = act.getMinutes() - this.donnees.soleil.leve.getMinutes();
            const tot = heure * 60 + minute;
            document.getElementById("aiguille").style.transform = `rotate(${-20 + (tot % 180)}deg)`;
        }
    }
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.donnees.latitude = position.coords.latitude;
                this.donnees.longitude = position.coords.longitude;
                this.getWeatherNow();
                this.getWeatherForecast();
            }, (error) => console.error("Error getting location:", error));
        }
        else {
            console.error("La géolocalisation n'est pas supportée et/ou autorisée.");
        }
    }
}
// Utilisation de la classe
const app = new WeatherApp("93f4f2f761fd03a1c2b9fb32651a6994");
app.getLocation();
