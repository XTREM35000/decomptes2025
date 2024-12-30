# Guide de Refactorisation AutoDécompte Pro Secure

## 1. Architecture du Système

### Structure des Dossiers
```
/
├── components/          # Composants Vue réutilisables
│   ├── admin/          # Composants d'administration
│   ├── decomptes/      # Composants liés aux décomptes
│   ├── layout/         # Composants de mise en page
│   └── ui/            # Composants UI génériques
├── server/
│   ├── api/           # Points d'entrée API
│   ├── models/        # Modèles Mongoose
│   └── utils/         # Utilitaires serveur
├── stores/            # Stores Pinia
└── types/             # Types TypeScript
```

## 2. Flux de Traitement des Décomptes

### Étapes du Workflow

1. **Création (Chef de Mission)**
   - Crée le décompte
   - Signe électroniquement
   - Status: `DRAFT` → `PENDING_DTZ`

2. **Validation DTZ**
   - Vérifie les aspects techniques
   - Signe électroniquement/physiquement
   - Status: `PENDING_DTZ` → `DTZ_PROCESSING` → `PENDING_COURRIER`

3. **Service Courrier**
   - Réceptionne le document
   - Impute à la DMC
   - Status: `PENDING_COURRIER` → `PENDING_DMC`

4. **Traitement DMC**
   - Analyse le décompte
   - Signe électroniquement/physiquement
   - Status: `PENDING_DMC` → `DMC_PROCESSING` → `PENDING_DGA`

5. **Validation DGA**
   - Validation finale
   - Signature électronique/physique
   - Status: `PENDING_DGA` → `DGA_VALIDATED`

6. **Finalisation**
   - Service courrier génère le bordereau
   - Envoi au bailleur
   - Status: `DGA_VALIDATED` → `SENT_TO_BAILLEUR`

## 3. Rôles et Permissions

### Rôles Système
- CHEF_MISSION
- DTZ
- COURRIER
- DMC
- DGA
- BAILLEUR

### Permissions par Rôle
```typescript
const rolePermissions = {
  CHEF_MISSION: ['CREATE_DECOMPTE', 'VIEW_OWN_DECOMPTES'],
  DTZ: ['VALIDATE_TECHNICAL', 'SIGN_DECOMPTE'],
  COURRIER: ['RECEIVE_DECOMPTE', 'GENERATE_BORDEREAU'],
  DMC: ['PROCESS_DECOMPTE', 'SIGN_DECOMPTE'],
  DGA: ['VALIDATE_FINAL', 'SIGN_DECOMPTE'],
  BAILLEUR: ['VIEW_DECOMPTES']
}
```

## 4. Signatures

### Types de Signatures
1. **Électronique**
   - Requise pour tous les rôles
   - Précède toujours la signature physique
   - Enregistre metadata (IP, timestamp)

2. **Physique**
   - Requise pour DTZ, DMC, DGA
   - Suit la signature électronique
   - Validation par scan ou confirmation

## 5. Bonnes Pratiques de Développement

### Code
- Utiliser TypeScript strict
- Valider les données avec Zod
- Gérer les erreurs de manière centralisée
- Utiliser les types pour les statuts et rôles

### API
- Routes RESTful
- Validation des entrées
- Gestion des erreurs cohérente
- Documentation OpenAPI

### Base de Données
- Indexes pour les recherches fréquentes
- Validation des schémas
- Transactions pour les opérations critiques

## 6. Tests

### Types de Tests
```typescript
// Unit Tests
describe('DecompteService', () => {
  test('should validate workflow transition', () => {
    expect(validateTransition('DRAFT', 'PENDING_DTZ')).toBe(true)
    expect(validateTransition('DRAFT', 'PENDING_DGA')).toBe(false)
  })
})

// Integration Tests
describe('API Endpoints', () => {
  test('should create decompte with valid data', async () => {
    const response = await request(app)
      .post('/api/decomptes')
      .send(validDecompteData)
    expect(response.status).toBe(201)
  })
})
```

## 7. Sécurité

### Authentification
- JWT avec rotation des tokens
- Validation des rôles pour chaque action
- Sessions sécurisées

### Validation des Données
- Sanitization des entrées
- Validation des types
- Protection CSRF

## 8. Monitoring

### Logs
- Actions utilisateurs
- Erreurs système
- Performances
- Audit trail complet

### Métriques
- Temps de traitement
- Taux de rejet
- Performance système

## 9. Maintenance

### Tâches Régulières
- Backup des données
- Nettoyage des logs
- Mise à jour des dépendances
- Vérification des performances

### Documentation
- Mise à jour du guide
- Documentation API
- Changelog