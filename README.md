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
Une fois la fonction template définie, il préférable de l'enrober d'un appel à un autre utilitaire, *template*, ce qui va permettre d'accéder à d'autres fonctionalités, que nous verrons un peu plus loin.

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
