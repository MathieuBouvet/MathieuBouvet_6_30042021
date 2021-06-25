# MathieuBouvet_6_30042021
project openclassrooms n°6 - fisheye

## Avant Propos

Ce projet utilise les ES modules afin de facilter la gestion de dépendances du javascript.  
Il est donc nécéssaire de faire servir le projet par un serveur http.

Le projet inclu une dépendance de developpement, [serve](https://www.npmjs.com/package/serve), pour permettre de démarrer rapidement en local.  

Il est toutefois impératif d'avoir [node.js](https://nodejs.org/en/) et un gestionnaire de paquets javascript, 
comme [npm](https://www.npmjs.com) ou [yarn](https://yarnpkg.com), disponibles sur sa machine

Le résultat du projet est aussi consultable directement en ligne via github pages : https://mathieubouvet.github.io/MathieuBouvet_6_30042021/

Pour ce projet, une librarie js a été créé (nommée zip-template) qui permet de définir des templates html réactifs. L'utilisation de cette librairie est détaillée plus loin dans ce readme.

## Pour démarrer

Une fois le projet cloné, il faut installer les dépendances :

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

## Extension IDE recomandée

Le projet se sert des tagged templates afin de déclarer des templates html.
N'importe quelle extension permettant la coloration syntaxique du html dans les tagged template facilitera la lecture du code.  
Par exemple pour vscode : [lit-html vscode](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)

## Documentation zip-template

zip-template est la librairie créée spécialement pour ce projet. Son objectif est de faciliter le développement, en favorisant la réutilisabilité du code html, et gère automatiquement les mise à jour du DOM lorsque les données des templates changent. Voyons comment s'en servir.

### Brique de base : le template

Dans zip-template, la brique de base pour construire une application est le **template**.  
Un template est simplement une fonction qui doit retourner une chaine parsable html. Mais pour plus d'éfficacité, il est préférable de retourner un appel à un utilitaire fourni par la librarie : une tagged template nommée *html*, ce qui permetra d'utiliser des **directives** dans la définition du template.  
Une fois la fonction template définie, il préférable de l'enrober d'un appel à un autre utilitaire, *template*, ce qui va permettre d'accéder à d'autres fonctionalités, comme appeler d'autres templates dans nos templates. Nous verrons cela un peu plus loin.

Voyons un exemple basique :

```js
import { html, template } from "{path-to-library}/zip-template/index.js";

const MyTemplate = () => {
  return html`<div>Hello World</div>`
}

export default template(MyTemplate);

```

  
Rendons ça un peu plus dynamique, en utilisant l'interpolation des tagged template : 

```js
import { html, template } from "{path-to-library}/zip-template/index.js";

// Il suffira d'appeler ce template avec un paramêtre pour afficher un message dynamique
const MyTemplate = (name) => { 
  return html`<div>Hello ${name}</div>`
}

export default template(MyTemplate);

```

L'utilitaire **html** va permettre d'interpréter des directives dans nos templates. Il en existe 2, les *directives d'évenement* et les *directives d'attributs booléens*.

### Directives d'évenement

Les directives d'évenement permettent d'enregistrer des évenement sur l'élément.  
La syntaxe est la suivante : **@event_name=${handler}** 
Par exemple :
```js
import { html, template } from "{path-to-library}/zip-template/index.js";

const MyButton = () => { 
  const handleClick = () => console.log("I was clicked!");
  
  return html`<button @click=${handleClick}>My button</button>`
}

export default template(MyButton);
```

A noter : "event_name" est le nom de l'évenement qu'on passerait à *addEventListener*

### Directives d'attributs booléens

Les directives d'attribut booléen permettent de gérer simplement les attributs booléens.  
La syntaxe est la suivante : **:attribute_name=${boolean_expression}**

Par exemple : 
```js
import { html, template } from "{path-to-library}/zip-template/index.js";

const MyCheckbox = (checked) => { 
  return html`<input type="checkbox" checked={$checked} />`
}

export default template(MyCheckbox);
```

Voilà pour une utilisation basique des templates. Mais il reste encore à voir comment appeler ces templates, et comment gérer leur réactivité.

## Le Root Template et le Store
Le **root template** est l'objet qui va s'occuper du rendu des templates et va s'appuyer sur le **store** pour la gestion des données.  
Ces deux objets vont effectuer le gros du travail de la librairie. Modifier les données du store signalera au root template qu'il doit se mettre à jour, et le root template s'occupera de rendre à nouveaux les templates avec les nouvelles données du store.  
Tout ça se fait automatiquement et la seule chose à faire avec eux, c'est de les instancier. Voyons comment faire.

```js
  import { createRootTemplate, createStore } from "{path_to_library}/zip-template/index.js";
  import MyApp from "{path_to_the_app_template}/App.js"
  
  // instancie un store, prend en parametre un objet de données initiale
  const store = createStore({ myData: "initial data" });
  
  // récupère l'élément sur lequel attacher notre application
  const rootElement = document.getElementById("app");
  
  // instancie le root template, on précise l'élément racine, puis une fonction template, et enfin le store
  createRootTemplate(rootElement, MyApp(), store); 
  
```
En éxécutant ce script au chargment de la page, notre application est initialisée. L'élément qui a pour id "app" est remplacé par le rendu du template MyApp, et on a connecté un store à notre application.

On peux maintenant se servir des fonctionalités du root template et du store dans nos template de base, grâce à un object appelé **context**. Voyons cela.

## Des templates dans des templates grâce à l'objet context -> la fonction "render"

Les templates de base vont recevoir en dernier parametre l'objet context. Le context contient une fonction *render*, qui nous interesse ici, car elle permet d'appeler des templates depuis un templates.

Reprenons notre deuxième template :
```js
// FILE : App.js

import { html, template } from "{path-to-library}/zip-template/index.js";

// Il suffira d'appeler ce template avec un paramêtre pour afficher un message dynamique
const MyTemplate = (name) => {
  return html`<div>Hello ${name}</div>`
}

export default template(MyTemplate);
```

Considérons le template MyApp transformé en root template de l'exemple précédent :
```js
// FILE : MyApp.js

import { html, template } from "{path-to-library}/zip-template/index.js";
import MyTemplate from "./MyTemplate.js";

const MyApp = (context) => { // reçois le context en dernier parametre
  const { render } = context; // On extrait la function render

  return html`<div>
    <h1>My App</h1>
    <p>This is my app</p>
    ${render(MyTemplate("John"))} // inclu notre template, ce qui va afficher "Hello John"
  </div>`
}

export default template(MyTemplate);
```
Le template *MyTemplate* aura ainsi accès à l'objet **context** et pourra lui aussi appeler d'autres templates de cette façon.  
Comme l'appel à *render* se déroule dans une expression, il n'est pas possible d'effectuer des appel conditionels, ou itérer sur des tableaux, avec les structures classiques, (if, else, for, etc).  
On peut utiliser une syntaxe déclarative, comme l'operateur ternaire, ou la méthode *map* des tableaux.

## Gestion des données et réactivité grâce à l'objet context -> la fonction *useStore*

La fonction **useStore** de l'objet **context** va permettre de lire et d'écrire les données du store. L'écriture dans le store va déclencher le rendu des templates et permet d'avoir une application toujours à jour.

La fonction *useStore* prend une fonction de séléction en paramètre, et va retourner un couple de valeur, la première est la valeur séléctionnée, la seconde est une fonction qui permet de modifier cette valeur. 

Par exemple :

```js
/* Suposons que le store ait été initialisé avec ces valeurs :
{
  name: "John",
  lastName: "Doe",
 
 }
 */
 
 import { html, template } from "{path-to-library}/zip-template/index.js";


const MyTemplate = (context) => {
  const { useStore } = context;
  
  const [name, setName] = useStore(store => store.name);
  
  return html`<div>
    <p>Hello ${name}</p> // affiche "Hello John"
    <button @click=${() => setName("unknown")}>Forget my name</button>
    // au click, le nom est remplacé par "unknown"
    // la librairie déclenche un nouveau rendu, le template se met à jour et affiche "Hello unknown"
   </div>`
}

export default template(MyTemplate);

```

### Limite de la librairie

Cette librairie peut être adaptée à des projets de taille modeste, mais peut difficilement scaler pour des projets plus importants.
Deux principales raisons à cela :  
La première concerne les performances, il n'y a pas d'implémentation de DOM virtuel, ce qui va poser problême sur des projets avec beaucoup d'élement. De plus, même si les rendu s'effectuent de manière asynchrone, il n'y a pas de fragmentation en unités de travail. Un rendu est donc bloquant.  
La seconde concerne la réutilisabilité du code. Il n'est pas possible de créer un état local à un template, seulement de se connecter à un store, qui est global. Il est donc difficile de créer des templates complêtement réutilisables, à part pour des templates purement présentationels.

 
 
 
 
