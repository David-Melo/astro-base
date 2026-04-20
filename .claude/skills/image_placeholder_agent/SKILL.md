# Deprecated Helper Skill

This file is kept temporarily for compatibility while the framework moves helper behavior into rules.

Do not treat this as a primary skill entrypoint.

Use `.claude/rules/image-placeholders.md` instead.

If an older workflow references `image_placeholder_agent`, interpret that as:

- follow `.claude/rules/image-placeholders.md`
- ground image choices in `docs/strategy_blueprint.md`
- generate placeholders, not final assets