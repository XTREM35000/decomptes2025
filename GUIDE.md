# Guide AutoDécompte Pro Secure

## 1. Vue d'ensemble

AutoDécompte Pro Secure est une application de gestion des décomptes avec workflow de validation et signatures électroniques/physiques.

## 2. Rôles et Responsabilités

### Chef de Mission (CHEF_MISSION)
- Création des décomptes
- Première signature électronique
- Accès: `/decomptes/nouveau`, `/decomptes`

### Direction Technique de Zone (DTZ)
- Vérification et validation des décomptes
- Signature électronique et physique
- Accès: `/decomptes`, `/signatures`

### Service Courrier (COURRIER)
- Réception des décomptes
- Imputation à la DMC
- Transmission des documents
- Génération des bordereaux
- Accès: `/decomptes`, `/courrier`

### Direction de la Maîtrise des Coûts (DMC)
- Traitement des décomptes
- Signature électronique et physique
- Transmission au DGA
- Accès: `/decomptes`, `/signatures`

### Directeur Général Adjoint (DGA)
- Validation finale
- Signature électronique et physique
- Accès: `/decomptes`, `/signatures`

### Bailleur
- Réception des décomptes finalisés
- Accès: Consultation uniquement

## 3. Workflow du Décompte

1. **Création (CHEF_MISSION)**
   - Création du décompte
   - Signature électronique initiale

2. **Validation DTZ**
   - Vérification technique
   - Signature électronique et physique

3. **Service Courrier**
   - Réception et enregistrement
   - Imputation à la DMC

4. **Traitement DMC**
   - Analyse et traitement
   - Signature électronique et physique
   - Transmission au DGA

5. **Validation DGA**
   - Validation finale
   - Signature électronique et physique

6. **Service Courrier Départ**
   - Génération du bordereau
   - Transmission au bailleur

## 4. Fonctionnalités Principales

### Gestion des Décomptes
- Création de nouveaux décomptes
- Suivi du workflow
- Historique des actions
- Visualisation des statuts

### Signatures
- Signature électronique
- Signature physique
- Validation des signatures
- Suivi des signatures

### Bordereaux
- Génération automatique
- Conditions de génération:
  - Toutes signatures électroniques complètes
  - Toutes signatures physiques complètes
- Types de bordereaux:
  - Bordereau de transmission interne
  - Bordereau pour le bailleur

### Tableau de Bord
- Vue d'ensemble des décomptes
- Statistiques
- Décomptes en attente
- Actions requises

## 5. Restrictions et Sécurité

### Accès
- Authentification requise
- Autorisations basées sur les rôles
- Sessions sécurisées

### Workflow
- Ordre strict des étapes
- Validation séquentielle
- Pas de saut d'étapes

### Signatures
- Signature électronique obligatoire avant physique
- Validation des droits de signature
- Traçabilité complète

### Bordereaux
- Génération uniquement si toutes signatures complètes
- Bordereau bailleur uniquement en fin de workflow
- Archivage automatique

## 6. Vues Principales

### /login
- Connexion utilisateur
- Authentification sécurisée

### /decomptes
- Liste des décomptes
- Filtres et recherche
- Actions selon le rôle

### /decomptes/nouveau
- Création de décompte
- Formulaire détaillé
- Validation des données

### /decomptes/[id]
- Détails du décompte
- État des signatures
- Actions disponibles
- Historique

### /signatures
- Signatures en attente
- Validation des signatures
- Historique des signatures

## 7. Bonnes Pratiques

### Sécurité
- Validation des entrées
- Protection CSRF
- Sessions sécurisées
- Logs d'audit

### Performance
- Optimisation des requêtes
- Cache approprié
- Chargement lazy

### Maintenance
- Logs détaillés
- Sauvegarde régulière
- Monitoring
- Documentation à jour