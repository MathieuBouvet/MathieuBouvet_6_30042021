# MathieuBouvet_6_30042021
project openclassrooms n°6 - fisheye

## Avant Propos

Ce projet utilise les ES modules afin de facilter la gestion de dépendances du javascript.  
Il est donc nécéssaire de faire servir le projet par un serveur http.

Le projet inclu une dépendance de developpement, [serve](https://www.npmjs.com/package/serve), pour permettre de démarrer rapidement en local

Il est toutefois impératif d'avoir [node.js](https://nodejs.org/en/) et un gestionnaire de paquets javascript, 
comme [npm](https://www.npmjs.com) ou [yarn](https://yarnpkg.com), disponibles sur sa machine

Le résultat du projet est aussi consultable directement en ligne via github pages

## Pour démarrer

Une fois le projet cloné, il faut installer les dépendances, (ou plutôt LA dépandence, le package "serve")

### Installation avec npm
```sh
npm i
```

Pour servir le projet en local, une fois les dépendances installées :

### Lancement du serveur avec npm
```sh
npm run dev
```
Un serveur local sera lancé, écoutant sur le port 5000, et le projet sera accessible sur http://localhost:5000
