-- init-users.sql
-- Création du rôle superadmin
CREATE ROLE superadmin WITH LOGIN PASSWORD 'superadminpassword' SUPERUSER CREATEDB CREATEROLE;

-- Création du rôle admin
CREATE ROLE admin WITH LOGIN PASSWORD 'adminpassword' CREATEDB; 