# Olympic Games Dashboard

## Présentation

Cette application Angular permet de visualiser des données olympiques à l’aide d'indicateurs et des graphiques interactifs. 
Elle repose sur une architecture modulaire séparant clairement les pages, les composants d’affichage et la logique métier afin de garantir la lisibilité, la maintenabilité et l’évolutivité du projet.

## Prérequis et Installation 

#### Prérequis : 
- Node.js 
- Angular CLI

#### Installation :
1. Cloner le dépôt :
```bash
git clone https://github.com/fennecdevsolutions/OpenClassrooms_P1_Refactoring.git
```

2. Lancer le serveur de development :
```bash
ng serve
```

3. Accéder à l'application 
```bash
http://localhost:4200
```

#### Structure du projet

L’application est organisée autour de :

- Pages : composants conteneurs responsables de la récupération des données et de la navigation
- Composants d’affichage : composants de présentation (header, charts)
- Service de données : centralisation de la récupération et du traitement des données

Cette organisation permet une séparation claire des responsabilités et facilite l’évolution du projet.

## Description et Fonctionnalités

Une fois l'application lancée, le dashboard s'affiche et contient deux parties principales :
- Un header contenant le titre et des indicateurs sous forme de cartes (nombre de JO et nombre de pays participants)
- Un Pie Chart interactif affichant le nombre total de médailles par pays.

En cliquant sur la portion du pie chart représentant un pays, l'application vous redirigera vers la page dédiée à ce pays contenant aussi deux parties principales : 
- Un header des indicateurs spécifiques au pays sélectionné (nombre de participation, nombre de médailles, nombre d'athlètes)
- Un Line Chart affichant les médailles gagnées par JO.
- Il est possible de revenir vers le dashboard en utilisant le bouton "Go back"

Il est aussi possible de naviguer directement vers la page de chaque pays en utilisant l'URL dédiée (remplacer "nom_du_pays" par le nom du pays): 
```bash
http://localhost:4200/country/"nom_du_pays"
```

Par exemple : 
```bash
http://localhost:4200/country/France
```

