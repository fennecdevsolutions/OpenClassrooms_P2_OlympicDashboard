# 1. ARBORESCENCE DES DOSSIERS
```text
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   │   ├── header.component.html
│   │   │   ├── header.component.scss
│   │   │   └── header.component.ts
│   │   ├── line-chart/
│   │   │   ├── line-chart.component.html
│   │   │   ├── line-chart.component.scss
│   │   │   └── line-chart.component.ts
│   │   └── pie-chart/
│   │       ├── pie-chart.component.html
│   │       ├── pie-chart.component.scss
│   │       └── pie-chart.component.ts
│   ├── models/
│   │   └── interfaces.ts
│   ├── pages/
│   │   ├── country/
│   │   │   ├── country.component.html
│   │   │   ├── country.component.scss
│   │   │   └── country.component.ts
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.html
│   │   │   ├── dashboard.component.scss
│   │   │   └── dashboard.component.ts
│   │   └── not-found/
│   │       ├── not-found.component.html
│   │       ├── not-found.component.scss
│   │       └── not-found.component.ts
│   ├── services/
│   │   └── data.service.ts
│   ├── app-routing.module.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.ts
│   └── app.module.ts
├── assets/
│   ├── images/
│   └── mock/
│       └── olympic.json
├── environments/
├── favicon.ico
├── index.html
├── main.ts
├── polyfills.ts
└── styles.scss
```

# 2. DESCRIPTION DES COMPOSANTS ET SERVICES

## 2.1. LES COMPOSANTS

### Les Pages
- DashboardComponent, CountryComponent et NotFoundComponent regroupés dans le dossier "app/pages"
- Ce sont des conteneurs permettant de porter les composants d'affichage (Header, lineChart et PieChart)
- On leur injecte le service de données (DataService), ce qui permet la récupération des données et les passer au bon format aux composants enfants d'affichage. 
- Les pages permettent aussi la navigation sur évènement (click sur le pie chart) ou avec router link.

### Les Composants d'Affichage
- HeaderComponent, LineChartComponent et PieChartComponent regroupés dans "app/components".
- Ces composants sont intégrés dans le HTML des pages et récupèrent les données avec des "Inputs"
- Ils ont aussi comme fonction la création des charts avec la librairie Chart.js.   
- Le PieChartComponent a pour particularité l'émission d'un event pour que le DashboardComponent puisse naviguer vers la page country selon la portion cliquée du pie.
- Le HeaderComponent affiche le titre de la page et des "Cards" contenant les noms d'indicateurs et leurs valeurs. @For est utilisé dans le HTML pour créer les cards à afficher dont les labels et les valeurs changent selon la page. 

## 2.2. LES SERVICES ET INTERFACES

### Data Service
- Un seul service utilisé dans ce projet pour la récupération des données du fichier JSON en utilisant le client HTTP.
- Le service fait aussi le traitement métier des données pour obtenir la data requise par tous les composants.
- Les données traités sont accessibles par les composants sous forme d'observables typés (DashboardData, CountryData)
- le DataService est stocké dans le dossier "app/services" ou tout changement ou ajout de services sera implémenté (ex. API REST )

### Interface
- Les interfaces sont définis dans le dossier "app/models"
- Les types Participation et Olympic permettent la récupération des données JSON de la part du DataService
- Les types DashboardData et CountryData facilitent la récupération des observables des données traités par le DashboardComponent et CountryComponent.
- Le type HeaderData est utilisé pour passer les labels et les valeurs des composants pages vers le HeaderComponent nécéssaires à l'affichages des cartes des indicateurs.



