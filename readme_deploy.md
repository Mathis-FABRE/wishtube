# Deploiement de l'application

## Prérequis

- un compte sur Azure
- un compte sur GitHub
- un dépot github contenant le frontend de l'application
- un dépot github contenant le backend de l'application
- Lié le compte GitHub à Azure

## Déployer

Avec le code créer deux ressources sur Azure:
- un App Service pour le backend
- une Static Web App pour le frontend

Une fois le service créé, il faut lier le dépôt GitHub au service Azure associé.
Cela va permettre de créer un pipeline de déploiement continu, qui va déployer automatiquement les modifications du code sur le service Azure.

### App Service

Bien choisir NodeJS 18.04 LTS

Dans les parametres généraux, de la configuration de l'App Service, ajouter une commande de démarrage:
```node index.js```

