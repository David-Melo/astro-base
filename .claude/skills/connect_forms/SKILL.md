# Deprecated Helper Skill

This file is kept temporarily for compatibility while the framework moves helper behavior into rules.

Do not treat this as a primary skill entrypoint.

Use `.claude/rules/forms-integration.md` together with `.claude/rules/accessibility.md` instead.

If an older workflow references `connect_forms`, interpret that as:

- follow `.claude/rules/forms-integration.md`
- route browser submissions through your own API route
- keep form UX accessible and validated
