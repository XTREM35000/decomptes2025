# Guide de Développement AutoDécompte Pro Secure

## Technologies Utilisées

### Frontend
- Nuxt.js 3 (Vue.js)
- TypeScript
- Tailwind CSS
- Pinia (State Management)
- Vue Toastification
- Vitest (Testing)

### Backend
- Node.js
- MongoDB avec Mongoose
- JWT Authentication
- bcrypt

### Sécurité
- CORS
- Helmet
- Rate Limiting
- JWT avec expiration
- Validation des données

## Architecture REST API

### Authentication
```
POST /api/auth/register
  - Inscription nouvel utilisateur
  - Body: { email, password, name }

POST /api/auth/login
  - Connexion utilisateur
  - Body: { email, password }

GET /api/auth/me
  - Récupérer profil utilisateur connecté
  - Header: Authorization Bearer token

POST /api/auth/change-password
  - Changer mot de passe
  - Body: { currentPassword, newPassword }
```

### Décomptes
```
GET /api/decomptes
  - Liste des décomptes
  - Filtres: status, dateRange, search

POST /api/decomptes
  - Créer nouveau décompte
  - Body: { reference, amount, description }

GET /api/decomptes/:id
  - Détails d'un décompte

POST /api/decomptes/:id/process
  - Traiter une action sur un décompte
  - Body: { action }

POST /api/decomptes/:id/sign
  - Signer un décompte
  - Body: { type: 'ELECTRONIC' | 'PHYSICAL' }

POST /api/decomptes/:id/bordereau
  - Générer bordereau
```

### Administration
```
GET /api/admin/users
  - Liste des utilisateurs

PUT /api/admin/users/:id/role
  - Modifier rôle utilisateur
  - Body: { role }

POST /api/admin/users/:id/activate
  - Activer un utilisateur

GET /api/admin/roles
  - Liste des rôles

POST /api/admin/roles
  - Créer nouveau rôle
  - Body: { name, permissions }

GET /api/admin/permissions
  - Liste des permissions

POST /api/admin/workflows
  - Créer workflow
  - Body: { name, steps }
```

### Signatures
```
GET /api/signatures/pending
  - Liste signatures en attente

POST /api/signatures/electronic/:id
  - Signature électronique

POST /api/signatures/physical/:id
  - Signature physique

GET /api/signatures/history
  - Historique des signatures
```

## API REST à Implémenter

### Workflow
```
GET /api/workflows
POST /api/workflows
PUT /api/workflows/:id
DELETE /api/workflows/:id

GET /api/workflows/:id/steps
POST /api/workflows/:id/steps
PUT /api/workflows/:id/steps/:stepId
DELETE /api/workflows/:id/steps/:stepId
```

### Reporting
```
GET /api/reports/decomptes
  - Statistiques décomptes

GET /api/reports/signatures
  - Statistiques signatures

GET /api/reports/users
  - Statistiques utilisateurs

POST /api/reports/export
  - Export données
```

### Notifications
```
GET /api/notifications
  - Liste notifications

POST /api/notifications/read
  - Marquer comme lu

POST /api/notifications/settings
  - Paramètres notifications
```

### Audit
```
GET /api/audit/logs
  - Logs d'audit

GET /api/audit/actions
  - Actions utilisateurs

GET /api/audit/changes
  - Changements système
```

## Tests

Les tests sont organisés par domaine fonctionnel:
- tests/api/ - Tests API REST
- tests/models/ - Tests modèles Mongoose
- tests/services/ - Tests services métier
- tests/utils/ - Tests utilitaires

Pour exécuter les tests:
```bash
npm run test
npm run test:watch    # Mode watch
npm run test:coverage # Avec couverture
```

## Bonnes Pratiques

### Sécurité
- Validation input/output
- Sanitization données
- Rate limiting
- Logs sécurité
- Audit trail

### Performance
- Caching
- Indexes MongoDB
- Pagination
- Lazy loading

### Code
- TypeScript strict
- Tests unitaires
- Documentation API
- Code review