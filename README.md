
# Locapic full stack React Native mobile application (french)

Application mobile React Native avec localisation en temps réel, avec la possibilité de sauvegarder des points d'interêt sur la carte (sauvegardés dans le téléphone dans le async storage, donc ils sont permanents).

Chat en temps réel avec les autres utilisateurs connectés.

Backend en express et websockets. Nécessite Nodejs

## Pour démarrer

### Ouvrir 2 terminaux

Terminal 1 (application Expo):

```bash
cd frontend
npm install
npm start
```

Expo va vous afficher une adresse ip locale, copiez la dans frontend/backend.config.json, avec le port :3000.

Terminal 2 (backend):

```bash
cd backend
npm install
npm start
```

Pour tester l'app depuis un téléphone, scanner le qr code du terminal 1, pour l'ouvrir avec Expo Go.
![screenshot](/backend/public/images/locapic.webp?raw=true)
