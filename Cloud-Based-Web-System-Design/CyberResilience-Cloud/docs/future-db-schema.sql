-- OPTIONAL DESIGN ONLY, not used by the live academic assessment.
-- Example MySQL 8.x multi-tenant retention model for a future opt-in release.
CREATE TABLE organizations (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE assessments (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  organization_id BIGINT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  overall_score SMALLINT UNSIGNED NOT NULL,
  CONSTRAINT fk_assessment_org FOREIGN KEY (organization_id) REFERENCES organizations(id),
  CONSTRAINT check_overall_score CHECK (overall_score BETWEEN 0 AND 100),
  INDEX idx_assessment_org_date (organization_id, created_at)
);
CREATE TABLE domain_scores (
  assessment_id BIGINT UNSIGNED NOT NULL,
  function_code CHAR(2) NOT NULL,
  score SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY(assessment_id,function_code),
  CONSTRAINT fk_domain_assessment FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE,
  CONSTRAINT check_domain_score CHECK (score BETWEEN 0 AND 100)
);
-- In a real implementation: authorization checks, encryption, tenancy isolation,
-- explicit retention/consent, migrations, backups, secrets and audit logging are required.
