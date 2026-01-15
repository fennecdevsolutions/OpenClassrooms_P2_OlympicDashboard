# Étape 1 — Analyse du code existant

## 1. Contexte du projet

Le projet est une application Angular qui affiche des statistiques sur les Jeux Olympiques.
Elle comprend :
- une page d’acceuil affichant des statistiques globales et un graphique (Pie chart),
- une page de détail par pays avec graphique (line chart) ,
- une page « not found ».

Les données sont actuellement stockées dans un fichier JSON statique :
assets/mock/olympic.json.

---

## 2. Structure actuelle du projet

Structure principale de l'application :

src/app/
- pages/
  - home/
    - home.component.html
    - home.component.scss
    - home.component.ts
  - country/
    - country.component.html
    - country.component.scss
    - country.component.ts
  - not-found/
    - not-found.component.html
    - not-found.component.scss
    - not-found.component.ts
- app.module.ts
- app.component.html
- app-routing.module.ts

## 3. Analyse de l'architecture actuelle

- Chaque type de page est géré par une component (home, country, not-found)
- le AppComponent ne contient que le router-outlet

- Chaque page component gère plusieurs fonctions : 
  - HomeComponent contient les fonctions suivantes :
    - Récupération des données du fichier JSON avec des appels HTTP
    - Affichage des données globales et génération du pie chart
    - Navigation vers CountryComponent
  
  - CountryComponent contient les fonctions suivantes :
    - Récupération des données du fichier JSON avec des appels HTTP
    - Calcull et affichage des données par pays et génération du line chart
    - Router link permettant le retour à HomeComponent

  - NotFoundComponent contient les fonctions suivantes :
    - Affichage d'un message "page not found"
    - Router link permettant le retour à HomeComponent

- Les styles sont déclarés dans le fichier styles.scss accessible par tous les components.CountryComponent et NotFoundComponent contiennent des définitions de styles dans leurs fichiers scss spécifiques.

## 4 Test Fonctionnel

L'application compile sans erreurs et accessible avec le serveur de developpement (ng serve). 
La page Home se lance correctement avec un affichage des données globales et le pie chart dynamique. Le titre de l'application est un h2 simple, pas très compatible avec le style du reste de l'application.

En cliquant sur un pays dans le graphique pie chart, l'utilisateur est dirigé vers la page spécifique de ce pays. Les données du pays s'affiche correctment mais le titre de l'application disparait. Un bouton "Go back" permet de retourner à la page d'acceuil. Il est possible de naviguer directement par lien vers la page d'un pays (ex: http://localhost:4200/country/France).
Un bug constaté lors de la navigation par lien vers la page d'espagne (http://localhost:4200/country/Spain), le CountryComponent se charge mais les données ne s'affichent pas. Ce comportement est aussi constaté pour les liens en dehors des pays existants dans la data (ex: http://localhost:4200/country/Test ou ex: http://localhost:4200/country/Belgium)

la page Not-found s'affiche quand on veut naviguer vers un lien inexistant (ex: http://localhost:4200/lien_non_existant), on peut y accèder manuellement avec les liens suivants : 
- http://localhost:4200/**
- http://localhost:4200/not-found


Résumé des problèmes fonctionnels :
- Style du titre de l'application et sa disparition dans la page country
- Bug d'affichage lors de la navigation par lien vers la page d'espagne
- Affichage de la page country sans data quand lors de la navigation vers la page d'un pays non-existant dans la data.


## 5 Analyse du code

Le code contient plusieurs anti-pattern et mauvaises pratiques : 
- Violation de la responsabilité unique: affichage, logique métier et appels HTTP dans HomeComponent et CountryComponent
- Navigation intégré dans les logiques dans HomeComponent
- Gestion des erreurs dans les components (HTTPErrorResponse)
- Absence de typage strict, utilisation de any (ex this.http.get<any[]>(this.olympicUrl))
- Pas de service centralisé pour la récupération de données, chaque component récupère directement le fichier JSON 
- Présence de code de déboggage : 
  - console.log(`erreur : ${error}`);
  - console.log(`Liste des données : ${JSON.stringify(data)}`);

# Étape 2 — Proposition d'une Nouvelle Architecture

La nouvelle architecture prépare la connexion à une API backend et repose sur les design pattern étudiés pour assurer une application scalable et maintenable. Cette architecture a aussi pour objectif de corriger les problèmes constatés dans l'étape 1, notamment : 
- la surcharge des components,
- l’absence de séparation claire des responsabilités,
- l’absence de service centralisé pour l’accès aux données,
- le manque de typage strict.

## 1 Arborescence 

src/app/
- components/
  - HeaderComponent.ts
  - HeaderComponent.html
  - HeaderComponent.scss
  - ChartComponent.ts
  - ChartComponent.html
  - ChartComponent.scss
-templates/
  - IndicatorCard.ts 
- services/
  - data.service.ts
- models/
  - interfaces.ts
- pages/
  - dashboard/
    - dashboard.component.html
    - dashboard.component.scss
    - dashboard.component.ts
  - country/
    - country.component.html
    - country.component.scss
    - country.component.ts
  - not-found/
    - not-found.component.html
    - not-found.component.scss
    - not-found.component.ts
- app.module.ts
- app.component.html
- app-routing.module.ts

## 2 Description

- Pages: des contenaires permettant d'afficher une instance du HeaderComponent et ChartComponent. Ils permettent aussi la navigation d'une page à l'autre. 
- HeaderComponent: permet l'affichage selon la page du titre et des indicateurs en s'appuyant sur la template IndicatorCard.
- ChartComponent : responsable de l'affichage des charts selon le type (pie ou line).
- data.service.ts: un singleton centralisant les requettes HTTP et la distribution des données à tout les components de l'application.
- interfaces.ts : contient les modèles de données pour normaliser la communication entre data.service et les components.

Cette organisation permet de limiter la logique métier dans les pages et d’améliorer la maintenabilité de l’application.



