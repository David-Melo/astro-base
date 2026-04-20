# Deprecated Helper Skill

This file is kept temporarily for compatibility while the framework moves helper behavior into rules.

Do not treat this as a primary skill entrypoint.

Use `.claude/rules/copywriting.md` instead.

If an older workflow references `copywriter_agent`, interpret that as:

- follow `.claude/rules/copywriting.md`
- ground all copy in `docs/strategy_blueprint.md`
- preserve redesign copy when legacy content exists